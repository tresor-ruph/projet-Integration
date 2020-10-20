import React from 'react'
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Alert, Picker } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';
import axios from 'axios'




class Demande extends React.Component{

  
  
   updateCategorie = (categorie) => {
      this.setState({ categorie: categorie })
   }

  constructor(props){
     super(props);
     this.state={
       userName:'FloB',
       categorie:'Aller faire des courses',
       descriptif:'',
     }
   }


  
   submit(){
  
     console.log(this.state) 
     const newDemande = {userName: this.state.userName, categorie: this.state.categorie, descriptif: this.state.descriptif}
     console.log(newDemande);

     fetch('http://localhost:3000/demandeE/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
      },
      body: JSON.stringify({
        userName: newDemande.userName,
        categorie: newDemande.categorie,
        descriptif: newDemande.descriptif,
      })
    }) 
  }
  
  render(){
    return (
      <View style={styles.container}>
        
        <Title style={{height:100, fontSize:30, textAlign: 'center'}}> Formulaire de demande de service</Title>

        <Paragraph style={styles.para}> Type de demande</Paragraph>

          <Picker selectedValue = {this.state.categorie}  onValueChange = {this.updateCategorie}>
              <Picker.Item label="Aller faire des courses" value="courses" />
              <Picker.Item label="Aller chercher un colis" value="colis" />
              <Picker.Item label="Aller chercher les enfants" value="Enfants" />
              <Picker.Item label="Aller faire des lessives" value="Lessive" />
              <Picker.Item label="Autres" value="Autres" />
          </Picker>
         
          <TextInput multiline={true} numberOfLines={5} onChangeText={(text)=>{this.setState({descriptif:text})}} style={styles.desc} placeholder="Entrez un descriptif du service"/>

          <TouchableOpacity style={styles.bout} onPress={() => {this.submit(),Alert.alert("Demande envoyée")}}>

            <Text style={styles.textBout}> Envoyer votre demande </Text>

          </TouchableOpacity>
        
      </View>
    );
  };
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'rgba(106,106,255,0.6)',
  },

  listD: {
    marginTop: '5%',
    height: '10%',
    fontSize: 30
  },

  bout: {
    width: '98%',
    height : '20%',
    backgroundColor: 'rgba(242,100,107,1)',
    borderRadius:20,
    marginTop:'80%',
    marginLeft: '1%', 
  },

  para:{
    fontSize:20,
    fontWeight:"bold",
    marginTop: '5%'
  },
  textBout: {
    color: '#FFF',
    fontSize: 35,
    textAlign: "center",
    marginTop: '7%',
  },

  desc:{
    flex:1,
    position:'absolute',
    height : '35%',
    width : '90%',
    marginLeft: '5%',
    marginTop: '45%',
    fontSize: 40,
    fontWeight :'bold',
    borderWidth: 2,
    borderColor: "#20232a",
    textAlign: "center",
  },


 
});

export default Demande;

