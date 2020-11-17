import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Contact from './contact';
import { useNavigation } from '@react-navigation/native';
import RecentChatStorage from './recentChat_storage';
import { useIsFocused } from '@react-navigation/native';
import * as firebase from "firebase";
import "firebase/firestore";

//import Contact from "./contact";
let userId = ' ';
const db = firebase.firestore();
let chatsRef = db.collection("chats");
function RecentChat(props) {
    const [recentChat, setRecent] = useState('');
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [userId, setUserId] = useState("");
    

  useEffect(() => {

    console.log("hehehr")
    const getId = async () => {
      let id = await AsyncStorage.getItem('user');
      id = JSON.parse(id).Id;
      //setUserId(id);
      
      fetch(`http://localhost:3000/chatconv/${id}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setRecent(json);
      })
      .catch(error => {
        console.log(error);
      });

    };

    getId();
   

}, [isFocused]);

  function renderScreen() {
    const arr = [];
    let i = 0;

    Array.from(recentChat).forEach(element => {
        arr.push(
        <Contact
        key={i}
        name={element.Nom}
        imgUrl={element.PhotoProfil}  
        lastMess={"test test"}
        repert= {false}
        onNav={() => navigation.navigate('Chat', { recieverId: element.recieverId, senderId: element.senderId })}
        /> 
        );
       ++i;
      });

      return <View>{arr}</View>;
  }
  return (
    <View>
     
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({});

export default RecentChat;
