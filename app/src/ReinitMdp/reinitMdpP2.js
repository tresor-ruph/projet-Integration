/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import React from 'react';

let quest = 0;
class ReinitMdp2 extends React.Component {
  constructor(route, props) {
    super(route, props);
    this.state = {
      donnees: '',
      mail: route.route.params.email,
      questionSec: '',
      reponseSec: '',
      motdepasse: '',
      motdepasseVerif: '',
      reponsecomparaison: '',
    };
  }

  async submit() {
    if (this.state.reponseSec == '' || this.state.motdepasse == '' || this.state.motdepasseVerif == '') {
      const simpleAlertHandler = () => {
        alert('Tous les champs ne sont pas remplis !');
      };
      simpleAlertHandler();
      return;
    } else if (
      this.state.motdepasse.length < 8 ||
      this.state.motdepasse.match(/\d+/) == null ||
      this.state.motdepasse == this.state.motdepasse.toLowerCase()
    ) {
      const simpleAlertHandler = () => {
        alert("Le mot de passe n'est pas suffisament compliqué !");
      };
      simpleAlertHandler();
      return;
    } else if (this.state.motdepasse != this.state.motdepasseVerif) {
      const simpleAlertHandler = () => {
        alert('Les mots de passes ne correspondent pas !');
      };
      simpleAlertHandler();
      return;
    }
    //envoie msg d'erreur si le mdp est < 8
    // OU ne contient pas de chiffre OU ne contient pas de majuscul

    console.log('envoyé');
    await this.Envoie();
    this.componentDidMount();
    console.log('bjr');
    this.statut();
  }

  statut() {
    if (this.state.reponsecomparaison == 'erreur de réponse secrète') {
      alert('Erreur de reponse secrète');
    } else {
      alert('Mot de passe réinitialisé');
      this.props.navigation.navigate('Login');
    }
  }
  componentDidMount() {
    fetch(`https://help-recover-api.herokuapp.com/reinitmdpR/${this.state.mail}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({donnees: json[0]});
        quest = json[0].QuestionValue;
      });
  }
  async Envoie() {
    await fetch('https://help-recover-api.herokuapp.com/reinitmdpU/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
      },
      body: JSON.stringify({
        motdepasse: this.state.motdepasse,
        email: this.state.mail,
        reponsesecrete: this.state.reponseSec,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.message);
        this.setState({reponsecomparaison: json.message});
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.reponsecomparaison);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Text1}>Completez les champs suivants afin de réinitialiser votre mot de passe</Text>
        <Text style={styles.Text2}>Votre question secrète : </Text>
        <Text style={styles.Text3}> {this.state.donnees.QuestionValue} </Text>
        <Text style={styles.Text2}>Réponse secrète : </Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({reponseSec: text});
          }}
          placeholder="Entrez votre reponse secrete"
          maxLength={50}
          secureTextEntry
          style={styles.Input}
        />
        <Text style={styles.Text2}>Nouveau mot de passe : </Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({motdepasse: text});
          }}
          placeholder="Entrez votre nouveau mot de passe"
          maxLength={50}
          secureTextEntry
          style={styles.Input}
        />
        <Text style={styles.Text2}>Confirmez votre mot de passe : </Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({motdepasseVerif: text});
          }}
          placeholder="Vérifiez votre nouveau mot de passe"
          maxLength={50}
          secureTextEntry
          style={styles.Input}
        />
        <TouchableOpacity
          style={styles.Bout}
          onPress={() => {
            this.submit();
          }}>
          <Text style={styles.TextBout}> Reinitialiser mot de passe </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  Text1: {
    fontSize: 20,
    marginLeft: '7%',
    marginTop: '5%',
    marginBottom: '3%',
    width: '90%',
  },
  Text2: {
    fontSize: 20,
    marginLeft: '7%',
    marginTop: '2%',
    width: '90%',
    textAlign: 'center',
  },

  Text3: {
    fontSize: 20,
    marginTop: '7%',
    marginBottom: '5%',
    marginLeft: '7%',
    width: '90%',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },

  Input: {
    marginLeft: '5%',
    width: '90%',
    marginTop: '5%',
    marginBottom: '5%',
    height: '10%',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 10,
  },

  Bout: {
    width: '80%',
    height: '16%',
    backgroundColor: 'rgb(0, 150, 136)',
    borderRadius: 20,
    marginLeft: '10%',
    marginTop: '3%',
  },

  TextBout: {
    color: '#FFF',
    fontSize: 30,
    textAlign: 'center',
    marginTop: '8%',
  },
});

export default ReinitMdp2;
