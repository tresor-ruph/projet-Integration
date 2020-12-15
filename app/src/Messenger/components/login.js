/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Button, Image, Text, TextInput, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
export default function Login(props) {
  const [username, setusername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [errMess, setErrMess] = useState(' ');

  const onLogin = async () => {
    fetch(`https://help-recover-api.herokuapp.com/contacts/${username}/${password}`)
      .then((reponse) => reponse.json())
      .then((json) => {
        console.log(json);

        if (json.length > 0) {
          const name = json[0].Nom;
          const Id = json[0].Id;
          const avatar = json[0].PhotoProfil;

          const user = {Id, name, avatar};
          console.log(user);

          AsyncStorage.setItem('user', JSON.stringify(user));
          props.navigation.navigate('HomeScreen');
        } else {
          if (json.message == 'bloque') {
            setErrMess(
              "Nous avons juge votre comportement deplace et avons suspendu votre compte. Vous pouvez nous contacter a l'address helprecover@gmail.com pour plus de detail",
            );
          } else {
            console.log('heheheh');
            console.log(json.message);
            alert('connexion impossible ! verifiez vos identifiant');
          }
        }
      });
  };

  return (
    <LinearGradient
      start={{x: 0.5, y: 0}}
      end={{x: 0.8, y: 0.8}}
      locations={[0, 0.9]}
      colors={['#0077b6', '#ffffff']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.imageFrame}>
          <Image
            source={require('./../../img/login.png')}
            style={{
              width: 120,
              height: 120,
              borderRadius: 200 / 2,
            }}
          />
        </View>
        {errMess !== ' ' && (
          <View style={styles.errMess}>
            <Text style={{fontSize: 18}}>{errMess}</Text>
          </View>
        )}

        <TextInput placeholder={'Email'} onChangeText={(text) => setusername(text)} style={styles.input} />
        <TextInput
          placeholder={'Mot de passe'}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <View style={styles.login}>
          <Button title="Connexion" onPress={onLogin} />
        </View>
        <View style={styles.touchSign}>
          <Button title="Créer un compte" color="green" onPress={() => props.navigation.navigate('Créer un compte')} />
        </View>
        <TouchableOpacity style={{marginTop: 30}}>
          <Text style={{color: 'red', textDecorationLine: 'underline'}}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  errMess: {
    margin: 30,
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
  imageFrame: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  login: {
    width: 300,
  },
  touchSign: {
    backgroundColor: 'red',
    marginTop: 60,
    width: 300,
  },
});
