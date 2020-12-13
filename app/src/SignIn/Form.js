/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
import React from 'react';
import {StyleSheet, View, Button, TextInput, ScrollView, Switch, Text, ImageBackground, Picker} from 'react-native';
import PassMeter from 'react-native-passmeter';
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      nom: '',
      prenom: '',
      motdepasse: '',
      repMotdepasse: '',
      adresse: '',
      dateNaissance: '',
      mail: '',
      codePostal: '',
      showPassword: true,
      question: 'Quel était le prénom de votre premier animal domestique ?',
      reponseSec: '',
      label: [
        'Trop court',
        'Il faut au moins 1 chiffre et 1 lettre majuscule !',
        'Il faut au moins 1 lettre majuscule et 1 chiffre !',
        'Mot de passe valide',
      ],
    };
    //sert ds la visualisation du mdp
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }
  //sert ds la visualisation du mdp
  toggleSwitch() {
    this.setState({showPassword: !this.state.showPassword});
  }

  nombre = Math.floor(Math.random() * 100) + 1;
  async storeToken(m) {
    try {
      await AsyncStorage.setItem('id', JSON.stringify(m));
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  async getToken() {
    try {
      const userData = await AsyncStorage.getItem('id');
      const data = JSON.parse(userData);
      console.log(data);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  updateQuestion = (question) => {
    this.setState({question});
  };

  submit() {
    if (
      this.state.nom == '' ||
      this.state.prenom == '' ||
      this.state.motdepasse == '' ||
      this.state.repMotdepasse == '' ||
      this.state.adresse == '' ||
      this.state.dateNaissance == '' ||
      this.state.mail == ''
    ) {
      const simpleAlertHandler = () => {
        alert('Tous les champs ne sont pas remplis !');
      };
      simpleAlertHandler();
      return;
    }
    if (
      this.state.dateNaissance.length != 10 ||
      this.state.dateNaissance.includes('/') == false ||
      this.state.dateNaissance.match(/[^0-9/]/) != null
    ) {
      const simpleAlertHandler = () => {
        alert('La date de naissance ne correspond pas au format !');
      };
      simpleAlertHandler();
      return;
    }
    if (
      this.state.dateNaissance.match(/[0-9]/g).length != 8 ||
      this.state.dateNaissance.match(/[/]/g).length != 2 ||
      this.state.dateNaissance.indexOf('/') != 2 ||
      this.state.dateNaissance.lastIndexOf('/') != 5
    ) {
      const simpleAlertHandler = () => {
        alert('La date de naissance ne correspond pas au format !');
      };
      simpleAlertHandler();
      return;
    }
    if (
      this.state.mail.includes('@') == false ||
      this.state.mail.includes('.') == false ||
      this.state.mail.length < 8
    ) {
      const simpleAlertHandler = () => {
        alert('Adresse mail incorrecte !');
      };
      simpleAlertHandler();
      return;
    }
    if (this.state.motdepasse != this.state.repMotdepasse) {
      const simpleAlertHandler = () => {
        alert("Le mot de passe n'est pas correctement répété !");
      };
      simpleAlertHandler();
      return;
    }
    if (
      this.state.motdepasse.length < 8 ||
      this.state.motdepasse.match(/\d+/) == null ||
      this.state.motdepasse == this.state.motdepasse.toLowerCase()
    ) {
      const simpleAlertHandler = () => {
        alert("Le mot de passe n'est pas suffisament compliqué !");
      };
      simpleAlertHandler();
      return;
    }
    if (this.state.codePostal.match(/[0-9]/g) == null) {
      const simpleAlertHandler = () => {
        alert("Le code postal n'est pas correct, uniquement les chiffres sont acceptés !");
      };
      simpleAlertHandler();
      return;
    }
    this.props.navigation.navigate('Code de securite', {values: this.state});

    //this.envoie();
  }

  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="Nom"
            maxLength={50}
            autoCapitalize="sentences"
            onChangeText={(text) => {
              this.setState({nom: text});
            }}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Prenom"
            maxLength={50}
            autoCapitalize="sentences"
            onChangeText={(text) => {
              this.setState({prenom: text});
            }}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Adresse"
            maxLength={50}
            autoCapitalize="sentences"
            onChangeText={(text) => {
              this.setState({adresse: text});
            }}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Code postal"
            maxLength={50}
            onChangeText={(text) => {
              this.setState({codePostal: text});
            }}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Date de naissance (ex:20/01/2000)"
            onChangeText={(text) => {
              this.setState({dateNaissance: text});
            }}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Adresse mail"
            maxLength={50}
            onChangeText={(text) => {
              this.setState({mail: text});
            }}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Mot de passe"
            maxLength={50}
            secureTextEntry={this.state.showPassword}
            onChangeText={(text) => {
              this.setState({motdepasse: text});
            }}
            style={styles.textInput}
          />
          <PassMeter
            showLabels
            password={this.state.motdepasse}
            maxLength={12}
            minLength={8}
            labels={this.state.label}
          />

          <TextInput
            placeholder="Repetition du mot de passe"
            maxLength={50}
            secureTextEntry={this.state.showPassword}
            onChangeText={(text) => {
              this.setState({repMotdepasse: text});
            }}
            style={styles.textInput}
          />
          <Text style={styles.text}>Cliquer pour afficher les mots de passe</Text>
          <Switch onValueChange={this.toggleSwitch} value={!this.state.showPassword} style={styles.switch} />

          <View style={styles.inscrip}>
            <Button
              title="S'inscrire"
              onPress={() => {
                this.submit();
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7%',
  },

  inscrip: {
    marginTop: 20,
    width: '90%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  textInput: {
    height: 50,
    width: '93%',
    backgroundColor: 'white',
    marginBottom: '3%',
    borderRadius: 8,
    borderColor: 'black',
  },

  text: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
    marginLeft: '0%',
    marginBottom: '5%',
    marginTop: '5%',
  },
  bar: {
    width: '10%',
  },
});

export default Form;
