/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Button, TextInput, View, StyleSheet} from 'react-native';

export default function Login(props) {
  const [username, setusername] = useState(' ');

  const onLogin = async () => {
    if (username === 'tresor'){
        AsyncStorage.setItem('user', JSON.stringify(1));
        console.log('value set well set');
        props.navigation.navigate('HomeScreen');
    } else if (username === 'raoul'){
        AsyncStorage.setItem('user', JSON.stringify(2));
        console.log('value set well set');
        props.navigation.navigate('chatvideo');


    } else {
        console.log('user can be tresor (id 1) or raoul (id 2)');
    }

  };

  return (
    <View style={styles.container}>
      <TextInput placeholder={'Username'} onChangeText={(text) => setusername(text)} style={styles.input} />

      <Button title={'Login'} style={styles.input} onPress={onLogin} />
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
