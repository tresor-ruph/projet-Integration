import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import Contact from "./contact";
import { useNavigation } from '@react-navigation/native';
import RecentChatStorage from './recentChat_storage'
import { useIsFocused } from "@react-navigation/native";



//import Contact from "./contact";
function RecentChat(props) {
    const [recentChat, setRecent] = useState('')
    const navigation = useNavigation();
    const isFocused = useIsFocused();

  useEffect( () => {
   
    async function getRecentChat(){
    let res = await RecentChatStorage();
    res = JSON.parse(res);
    if (res != null) {
      setRecent(res)
  }
    }
    getRecentChat()
    
  
  }, [isFocused]);

  function renderScreen() {
    let arr = []
    Array.from(recentChat).forEach(element => {
        arr.push(
        <Contact
        key = {element.recieverId}
        name = {element.Nom}
        imgUrl = {element.profilPic}  
        lastMess ={element.text}
        onNav={() => navigation.navigate('Chat', { recieverId:element.recieverId , senderId: element.senderId })}
        /> 
        )
      })

      return <View>{arr}</View>
      
  }
  return (
    <View>
     
        {renderScreen()}
    </View>
  )
}

const styles = StyleSheet.create({});

export default RecentChat;
