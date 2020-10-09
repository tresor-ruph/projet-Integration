//this component is the home screen of our chat component

import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Chat from './Chat'
import Contact from "./contact";



function Discussion_Repo(props) {

   
    const  [disp, setDisp] = useState('disc');

    function handleChange(event){
      props.onChange(event.target.value)
      console.log(value)
      
    }

    function renderScreen(props) {
      if(disp === 'disc'){
        return (
        <View>
        <Contact />  
        
        </View>)
      }else if(disp === 'groups'){
        return (<Text>Hi</Text>)
      }else if(disp === 'contacts'){
        return (<Text>Yup</Text>)
      }
    }

    return (  
      <View> 
        {renderScreen()}
    <View style={[styles.container, styles.materialIconTextButtonsFooter1]}>
      
      <View style ={styles.content}>
      </View>
      <TouchableOpacity  onPress = {() =>{setDisp('disc');console.log({disp})}}
        
        style={styles.buttonWrapper1}
      >
        <MaterialCommunityIconsIcon
          name={"wechat"}
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn1Text}>Recent</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() =>{setDisp('groups');console.log({disp})}}
        
        style={styles.activeButtonWrapper}
      >
        <MaterialCommunityIconsIcon
          name={"account-group" }
          style={styles.activeIcon}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.activeContent}>Groups</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress = {() =>{setDisp('contacts');console.log({disp})}}
        style={styles.buttonWrapper2}
      >
        <MaterialCommunityIconsIcon
          name={"contacts"}
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn2Text}>Contacts</Text>
      </TouchableOpacity>
    </View>
    </View>   
  );
}


const styles = StyleSheet.create({
    container: {
      
      backgroundColor: "#FFF",
      flexDirection: "row",
      shadowColor: "#111",
      shadowOffset: {
        width: 0,
        height: -2
      },
    
      shadowOpacity: 0.2,
      shadowRadius: 1.2,
      elevation: 3
    },
    materialIconTextButtonsFooter1: {
      height: 62,
      width: "100%",
      marginTop: 678
    },
    buttonWrapper1: {
      flex: 1,
      paddingTop: 8,
      paddingBottom: 10,
      paddingHorizontal: 12,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center",
      
    },
    icon1: {
      backgroundColor: "transparent",
      color: "#616161",
      fontSize: 24,
     
      opacity: 0.8
    },
    btn1Text: {
      fontSize: 12,
      color: "#9E9E9E",
      backgroundColor: "transparent",
      paddingTop: 4
    },
    activeButtonWrapper: {
      flex: 1,
      paddingTop: 6,
      paddingBottom: 10,
      paddingHorizontal: 12,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    activeIcon: {
      backgroundColor: "transparent",
      color: "#9E9E9E",
      fontSize: 24,
      opacity: 0.8
    },
    activeContent: {
      fontSize: 14,
      color: "#9E9E9E",
      backgroundColor: "transparent",
      paddingTop: 4
    },
    buttonWrapper2: {
      flex: 1,
      paddingTop: 8,
      paddingBottom: 10,
      paddingHorizontal: 12,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    icon2: {
      backgroundColor: "transparent",
      color: "#616161",
      fontSize: 24,
      opacity: 0.8
    },
    btn2Text: {
      fontSize: 12,
      color: "#9E9E9E",
      backgroundColor: "transparent",
      paddingTop: 4
    }
  });
export default Discussion_Repo;
