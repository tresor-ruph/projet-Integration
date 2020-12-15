/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, View, TextInput, TouchableOpacity, Text, Alert, Picker} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

let userId = 0;
function Signaler(route) {
  const [descriptif, setDescriptif] = useState('');
  const [image, setImage] = useState('null');
  const [isPicked, setIsPicked] = useState(false);
  const [error, setError] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const result = JSON.parse(value);
        userId = result.Id;
      }
    } catch (error) {
      console.log('an error occured');
    }
  };
  useEffect(() => {
    retrieveData();
  });
  const submit = async () => {
    const imageName = `profile${userId}`;
    const temp = await uploadImage(image, imageName);
    if (!error) {
      fetch('https://help-recover-api.herokuapp.com/signaler/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
        },
        body: JSON.stringify({
          user: userId,
          toBlock: route.route.params.id,
          descriptif: descriptif,
          preuve: temp,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });
      alert('Merci pour ces informations');
    } else {
      alert('une erreur est survenue veuillez reesayer');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setIsPicked(true);
    }
  };
  const uploadImage = async (uri, imgName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(imgName);
    ref.put(blob);
    try {
      const urlImage = await firebase.storage().ref(`/${imgName}`).getDownloadURL();
      return urlImage;
    } catch (err) {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        multiline={true}
        onChangeText={(text) => setDescriptif(text)}
        style={styles.desc}
        placeholder="Entrez un descriptif du problem"
      />
      {/* <Button title="Envoyer votre demande" color="green" onPress={() => this.submit()} /> */}
      <View style={{marginTop: 40}}>
        <View style={{marginTop: 60}}>
          {image !== 'null' && <Text style={{fontSize: 18, color: 'red'}}>preuve recupere</Text>}
          <View style={{marginTop: 10}}>
            <Button title="Telecharger preuve" onPress={() => pickImage()} color="green" />
          </View>
        </View>
        <Text style={styles.para}>
        ceci peut être une capture d'écran de votre conversation ou une toute image pouvant justifier les faits décrits ci-dessus
        </Text>
        <View style={{marginTop: 60}}>
          <Button title="Envoyer" onPress={() => submit()} color="blue" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  para: {
    fontSize: 15,
    marginTop: 50,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },

  picker2: {
    borderColor: 'black',
  },
  picker1: {
    borderRadius: 10,
    backgroundColor: 'grey',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  desc: {
    marginTop: '10%',
    width: '100%',
    height: '20%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default Signaler;
