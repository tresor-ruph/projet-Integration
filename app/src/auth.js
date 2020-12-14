/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import {SafeAreaView, TextInput, StyleSheet, Button, View, StatusBar, TouchableOpacity, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

import firebaseSetup from './setup';
let state;
const CodeVeriication = (route) => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const {auth} = firebaseSetup();
  const navigation = useNavigation();

  state = route.route.params.values;

  const envoie = () => {
    let bonneDate = state.dateNaissance.replace('/', ',');
    bonneDate = bonneDate.replace('/', ',');
    fetch('https://help-recover-api.herokuapp.com/auth/', {
      method: 'POST',
      body: JSON.stringify({
        nom: state.nom,
        prenom: state.prenom,
        adresse: state.adresse,
        dateNaissance: bonneDate,
        Mail: state.mail,
        codePostal: state.codePostal,
        password: state.motdepasse,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.message == 'inscription finie') {
          alert('inscription reussi vous pouvez vous connecter')
          navigation.navigate('Connexion');
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
  const signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };
  const confirmcode = async () => {
    try {
      //await confirm.confirm(code);
      envoie();
    } catch (err) {
      alert(err);
    }
  };
  const handlePress = () => {
    setConfirm(false);
  };
  const phoneInput = useRef < PhoneInput > null;
  if (!confirm) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <SafeAreaView style={styles.wrapper}>
            <PhoneInput
              defaultValue={value}
              defaultCode="BE"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
              }}
              countryPickerProps={{withAlphaFilter: true}}
              disabled={disabled}
              withDarkTheme
              withShadow
              autoFocus
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log(formattedValue);
                // signInWithPhoneNumber(formattedValue);
                setConfirm(true);
              }}>
              <Text style={styles.buttonText}>Verifier</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </>
    );
  }

  return (
    <View>
      <View style={styles.text}>
        <Text style={{textAlign: 'center', margin: 5}}>Le code de securite viens d'etre envoye par sms au</Text>
        <Text style={{fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>{formattedValue}</Text>
      </View>
      {/* <TextInput placeholder="code de securite" style={styles.input2} /> */}

      <TextInput value={code} style={styles.input2} onChangeText={(text) => setCode(text)} />
      <View style={styles.login2}>
        <Button title="confirmer" onPress={() => confirmcode()} />
      </View>
      <View style={styles.changerNum}>
        <View style={styles.login3}>
          <Button onPress={handlePress} color="green" title="changer de numero" />
        </View>
        <TouchableOpacity
          style={{marginTop: 30, left: 60}}
          onPress={() => {
            //  signInWithPhoneNumber(formattedValue);
          }}>
          <Text style={{color: 'blue', textDecorationLine: 'underline'}}>pas recu de code ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  button2: {
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  redColor: {
    backgroundColor: '#F57777',
  },
  login3: {
    marginLeft: '15%',
    marginTop: '10%',
    width: 280,
    borderRadius: 30,
  },
  text: {
    marginTop: '50%',
    textAlign: 'center',
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  login2: {
    marginLeft: '15%',
    marginTop: '10%',
    width: 280,
    borderRadius: 30,
  },
  input2: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
    marginTop: '10%',
    marginLeft: 50,
  },
});

export default CodeVeriication;
