/* eslint-disable no-alert */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, View, Image, TextInput, ActivityIndicator, Text, KeyboardAvoidingView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Button as Test} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

//import App from './firebase'

// eslint-disable-next-line require-jsdoc
export default function Profil({navigation: {navigate}}) {
  const [nom, setNom] = useState(' ');
  const [prenom, setPrenom] = useState(' ');
  const [adresse, setAdresse] = useState(' ');
  const [code, setCode] = useState(' ');
  const [userId, setId] = useState(0);
  const [bool, setBool] = useState(false);
  const [btnDisplay, setBtn] = useState(true);
  const [image, setImage] = useState(null);
  const [isPicked, setIsPicked] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isConnected, setConnection] = useState(true);

  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      handleConnectivityChange(state.isConnected);
    });
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          // We have data!!
          const result = JSON.parse(value);
          return result.Id;
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    const init = async () => {
      const test = await retrieveData();
      fetch(`https://help-recover-api.herokuapp.com/users/${test}`)
        .then((response) => response.json())
        .then((json) => {
          setLoaded(true);
          setNom(json[0].Nom);
          setId(json[0].Id);
          setPrenom(json[0].Prenom);
          setAdresse(json[0].Adresse);
          setCode(json[0].CodePostal);
          setImage(json[0].PhotoProfil);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    unsubscribe();
    retrieveData();
    init();
  }, []);

  const handleConnectivityChange = (connect) => {
    setConnection({connect});
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

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

  const deleteImage = () => {
    setImage('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
  };

  const uploadImage = async (uri, imgName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(imgName);
    ref.put(blob);

    const urlImage = await firebase.storage().ref(`/${imgName}`).getDownloadURL();

    return urlImage;
  };

  const handleSubmit = async () => {
    const imageName = `profile${userId}`;

    const temp = isPicked ? await uploadImage(image, imageName) : image;

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        Nom: nom,
        Prenom: prenom,
        CodePostal: code,
        Adresse: adresse,
        userId,
        Photo: temp,
      }),
    };
    fetch('https://help-recover-api.herokuapp.com/updateData', requestOptions)
      .then()
      .catch((error) => {
        console.log(error);
      });

    setBtn(true);
    setBool(false);
  };

  const handleBoutonDisplay = () => {
    setBtn(false);
    setBool(true);
  };

  const handleCancel = () => {
    fetch(`https://help-recover-api.herokuapp.com/users/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setLoaded(true);
        setNom(json[0].Nom);
        setPrenom(json[0].Prenom);
        setAdresse(json[0].Adresse);
        setCode(json[0].CodePostal);
        setImage(json[0].PhotoProfil);
      })
      .catch((error) => {
        console.error(error);
      });
    setBtn(true);
    setBool(false);
  };

  return !isLoaded ? (
    isConnected ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      <View>
        <Text>No internet Connection !</Text>
      </View>
    )
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{uri: image || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'}}
          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2,
          }}
        />
        {bool && (
          <View style={styles.photoButton}>
            <Test onPress={pickImage} icon="camera" />
            <Test onPress={deleteImage} icon="delete" />
          </View>
        )}
      </View>

      <View>
        <TextInput
          value={nom}
          style={styles.textInput}
          name="Nom"
          editable={bool}
          onChangeText={(text) => setNom(text)}
        />
        <TextInput
          value={prenom}
          style={styles.textInput}
          editable={bool}
          name="Prenom"
          onChangeText={(text) => setPrenom(text)}
        />
        <TextInput
          value={adresse}
          style={styles.textInput}
          editable={bool}
          name="adresse"
          onChangeText={(text) => setAdresse(text)}
        />
        <TextInput
          value={code}
          style={styles.textInput}
          editable={bool}
          name="code"
          onChangeText={(text) => setCode(text)}
        />
      </View>
      <View style={styles.bottom}>
        {btnDisplay ? (
          <View style={styles.bottomButton}>
            <View style={styles.bottomButton1}>
              <Button title="Modifier" onPress={handleBoutonDisplay} color="blue" />
            </View>
            <View>
              <Button title="voir mes notations" onPress={() => navigate('Notation2')} />
            </View>
          </View>
        ) : (
          <View style={styles.bottomButton}>
            <View style={styles.bottomButton1}>
              <Button title="Enregistrer" onPress={handleSubmit} color="green" />
            </View>
            <View>
              <Button title="Annuler" onPress={handleCancel} color="red" />
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  photoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 200,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
    color: 'black',
    paddingLeft: 75,
    paddingTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  top: {
    padding: 10,
  },
  bottom: {
    padding: 10,
    margin: 15,
  },
  bottomButton: {
    margin: 20,
    padding: 15,
  },
  bottomButton1: {
    margin: 5,
  },
});
