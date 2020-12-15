/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable quotes */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, View, Image, TextInput, ActivityIndicator, Text, KeyboardAvoidingView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

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
          alert('Erreur de connexion');
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
    if (!nom || !prenom || !code || !adresse) {
      alert('Veuillez remplir tous les champs');
    } else {
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
    }
  };

  const handleBoutonDisplay = () => {
    setBtn(false);
    setBool(true);
  };
  function logout() {
    AsyncStorage.removeItem('user');
    navigate('Connexion');
  }

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
        alert('Erreur de connexion');
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
    <LinearGradient
      start={{x:0.5, y: 0}}
      end={{x: 0.8, y: 0.8}}
      locations={[0, 0.9]}
      colors={[  '#0077b6','#ffffff']}
      style={styles.linearGradient}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 60}}>
          <View style={styles.top}>
            <View style={styles.imageFrame}>
              <Image
                source={{uri: image || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 200 / 2,
                }}
              />
            </View>
            {bool && (
              <View style={styles.photoButton}>
                <Icon name="camera" style={{fontSize: 25, color: 'green', left: -20}} onPress={pickImage} />
                <Icon name="delete" style={{fontSize: 25, color: 'red', left: 10}} onPress={deleteImage} />

                {/* <Button onPress={pickImage} icon="camera" style={{color: 'green'}} />
              <Button onPress={deleteImage} icon="delete" /> */}
              </View>
            )}
          </View>

          <View style={{marginTop: 20, marginLeft: 15}}>
            <TextInput
              value={nom}
              style={!bool ? styles.textInput : styles.textInput2}
              name="Nom"
              editable={bool}
              onChangeText={(text) => setNom(text)}
            />
            <TextInput
              value={prenom}
              style={!bool ? styles.textInput : styles.textInput2}
              editable={bool}
              name="Prenom"
              onChangeText={(text) => setPrenom(text)}
            />
            <TextInput
              value={adresse}
              style={!bool ? styles.textInput : styles.textInput2}
              editable={bool}
              name="adresse"
              onChangeText={(text) => setAdresse(text)}
            />
            <TextInput
              value={code}
              style={!bool ? styles.textInput : styles.textInput2}
              editable={bool}
              name="code"
              onChangeText={(text) => setCode(text)}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          {btnDisplay ? (
            <View style={styles.bottomButton}>
              <View style={{marginRight: 20, width: 150, borderRadius: 20}}>
                <Button title="Modifier" onPress={handleBoutonDisplay} color="green" />
              </View>
              <View style={{width: 150}}>
                <Button title="Mes Notes" onPress={() => navigate('Notation2')} />
              </View>
            </View>
          ) : (
            <View style={styles.bottomButton}>
              <View style={{marginRight: 20, width: 150, borderRadius: 20}}>
                <Button title="Enregistrer" onPress={handleSubmit} color="green" />
              </View>
              <View style={{width: 150}}>
                <Button title="Annuler" onPress={handleCancel} color="red" />
              </View>
            </View>
          )}
          <View style={{width: 200, marginLeft: 100, marginTop: 100}}>
            <Button title="Deconnexion" color="red" onPress={() => logout()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  photoButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageFrame: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInput: {
    width: 210,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
    color: 'black',
    paddingLeft: 75,
    paddingTop: 5,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'rgba(212,212,212,0.8)',
  },
  textInput2: {
    width: 210,
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
    padding: 15,
  },
  bottom: {
    padding: 10,
    margin: 15,
  },
  bottomButton: {
    flexDirection: 'row',
    margin: 20,
    padding: 15,
  },
  bottomButton1: {
    margin: 5,
  },
});
