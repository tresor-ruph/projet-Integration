// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, LogBox, Button } from 'react-native'
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

export default function Chat(route, navigation) {
    const [user, setUser] = useState(null)
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])

    const chatId =  () => {
        
  
        const chatterId = route.route.params.senderId
        const chateeId = route.route.params.recieverId;
        const chatIdPre = [];
        chatIdPre.push(chatterId)
        chatIdPre.push(chateeId)
        setRoom(chatIdPre.join('_'))
    }

    const chatsRef = db.collection('chats');

    useEffect(() => {
        chatId();
        fetch(`http://localhost:3000/chat/${route.route.params.senderId}/${route.route.params.recieverId}`)
        .then(reponse => reponse.json())
        .then(json =>  {
            console.log("test request")
            if(json.length === 0){
                const requestOptions = {
                  method: 'POST',
                  headers: new Headers( {
                      Accept: 'application/json',
                       'content-Type': 'application/json',
                       'Access-Control-Allow-Origin': '*'
                    }
                    ),
                  body: JSON.stringify({
                      senderId : route.route.params.senderId,
                      recieverId: route.route.params.recieverId,
                      chatId: chatId()
                  })
              };
              try {
                fetch('http://localhost:3000/chat/addroom', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
                  
              } catch (error) {
                console.error(error);
              }


            }else {
                console.log(json);
            }
        })
        const chatsRef = db.collection('chats').doc(chatId()).collection('message');

        readUser()
        //onSnapshot serves as an observer so it is called any time we have an update on our collection(table)
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
          //we listen to the doc changes
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
            console.log(messages)
            //the 2 lines above sort the message by creation time so that recent messages are sent first
        })
        return () => unsubscribe()
    }, [])

 

    const appendMessages = useCallback(
      //prevent recent message from replacing previouse one 
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
   /* async function handlePress() {
        //we generate a unique id for each user
        //const _id = Math.random().toString(36).substring(7)
        const user = { chatId, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }*/
    async function handleSend(messages) {
        console.log(chatId());
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }

   /* if (!user) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                <Button onPress={handlePress} title="Enter the chat" />
            </View>
        )
    }*/
    {console.log(messages)}
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