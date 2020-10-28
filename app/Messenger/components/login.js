import AsyncStorage from '@react-native-community/async-storage';
import React, { Component, useEffect, useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';



export default function Login(props)  {

    const [username, setusername] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [userId , setUserId] = useState("")
   
  
 
   const onLogin = async ()=> {
   

    // eslint-disable-next-line no-undef
    fetch(`http://localhost:3000/contacts/${username}`)
    .then(reponse => reponse.json())
    .then( json => {
      console.log(json);
      const name = json[0].Nom;
      const Id = json[0].Id
      const avatar = json[0].PhotoProfil
      setUserId(json[0].Id)
    
      const user = { Id, name, avatar };
       AsyncStorage.setItem('user', JSON.stringify(user));
       props.navigation.navigate('HomeScreen', { userid: json[0].Id });

      
    });
  
   /* const { username, password } = this.state;
    const requestOptions = {
      method: 'POST',
      headers: new Headers( {
          Accept: 'application/json',
           'content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*'
        }
        ),
      body: JSON.stringify(this.state)
  };

  try {
    fetch('http://localhost:3000/addUser', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
      console.log(this.state);
  } catch (error) {
    console.error(error);
  }  */

  }
const handlePassword = (event) => {
  setPassword(event.target.value);
}
const handleUsername = (event) => {
  setusername(event.target.value);
}
  
    return (
      <View style={styles.container}>
        <TextInput
                  placeholder={'Username'}

          onChange={handleUsername}
          style={styles.input}
        />
        <TextInput
           placeholder={'Password'}
          onChange={ handlePassword }
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={onLogin}
        />
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});