import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



class Home extends React.Component {
  constructor() {
    super();
    this.state={
      nom:''
    }
  }
 componentDidMount(){
   this.getToken();
   /*
   if(this.getToken()){
    this.props.navigation.navigate('HomeScreen');
   }else{
     this.props.navigation.navigate('Login');
   }
*/
 }

  async storeToken(m) {
    try {
       await AsyncStorage.setItem("session", JSON.stringify(m));
    } catch (error) {
      console.log("erreur stockage session", error);
    }
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("session");
      let data = JSON.parse(userData);
      console.log('-----------session------------');
      console.log(data);
      console.log('----------frontend-------------');
      if(data != ""){
      this.props.navigation.navigate('HomeScreen');
      }else{
      this.props.navigation.navigate('Home');
      }
/*
      fetch('http://localhost:8080/appli/', {
        method: 'POST',
        body: JSON.stringify({
          session : data
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"true"
        }
      }) .then(response => response.json())
      .then(json => {
        if(json.message == "entrée dans l'appli"){
          
          this.props.navigation.navigate('HomeScreen');
        }else{
          this.props.navigation.navigate('Home');
        }
        
      
      
      //console.log(json);

        
      }).catch((error) => {
        console.error(error);
      });
*/

      //this.props.navigation.navigate('HomeScreen');
      //return true;
    } catch (error) {
      console.log("Something went wrong", error);
      console.log("pas de asyncstorage");
      this.props.navigation.navigate('Home');
      //return false;
    }
  }
  render() {
    return (
        <View style={styles.container}>
        <View style={styles.rect}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.button}
            >
            <Text style={styles.connectezVous}>Connectez-vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Form")}
            style={styles.button2}
            >
            <Text style={styles.inscrivezVous}>Inscrivez vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("HomeScreen")}
            style={styles.button3}
            >
            <Text style={styles.inscrivezVous}>Page Home</Text>
            </TouchableOpacity>
        </View>
        </View>
  );
    }
}
//sqetqstrt
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    flex: 1,
    backgroundColor: "rgba(231,225,225,1)",
    marginTop: 0
  },
  button: {
    width: 241,
    height: 71,
    backgroundColor: "rgba(222,72,72,1)",
    borderRadius: 20,
    marginTop: 247,
    marginLeft: 59
  },
  connectezVous: {
    color: "#121212",
    fontSize: 23,

    marginLeft: 40
  },
  button2: {
    width: 241,
    height: 72,
    backgroundColor: "rgba(6,194,23,1)",
    borderRadius: 20,
    marginTop: 28,
    marginLeft: 59
  },
  button3: {
    width: 241,
    height: 72,
    backgroundColor: "rgba(6,194,23,1)",
    borderRadius: 20,
    marginTop: 28,
    marginLeft: 59
  },
  inscrivezVous: {
    color: "#121212",
    fontSize: 23,
    marginTop: 18,
    marginLeft: 48
  }
});

export default Home;