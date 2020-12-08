/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Image,
  TextInput,
} from "react-native";
import { Button as Test } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import App from './firebase'

// eslint-disable-next-line require-jsdoc
export default function Profil() {
  const [nom, setNom] = useState(' ');
  const [prenom, setPrenom] = useState(' ');
  const [adresse, setAdresse] = useState(' ');
  const [code, setCode] = useState(' ');
  const [userId, setId] = useState(0);
  const [bool, setBool] = useState(false);
  const [btnDisplay, setBtn] = useState(true);
  const [image, setImage] = useState(null);
  const [isPicked, setIsPicked] = useState(false);


 // firebase.initializeApp(firebaseConfig);
 // firebase.analytics();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          // We have data!!
          const result = JSON.parse(value);
          console.log(result.Id);
          return result.Id;
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    const init = async () => {
      const test = await retrieveData();
      fetch(`http://localhost:3000/users/${test}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
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
    retrieveData();
    init();
  }, []);

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
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setIsPicked(true);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  const uploadImage = async (uri, imgName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(imgName);
    ref.put(blob);

    const urlImage = await firebase.storage()
      .ref(`/${imgName}`)
      .getDownloadURL();

    return urlImage;
  };

  const handleSubmit = async () => {
    const imageName = `profile${userId}`;

    const temp = isPicked ? await uploadImage(image, imageName) : image;

    const requestOptions = {
      method: 'PUT',
      headers:
      {
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
    console.log(requestOptions.body);

    fetch('http://localhost:3000/updateData', requestOptions)
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
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
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


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{ uri: image || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png' }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2,
          }}
        />
        {bool && 
              <View>
                <Test onPress={pickImage} icon="camera" />
                <Test onPress={deleteImage} icon="delete" />
              </View>
        }
      </View>

      <View>
        <TextInput
          value={nom}
          style={styles.textInput}
          label="Nom"
          name="Nom"
          mode='outlined'
          editable={bool}
          onChangeText={text => setNom(text)}
        />
        <TextInput
          value={prenom}
          style={styles.textInput}
          editable={bool}
          mode='outlined'
          label="Prenom"
          name="Prenom"
          onChangeText={text => setPrenom(text)}
        />
        <TextInput
          value={adresse}
          style={styles.textInput}
          editable={bool}
          label="Adresse"
          name="adresse"
          mode='outlined'
          onChangeText={text => setAdresse(text)}

        />
        <TextInput
          value={code}
          style={styles.textInput}
          editable={bool}
          label="Code postal"
          name="code"
          mode='outlined'
          onChangeText={text => setCode(text)}
        />
      </View>
      <View style={styles.bottom}>
        {
          btnDisplay
          && (
            <Button
              title="Modifier"
              onPress={handleBoutonDisplay}
              color='blue'
            />
          )
        }
        {
          !btnDisplay
          && (
            <View style={{ flex: 2, padding: 10 }}>
              <Button
                title="Enregistrer"
                onPress={handleSubmit}
                color='green'
              />
            </View>
          )
        }
        <View style={{ flex: 0.1 }} />
        {
          !btnDisplay && (
            <View style={{ flex: 2, padding: 10 }}>
              <Button
                title="Annuler"
                onPress={handleCancel}
                color="red"
              />
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 20,
  },
  top: {
    flex: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.3,
  },
  textInput: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    marginBottom: 10,
  },
  bottom: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
