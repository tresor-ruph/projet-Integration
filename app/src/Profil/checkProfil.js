/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */

/* eslint-disable no-unused-vars */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {TouchableOpacity} from 'react-native';

export default function checkProfil({navigation, route}) {
  const [value, onChangeValue] = React.useState(route.params.id);
  const [nom1, onChangeNom] = React.useState(route.params.nom);
  const [prenom1, onChangePrenom] = React.useState(route.params.prenom);
  const title1 = `${nom1} ${prenom1}`;

  const [nom, setNom] = useState(' ');
  const [prenom, setPrenom] = useState(' ');
  const [adresse, setAdresse] = useState(' ');
  const [code, setCode] = useState(' ');
  const [bool, setBool] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isConnected, setConnection] = useState(true);
  const [rating, setRating] = useState(3);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title1 === '' ? 'No title' : title1,
    });
  }, [navigation, title1]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      handleConnectivityChange(state.isConnected);
    });
    const init = async () => {
      fetch(`https://help-recover-api.herokuapp.com/users/${value}`)
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
    };
    let compte = 0;
    let c = 0;
    fetch('https://help-recover-api.herokuapp.com/notation/', {
      method: 'POST',
      body: JSON.stringify({
        Id: value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message == 'pas de demande a ce nom') {
        } else {
          if (json.resultat[0] == undefined) {
            compte = 3;
            setRating(compte);
          } else {
            for (let i = 0; i < json.resultat.length; i++) {
              compte += json.resultat[i].rating;
              c++;
            }
            compte /= c;
            setRating(compte);
          }
        }
      });

    unsubscribe();
    init();
  }, []);

  const handleConnectivityChange = (connect) => {
    setConnection({connect});
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
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2,
          }}
        />
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
      <View>
        <Text>Sa note moyenne est de : {rating}</Text>
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
});
