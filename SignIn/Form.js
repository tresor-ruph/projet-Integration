import React, { Component } from "react";
import { render } from "react-dom";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
class Form extends React.Component {
    constructor() {
      super();
      this.state={
        nom:'',
        prenom:'',
        motdepasse:'',
        adresse: '',
        codePostal: '',
        Mail: ''
      }
    }
    submit() {
      console.log(this.state)

      fetch('http://localhost:8080/auth/', {
        method: 'POST',
        body: JSON.stringify(
          this.state
        ),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"true"
        }
      }) .then(response => response.json())
      .then(json => {
      console.log(json);
      }).catch((error) => {
        console.error(error);
      });
      
    }

    render() {
      return (
        <View>
          <TextInput
            placeholder="nom"
            onChangeText={(text)=> { this.setState({ nom: text }) }}
            style={{borderWidth:1,borderColor:'blue', margin:20}}
          ></TextInput>
          <TextInput
            placeholder="prénom"
            onChangeText={(text)=> { this.setState({ prenom: text }) }}
            style={{borderWidth:1,borderColor:'blue', margin:20}}
          ></TextInput>
          <TextInput
            placeholder="adresse"
            onChangeText={(text)=> { this.setState({ adresse: text }) }}
            style={{borderWidth:1,borderColor:'blue', margin:20}}
          ></TextInput>
          <TextInput
            placeholder="code postal"
            onChangeText={(text)=> { this.setState({ codePostal: text }) }}
            style={{borderWidth:1,borderColor:'blue', margin:20}}
          ></TextInput>
          <TextInput
            placeholder="Mail"
            onChangeText={(text)=> { this.setState({ Mail: text }) }}
            style={{borderWidth:1,borderColor:'blue', margin:20}}
          ></TextInput>
          <TextInput
            placeholder="mot de passe"
            secureTextEntry={true}
            onChangeText={(text)=> { this.setState({ motdepasse: text }) }}
            style={{borderWidth:1,borderColor:'blue', margin:20}}
          ></TextInput>
          <Button
            title="s'incrire"
            onPress={()=>{this.submit()}}
          ></Button>
        </View>
      )
    }
}
export default Form;