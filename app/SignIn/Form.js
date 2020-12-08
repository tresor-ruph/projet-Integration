import React from "react";
import { StyleSheet, View, Button, TextInput, ScrollView, Switch, Text, Dimensions, ImageBackground   } from "react-native";
import PassMeter from "react-native-passmeter";
import AsyncStorage from '@react-native-community/async-storage';




console.disableYellowBox = true;


class Form extends React.Component {
    constructor() {
      super();
      this.state={
        //image: { uri: "fond-ecran.jpg" },
        nom:'',
        prenom:'',
        motdepasse:'',
        repMotdepasse:'',
        adresse: '',
        dateNaissance: '', 
        mail: '',
        codePostal: '',
        showPassword: true,
        label: ["Trop court", "Il faut au moins 1 chiffre, 1 lettre majuscule et 1 lettre minuscule !", "Il faut au moins 1 lettre minuscule, 1 lettre majuscule et 1 chiffre !", "Mot de passe valide"],
      }
      //sert ds la visualisation du mdp
      this.toggleSwitch = this.toggleSwitch.bind(this);  
      
    }
    //sert ds la visualisation du mdp
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
    async storeToken(m) {
      try {
         await AsyncStorage.setItem("id", JSON.stringify(m));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    async getToken() {
      try {
        let userData = await AsyncStorage.getItem("id");
        let data = JSON.parse(userData);
        console.log(data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    submit() {
      //envoie msg d'erreur si un champ est encore vide
      if(this.state.nom == '' || this.state.prenom == '' || this.state.motdepasse == '' || this.state.repMotdepasse == '' || this.state.adresse == '' || this.state.dateNaissance == '' || this.state.mail == '') {
        let simpleAlertHandler = () => {
          alert("Tous les champs ne sont pas remplis !");
        };
        simpleAlertHandler();
        return;
      }
     //envoie msg d'erreur si dateNaissance est != 10 , ne comprends pas de '/' ou contient autre chose que chiffre et /
      if( this.state.dateNaissance.length != 10 || this.state.dateNaissance.includes('/') == false || this.state.dateNaissance.match(/[^0-9/]/) != null){
        let simpleAlertHandler = () => {
          alert("La date de naissance ne correspond pas au format !");
        };
        simpleAlertHandler();
        return;
      }
      //envoie msg d'erreur si le nbre de chiffre != 8 , si position '/' != 2 et != 5
      if(this.state.dateNaissance.match(/[0-9]/g).length != 8 || this.state.dateNaissance.match(/[/]/g).length != 2 || this.state.dateNaissance.indexOf('/') != 2 || this.state.dateNaissance.lastIndexOf('/') != 5) {
        let simpleAlertHandler = () => {
          alert("La date de naissance ne correspond pas au format !");
        };
        simpleAlertHandler();
        return;
      }
      //envoie msg d'erreur si email ne contient pas @ et . et est plus petit que 8
      if(this.state.mail.includes('@') == false || this.state.mail.includes('.') == false || this.state.mail.length < 8) {
        let simpleAlertHandler = () => {
          alert("Adresse mail incorrecte !");
        };
        simpleAlertHandler();
        return;
      }      
      //envoie msg d'erreur si mdp répété est différent
      if(this.state.motdepasse != this.state.repMotdepasse) {
        let simpleAlertHandler = () => {
          alert("Le mot de passe n'est pas correctement répété !");
        };
        simpleAlertHandler();
        return;
      }
      //envoie msg d'erreur si le mdp est < Ã  8 OU ne contient pas de chiffre OU ne contient pas de majuscule
      if (this.state.motdepasse.length < 8 || this.state.motdepasse.match(/\d+/) == null || this.state.motdepasse == this.state.motdepasse.toLowerCase()) {
        let simpleAlertHandler = () => {
          alert("Le mot de passe n'est pas suffisament compliqué !");
        };
        simpleAlertHandler();
        return;
      }
      //envoie un msg d'erreur si code postal ne contient pas que des chiffres
      if (this.state.codePostal.match(/[0-9]/g) == null) {
        let simpleAlertHandler = () => {
          alert("Le code postal n'est pas correct, uniquement les chiffres sont acceptés !");
        };
        simpleAlertHandler();
        return;
      }

      var bonneDate = this.state.dateNaissance.replace('/', ',');
      bonneDate = bonneDate.replace('/', ',');
      fetch('http://192.168.0.15:3000/auth/', { //192.168.0.15 localhost
        method: 'POST',
        body: JSON.stringify({
          nom: this.state.nom,
          prenom: this.state.prenom,
          adresse: this.state.adresse,
          dateNaissance: bonneDate,
          Mail: this.state.mail,
          codePostal: this.state.codePostal,
          password: this.state.motdepasse
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"true"
        }
      }).then(response => response.json())
      .then(json => {
        if(json.message == 'inscription finie'){
            this.storeToken(json.id);
            this.props.navigation.navigate('Succes');
        }
        }).catch((error) => {
          alert("Echec de connexion. Réessayez.");
        });
       
        
 }
    render() {
      return ( 
        <ScrollView>
          <ImageBackground source={require('../img/degrade4.jpg')}>
          <View style={styles.container}>
            <Text style={{fontSize: '130%', fontWeight: 'bold', textAlign: "auto", marginBottom: '1%'}}>Formulaire d'inscription</Text>
            <TextInput
              placeholder="Nom"
              maxLength={50}
              autoCapitalize="sentences"
              onChangeText={(text)=> { this.setState({ nom: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Prenom"
              maxLength={50}
              autoCapitalize="sentences"
              onChangeText={(text)=> { this.setState({ prenom: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Adresse"
              maxLength={50}
              autoCapitalize="sentences"
              onChangeText={(text)=> { this.setState({ adresse: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Code postal"
              maxLength={50}
              onChangeText={(text)=> { this.setState({ codePostal: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Date de naissance (ex:20/01/2000)"
              onChangeText={(text)=> { this.setState({ dateNaissance: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Adresse mail"
              maxLength={50}
              onChangeText={(text)=> { this.setState({ mail: text }) }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Mot de passe"
              maxLength={50}
              secureTextEntry={this.state.showPassword}
              onChangeText={(text)=> { this.setState({ motdepasse: text }) }}
              style={styles.textInput}
            ></TextInput>
            <PassMeter
              showLabels
              password={this.state.motdepasse}
              maxLength={12}
              minLength={8}
              labels={ this.state.label }
            />
            <TextInput
              placeholder="Repetition du mot de passe"
              maxLength={50}
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
            <View style={styles.inscrip}>
            <Button 
              title="S'inscrire"
              onPress={()=>{this.submit()}}
            ></Button>
            </View>
          </View>
          </ImageBackground>
        </ScrollView>
      )
    }
}

const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: '5%'
  },

  inscrip:{
    width: '90%',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },

  textInput: {
    height: 50,
    width: '93%',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: '3%',
    borderRadius: 8,
    fontSize: '105%'
  },
  
  text: {
    textAlign: 'center',
    fontSize: '105%',
    marginTop: 10,
  },
  switch: {
    transform:[{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginLeft: '0%',
    marginBottom: '5%',
    marginTop: '5%',
  },
})

export default Form;