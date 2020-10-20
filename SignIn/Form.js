import React from "react";
import { StyleSheet, View, Button, TextInput, ScrollView, Switch, Text, Dimensions, SafeAreaView  } from "react-native";
import PassMeter from "react-native-passmeter";

//const labeltest = ["Trop court", "Il faut au moins 1 chiffre !", "Il faut au moins 1 lettre majuscule !", "Mot de passe valide"];

class Form extends React.Component {
    constructor() {
      super();
      this.state={
        nom:'',
        prenom:'',
        motdepasse:'',
        repMotdepasse:'',
        adresse: '',
        dateNaissance: '',
        mail: '',
        showPassword: true,
        label: ["Trop court", "Il faut au moins 1 chiffre !", "Il faut au moins 1 lettre majuscule !", "Mot de passe valide"],
      }
      //sert ds la visualisation du mdp
      this.toggleSwitch = this.toggleSwitch.bind(this);  
    }
    //sert ds la visualisation du mdp
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }

    submit() {
      //envoie msg d'erreur si un champ est encore vide
     /* if(this.state.nom == '' || this.state.prenom == '' || this.state.motdepasse == '' || this.state.repMotdepasse == '' || this.state.adresse == '' || this.state.dateNaissance == '' || this.state.mail == '') {
        let simpleAlertHandler = () => {
          alert("Tous les champs ne sont pas remplis !");
        };
        simpleAlertHandler();
        console.log(this.state);
        return;
      }
      //envoie msg d'erreur si mdp répété est différent
      if(this.state.motdepasse != this.state.repMotdepasse) {
        let simpleAlertHandler = () => {
          alert("Le mot de passe n'est pas correctement répété !");
        };
        simpleAlertHandler();
        console.log(this.state + ' oui');
        return;
      }*/
      if(this.state.label.values != "Mot de passe valide") {
        let simpleAlertHandler = () => {
          alert("Le mot de passe n'est pas suffisament compliqué !");
        };
        simpleAlertHandler();
        //console.log(PassMeter.propTypes.showLabels().propName)
        console.log(PropTypes.checkPropTypes(PassMeter, labels, ))
        return;
      }

      fetch('http://localhost:8080/auth/', {
        method: 'POST',
        body: JSON.stringify(
          /* c'est mieux ceci qui est en commentaire car le state contient des elements inutiles à la DB
          nom: this.state.nom,
          prenom: this.state.prenom,
          adresse: this.state.adresse,
          dateNaissance: this.state.dateNaissance,
          mail: this.state.mail,
          password: this.state.motdepasse
          */
          this.state
        ),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"true"
        }
      }) .then(response => response.json())
      .then(json => {
      console.log(json);
      }).catch((error) => {
        console.error(error);
      });
      
    }

    render() {
      return ( 
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              placeholder="Nom"
              onChangeText={(text)=> { this.setState({ nom: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Prénom"
              onChangeText={(text)=> { this.setState({ prenom: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Adresse"
              onChangeText={(text)=> { this.setState({ adresse: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Date de naissance"
              onChangeText={(text)=> { this.setState({ dateNaissance: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Adresse email"
              onChangeText={(text)=> { this.setState({ mail: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Mot de passe"
              secureTextEntry={this.state.showPassword}
              onChangeText={(text)=> { this.setState({ motdepasse: text }) }}
              style={styles.textInput}
            ></TextInput>
            <PassMeter
              showLabels
              password={this.state.motdepasse}
              maxLength={12}
              minLength={1}
              labels={ this.state.label }
              
            />
            <TextInput
              placeholder="Répétition du mot de passe"
              secureTextEntry={this.state.showPassword}
              onChangeText={(text)=> { this.setState({ repMotdepasse: text }) }}
              style={styles.textInput}
            ></TextInput>
            <Text style={styles.text}>
              Cliquer pour afficher les mots de passe
            </Text>
            <Switch
              onValueChange={this.toggleSwitch}
              value={!this.state.showPassword}
              style={styles.switch}
            />
            <Button
              title="S'inscrire"
              onPress={()=>{this.submit()}}
            ></Button>
          </View>
        </ScrollView>
      )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#eaeaea",    
  },

  textInput: {
   marginTop: 25,
   borderWidth:1,
   borderColor:'blue',
   borderRadius: 10,
   textAlign: "center",
   height: 45,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  switch: {
    transform:[{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginRight: (windowWidth-100)/2,
    marginBottom: 40,
    marginTop: 10,
  },
  meter: {
    width: windowWidth-100,
  }

})

export default Form;