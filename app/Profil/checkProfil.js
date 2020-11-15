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
} from "react-native";


// eslint-disable-next-line require-jsdoc
export default function checkProfil(props) {

  const [nom, setNom] = useState(' ');
  const [prenom, setPrenom] = useState(' ');
  const [adresse, setAdresse] = useState(' ');
  const [code, setCode] = useState(' ');
  const [bool, setBool] = useState(false);
  const [image, setImage] = useState(null);


  useEffect(() => {
    const init = async () => {
      fetch(`http://192.168.1.7:3000/users/${props.id}`)
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
    };
    init();
  }, []);

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
      </View>

      <View>
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
