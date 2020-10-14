import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';


class Form extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.texte} placeholder="Insérez votre nom" />
        <TextInput style={styles.texte} placeholder="Insérez vote prénom" />
        <TextInput style={styles.texte} placeholder="Insérez votre email" />
        <TextInput style={styles.texte} placeholder="Insérez votre mot de passe" secureTextEntry />
        <TextInput 
        style={styles.texte} placeholder="Veuillez confirmer votre mot de passe" secureTextEntry
        />
        <TextInput style={styles.texte} placeholder="Insérez votre adresse" />
        <TextInput style={styles.texte} placeholder="Insérez votre numéro d'habitation" />
        <TextInput style={styles.texte} placeholder="Insérez votre code postal" />
        <Button title="Inscription" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCAE9D',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  texte: {
    margin: 6,
    borderColor: '#251F49',
    borderWidth: 1,
    fontWeight: 'bold',
    padding: 3,
  }
});


export default Form;

