import React from "react";
import { StyleSheet, View, Button, TextInput, ScrollView, Switch, Text, Dimensions   } from "react-native";
import PassMeter from "react-native-passmeter";
console.disableYellowBox = true;
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        auth: false,
      }
      //sert ds la visualisation du mdp
      this.toggleSwitch = this.toggleSwitch.bind(this);  
    }


    async storeToken(m) {
      try {
         await AsyncStorage.setItem("session", JSON.stringify(m));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
    async getToken() {
      try {
        let userData = await AsyncStorage.getItem("session");
        let data = JSON.parse(userData);
        console.log(data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }

    //sert ds la visualisation du mdp
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
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
      //envoie msg d'erreur si mdp répété est différent
      if(this.state.motdepasse != this.state.repMotdepasse) {
        let simpleAlertHandler = () => {
          alert("Le mot de passe n'est pas correctement répété !");
        };
        simpleAlertHandler();
        return;
      }
      //envoie msg d'erreur si le mdp est < à 8 OU ne contient pas de chiffre OU ne contient pas de majuscule
      if(this.state.motdepasse.length < 8 || JSON.stringify(this.state.motdepasse).match(/\d+/) == null || JSON.stringify(this.state.motdepasse) == JSON.stringify(this.state.motdepasse).toLowerCase()) {
        let simpleAlertHandler = () => {
          alert("Le mot de passe n'est pas suffisament compliqué !");
        };
        simpleAlertHandler();
        return;
      }


      var bcrypt = require('bcryptjs');
      /*
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(this.state.motdepasse, salt);
      console.log(hash);
      console.log(bcrypt.compareSync(this.state.motdepasse,hash));
      */
     var auth = false;
     var id = 0;
     var t = this;
     var mdp = this.state.motdepasse;
     var  nom = this.state.nom;
       var   prenom= this.state.prenom;
       var   adresse= this.state.adresse;
       var   dateNaissance= this.state.dateNaissance;
       var  mail = this.state.mail;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(mdp, salt, function(err, hash) {
      fetch('http://localhost:8080/auth/', {
        method: 'POST',
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          adresse: adresse,
          dateNaissance: dateNaissance,
          mail: mail,
          password: hash
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"true"
        }
      }) .then(response => response.json())
      .then(json => {
        if(json.message == 'inscription finie'){
        //this.setState({ auth: true });
        console.log('viens la');
          auth = true;
          id = json.id;
          console.log(id);
          
          t.storeToken(id);
          t.props.navigation.navigate('HomeScreen');
        
        }
      console.log(json);

        
      }).catch((error) => {
        console.error(error);
      });
      //vider les textInput; utile que parce qu'il n'y a pas encore la redirection apres s'etre inscrit
      /*
      this.textNom.clear();
      this.textPrenom.clear();
      this.textAdresse.clear();
      this.textDateNaissance.clear();
      this.textEmail.clear();
      this.textMdp.clear();
      this.textMdp2.clear();
     */
        });
      });

      
    }

    render() {
      return ( 
        <ScrollView useNativeDriver= {true}>
          <View style={styles.container}>
            <TextInput
              placeholder="Nom"
              maxLength={50}
              autoCapitalize="sentences"
              onChangeText={(text)=> { this.setState({ nom: text }) }}
              ref={input => { this.textNom = input }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Prénom"
              maxLength={50}
              autoCapitalize="sentences"
              onChangeText={(text)=> { this.setState({ prenom: text }) }}
              ref={input => { this.textPrenom = input }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Adresse"
              maxLength={50}
              autoCapitalize="sentences"
              onChangeText={(text)=> { this.setState({ adresse: text }) }}
              ref={input => { this.textAdresse = input }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Date de naissance"
              onChangeText={(text)=> { this.setState({ dateNaissance: text }) }}
              ref={input => { this.textDateNaissance = input }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Adresse email"
              maxLength={50}
              onChangeText={(text)=> { this.setState({ mail: text }) }}
              ref={input => { this.textEmail = input }}
              style={styles.textInput}
            ></TextInput>
            <TextInput
              placeholder="Mot de passe"
              maxLength={12}
              secureTextEntry={this.state.showPassword}
              onChangeText={(text)=> { this.setState({ motdepasse: text }) }}
              ref={input => { this.textMdp = input }}
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
              placeholder="Répétition du mot de passe"
              maxLength={12}
              secureTextEntry={this.state.showPassword}
              onChangeText={(text)=> { this.setState({ repMotdepasse: text }) }}
              ref={input => { this.textMdp2 = input }}
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
  materialFixedLabelTextbox3: {
    height: 43,
    width: 133
  },
  materialFixedLabelTextbox4: {
    height: 43,
    width: 133,
    marginLeft: 68
  },
  materialFixedLabelTextbox3Row: {
    height: 43,
    flexDirection: "row",
    marginTop: 62,
    marginLeft: 2,
    marginRight: 24
  },
  materialRightIconTextbox: {
    height: 43,
    width: 320,
    marginTop: 93,
    marginLeft: 16
  },
  materialButtonSuccess: {
    height: 43,
    width: 108,
    borderRadius: 18,
    marginTop: 56,
    marginLeft: 130
  },
  loremIpsum5: {
    color: "#121212",
    marginTop: 37,
    marginLeft: 186
  },
  loremIpsum4: {
    color: "#121212",
    marginTop: 6,
    marginLeft: 180
  },
  rect5: {
    top: 0,
    left: 0,
    width: 328,
    height: 19,
    position: "absolute",
    backgroundColor: "rgba(230,230,230,1)"
  },
  materialButtonShare: {
    height: 37,
    width: 39,
    position: "absolute",
    left: 293,
    top: 10
  },
  rect5Stack: {
    top: 0,
    left: 0,
    width: 332,
    height: 47,
    position: "absolute"
  },
  loremIpsum3: {
    top: 46,
    left: 229,
    position: "absolute",
    color: "#121212"
  },
  rect5StackStack: {
    width: 332,
    height: 47,
    marginTop: 105,
    marginLeft: 15
  },
  loremIpsum: {
    color: "#121212"
  },
  connectezVous: {
    color: "rgba(208,27,27,1)",
    textDecorationLine: "underline",
    marginLeft: 5
  },
  loremIpsumRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 34,
    marginLeft: 26,
    marginRight: 55
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 329,
    position: "absolute",
    left: 0,
    top: 282
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
})

export default Form;