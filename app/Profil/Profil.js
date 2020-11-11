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
  Platform,
} from "react-native";
import { TextInput, Button as Test } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

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
    let data = localStorage.getItem('id');
    fetch('http://localhost:3000/users/'+data)
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
        setId(json[0].Id);
        setNom(json[0].Nom);
        setPrenom(json[0].Prenom);
        setAdresse(json[0].Adresse);
        setCode(json[0].CodePostal);
        setImage(json[0].PhotoProfil);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChangeName = (event) => {
    setNom(event.target.value);
  };
  const handleChangeSurname = (event) => {
    setPrenom(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAdresse(event.target.value);
  };
  const handleChangePostal = (event) => {
    setCode(event.target.value);
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
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

  const uploadImage = async (uri, imgName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(imgName);
    ref.put(blob);

    const test = await firebase.storage()
      .ref(`/${imgName}`)
      .getDownloadURL();

    return test;
  };

  const handleSubmit = async () => {
    const imageName = `profile${userId}`;

    const test1 = isPicked ? await uploadImage(image, imageName) : image;

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
        Photo: test1,
      }),
    };
    console.log(requestOptions.body);

    fetch("http://localhost:3000/updateData", requestOptions)
      .then(() => ("Data successfully updated"))
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
    fetch('http://localhost:3000/users/2')
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
        setId(json[0].Id);
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
              <Test onPress={pickImage} icon="camera" />
        }
      </View>

      <View>
        <TextInput
          value={nom}
          label="Nom"
          name="Nom"
          mode='outlined'
          editable={bool}
          onChange={handleChangeName}
        />
        <TextInput
          value={prenom}
          editable={bool}
          mode='outlined'
          label="Prenom"
          name="Prenom"
          onChange={handleChangeSurname}
        />
        <TextInput
          value={adresse}
          editable={bool}
          label="Adresse"
          name="adresse"
          mode='outlined'
          onChange={handleChangeAddress}

        />
        <TextInput
          value={code}
          editable={bool}
          label="Code postal"
          name="code"
          mode='outlined'
          onChange={handleChangePostal}
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
            <View style={{ flex: 2, padding: '10' }}>
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
            <View style={{ flex: 2, padding: '10' }}>
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
