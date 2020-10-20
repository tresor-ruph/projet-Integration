import React, { Component, useEffect, useState } from 'react'
import {
  StyleSheet,
  Button,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import App from './firebase';
import * as firebase from 'firebase';
import storage from '@react-native-firebase/storage';


/*export default function Search() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="test"></TextInput>
    </View>
  );

  return 

    () => {
    axios
    .get('localhost:8080/users/31')
    .then(response => {
      setUserData(response.data)
      console.log(userdata);
    })
  }, []);

    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <Text>Error content not loaded</Text>
        </View>
      )
    }
    else{
    console.log(this.state.dataSource);
    let name = this.state.dataSource.map((val) => {
     return  <View key={val.Id} style={styles.item}>
        <Text>{val.Nom}</Text>
      </View>
    })
}*/

const Separator = () => (
  <View style={styles.separator} />
);

export default function UpdateData() {

  const [nom, setNom] = useState(' ')
  const [prenom, setPrenom] = useState(' ')
  const [adresse, setAdresse] = useState(' ')
  const [code, setCode] = useState(' ')
  const [userId, setId] = useState(0);
  const [bool, setBool] = useState(false);
  const [btnDisplay, setBtn] = useState(true);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();


  useEffect(() => {
    fetch('http://localhost:3000/users/31')
      .then((response) => response.json())
      .then((json) => {
        console.log(json[0]);
        setId(json[0].Id)
        setNom(json[0].Nom)
        setPrenom(json[0].Prenom)
        setAdresse(json[0].Adresse)
        setCode(json[0].CodePostal)
        setImage(json[0].PhotoProfil)
      })
      .catch((error) => {
        console.error(error);
      });

    firebase.initializeApp(App.firebaseConfig);
    firebase.analytics();

  }, [])

  let handleChangeName = (event) => {
    setNom(event.target.value)
  }
  let handleChangeSurname = (event) => {
    setPrenom(event.target.value)
  }
  let handleChangeAddress = (event) => {
    setAdresse(event.target.value)
  }
  let handleChangePostal = (event) => {
    setCode(event.target.value)
  }

  const pickImage = async () => {

    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }

  };


  const uploadImage = async (uri, imgName) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase.storage().ref().child(imgName);
    ref.put(blob);

    let test = await firebase.storage()
      .ref('/' + imgName)
      .getDownloadURL();

    return test;
  }




  let handleSubmit = async (event) => {

    let imageName = 'profile' + userId;

    let test1 = await uploadImage(image, imageName);


    let requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        Nom: nom,
        Prenom: prenom,
        CodePostal: code,
        Adresse: adresse,
        userId: userId,
        Photo: test1,
      })
    }
    console.log(requestOptions.body);

    fetch("http://localhost:3000/updateData", requestOptions)
      .then(response => {
        return ("Data successfully updated")
      })
      .catch(error => {
        console.log(error);
      })



    setBtn(true);
    setBool(false);
  }

  let handleBoutonDisplay = () => {
    setBtn(false);
    setBool(true);
  }
  let handleCancel = () => {
    setBtn(true);
    setBool(false);
  }



  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{ uri: image || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png' }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2
          }}
        />
        {bool && <TouchableOpacity color='red' onPress={pickImage}>
          <Text>Changer de photo de profil</Text>
        </TouchableOpacity>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={nom}
          name="Nom"
          editable={bool}
          onChange={handleChangeName}
        />
        <TextInput
          style={styles.textInput}
          value={prenom}
          editable={bool}
          name="Prenom"
          onChange={handleChangeSurname}
        />
        <TextInput
          style={styles.textInput}
          value={adresse}
          editable={bool}
          name="adresse"
          onChange={handleChangeAddress}

        />
        <TextInput
          style={styles.textInput}
          value={code}
          editable={bool}
          name="code"
          onChange={handleChangePostal}
        />
      </View>
      <View style={styles.bottom}>
        {
          btnDisplay
          &&
          <Button
            title="Modifier"
            onPress={handleBoutonDisplay}
            color='blue'
          />
        }
        {
          !btnDisplay &&
          <View style={{ flex: 2, padding: '10' }}>
            <Button
              title="Enregistrer"
              onPress={handleSubmit}
              color='green'
            />
          </View>
        }
        <View style={{ flex: 0.1 }} />
        {
          !btnDisplay &&
          <View style={{ flex: 2, padding: '10' }}>
            <Button
              title="Annuler"
              onPress={handleCancel}
              color='red'
            />
          </View>
        }
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 20
  },
  top: {
    flex: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center'
  },
  inputContainer: {
    flex: 0.3
  },
  textInput: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  bottom: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
