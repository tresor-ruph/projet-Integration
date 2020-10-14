// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View,  Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
 
    apiKey: "AIzaSyDRItqqCOKaYRO3hMHpIc_m1V61oOQcfSY",
    authDomain: "help-recover-3984c.firebaseapp.com",
    databaseURL: "https://help-recover-3984c.firebaseio.com",
    projectId: "help-recover-3984c",
    storageBucket: "help-recover-3984c.appspot.com",
    messagingSenderId: "200817849391",
    appId: "1:200817849391:web:80c54f2a630d75ce5682da"
 
}

//prevent us from initialising the app every time we refresh screen
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}


const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function Chat() {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        readUser()
        //onSnapshot serves as an observer so it is called any time we have an update on our collection(table)
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
          //we listen to the doc changes
            const messagesFirestore = querySnapshot
                .docChanges()
                
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                

            getUserMsg(messagesFirestore);
            //the 2 lines above sort the message by creation time so that recent messages are sent first
        })
        return () => unsubscribe()
    }, [])

    function getUserMsg (x) {

const chatMess =x.filter(x => (x.user.reciever ==='tresor' && x.user.name === 'tek'))
appendMessages(chatMess)

  }

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
      //we get the user from async storage
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        //we generate a unique id for each user
        const _id = Math.random().toString(36).substring(7)
        const reciever = "tresor"
        const user = { _id, name,reciever }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }





    

    if (!user) {
      //no user in async storage
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})