import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';

export default function Login(props) {
  const [username, setusername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [errMess, setErrMess] = useState(' ');
  //const [user, setUserId] = useState("")

  const onLogin = async () => {
    // eslint-disable-next-line no-undef
    fetch(`https://help-recover-api.herokuapp.com/contacts/${username}/${password}`)
      .then((reponse) => reponse.json())
      .then((json) => {
        console.log(json);

        if (json.length > 0) {
          const name = json[0].Nom;
          const Id = json[0].Id;
          const avatar = json[0].PhotoProfil;
          // setUserId(json[0].Id);

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
    <View style={styles.container}>
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
        <Button title="Créer un compte" color="green" onPress={() => props.navigation.navigate('Creer un compte')} />
      </View>
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
  errMess: {
    margin: 50,
    backgroundColor: 'rgba(255,0,0,0.3)',
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
    marginTop: 20,
    width: 300,
  },
  touchSign: {
    backgroundColor: 'red',
    marginTop: 60,
    width: 300,
  },
});
