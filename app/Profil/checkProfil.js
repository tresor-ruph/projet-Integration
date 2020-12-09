/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";


// eslint-disable-next-line require-jsdoc
export default function checkProfil({ navigation, route }) {
  // eslint-disable-next-line no-unused-vars
  const [value, onChangeValue] = React.useState(route.params.id);
  // eslint-disable-next-line no-unused-vars
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
      fetch(`http://localhost:3000/users/${value}`)
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
    fetch('http://localhost:3000/notation/', {
                method: 'POST',
                body: JSON.stringify({
                  Id: value
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "true"
                }
              }).then(response => response.json())
              .then(json => {
                // eslint-disable-next-line eqeqeq
                // eslint-disable-next-line no-empty
                // eslint-disable-next-line eqeqeq
                if (json.message == 'pas de demande a ce nom') {
                } else {
                  // eslint-disable-next-line eqeqeq
                  // eslint-disable-next-line no-lonely-if
                  // eslint-disable-next-line eqeqeq
                  // eslint-disable-next-line no-lonely-if
                  // eslint-disable-next-line eqeqeq
                  // eslint-disable-next-line no-lonely-if
                  // eslint-disable-next-line eqeqeq
                  // eslint-disable-next-line no-lonely-if
                  // eslint-disable-next-line eqeqeq
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

  const handleConnectivityChange = connect => {
    setConnection({ connect });
  };

  return !isLoaded ? (isConnected ? <ActivityIndicator size="large" color="blue" /> : <View><Text>No internet Connection !</Text></View>) :
  (<KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={styles.container}
  >
      <View style={styles.top}>
        <Image
          source={{ uri: image || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png' }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2,
          }}
        />
      </View>

      <View style={styles.middle}>
        <TextInput
          value={nom}
          style={styles.textInput}
          label="Nom"
          name="Nom"
          mode='outlined'
          editable={bool}
        />
        <TextInput
          value={prenom}
          style={styles.textInput}
          editable={bool}
          mode='outlined'
          label="Prenom"
          name="Prenom"
        />
        <TextInput
          value={adresse}
          style={styles.textInput}
          editable={bool}
          label="Adresse"
          name="adresse"
          mode='outlined'

        />
        <TextInput
          value={code}
          style={styles.textInput}
          editable={bool}
          label="Code postal"
          name="code"
          mode='outlined'
        />
        <TextInput
          value={`cote : ${rating}`}
          style={styles.textInput}
          editable={bool}
          label="Code postal"
          name="code"
          mode='outlined'
        />
      </View>
      
    </KeyboardAvoidingView>
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
    flex: 0.5,
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
  middle: {
    flex: 0.5,
  },
});
