import React, { Component, useState } from "react";
import { StyleSheet, View,  TouchableOpacity, TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';


function CupertinoFooter1(props) {
  const navigation = useNavigation();
const [contact , setContact] = useState(" ");
 


 function enregistrer() {
  async function getContact (x){
    try {
     const value =  await AsyncStorage.getItem('contact')
     console.log(value);
     let value2 = JSON.parse(value);
     if(value2[0].Id === x[0].Id) {

     console.log("le contact ci existe deja")
      }else {
        value2.push(x);   
        console.log(value2);
        await AsyncStorage.setItem('contact',JSON.stringify(value2))

      }
      
    } catch(e) {
      console.log(e)
    }
  
  
  }

 let nom = "'"+ props.name + "'";
 let tel = props.tel

  try {
    fetch(`http://localhost:3000/contacts/${(nom)}`)
    .then(response => response.json())
    .then(json => {
      if(json.length === 1) { 
     
     
        getContact(json)
      
      }else {
    
        
      }
    })
  } catch (error) {
    console.error(error)
  }

}
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.btnWrapper1Row}>
        <TouchableOpacity style={styles.btnWrapper1}>
        <Button title = "Annuler"  onPress={() => navigation.navigate("Discussion_Repo")} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper4}>
        <Button title = "Enregistrer" onPress = {() => enregistrer()} />

  
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row"
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    height: 49,
    width: 188
  },
  textInput2: {
    fontSize: 16,
    backgroundColor: "transparent",
    paddingTop: 4,
    width: 77,
    height: 23
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: 188
  },
  textInput: {
    fontSize: 16,
    color: "rgba(171,15,15,1)",
    backgroundColor: "transparent",
    paddingTop: 4,
    width: 143,
    height: 50
  },
  btnWrapper1Row: {
    height: 49,
    flexDirection: "row",
    flex: 1,
    marginRight: -1
  }
});

export default CupertinoFooter1;
