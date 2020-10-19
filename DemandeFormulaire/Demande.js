import React from 'react'
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Alert, Picker } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';




class Demande extends React.Component{

  
  
   updateCategorie = (categorie) => {
      this.setState({ categorie: categorie })
   }

  constructor(){
     super();
     this.state={
       idDemande:this.generateurId(),
       userName:'FloB',
       categorie:'Aller faire des courses',
       descriptif:'',
     }
   }

   generateurId() {
    var uid = function() {
       return (((1+Math.random())*0x50000)|0).toString(16).substring(1);
    };
    return (uid()+uid()+"-"+uid()+"-"+uid()+"-"+uid());
}


  
   submit(){
  
     console.warn(this.state) 

     /*fetch('http://localhost:3000/ajoutDem/', {
      method: 'POST',
      mode:'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
      },

      body: JSON.stringify ({
        idDemande: this.state.idDemande,
        userName: this.state.userName,
        categorie: this.state.categorie,
        descriptif: this.state.descriptif,
       
      })
    }) .then(response => response.json())
    .then(json=> {
      
      console.log(json);
    }).catch((error) => {
      console.error(error);
    });
    */
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
    justifyContent: "center",
    backgroundColor: 'rgba(106,106,255,0.6)',
  },

  bout: {
    width: 200,
    height : 150,
    backgroundColor: 'rgba(242,100,107,1)',
    borderRadius:20,
    marginTop:150,
    left:80,
  },

  para:{
    left:30,
    fontSize:20,
    fontWeight:"bold",
  },
  textBout: {
    color: '#FFF',
    fontSize: 25,
    textAlign: "center",
    marginTop:45,
  },

  desc:{
    flex:1,
    position:'absolute',
    height : 110,
    width : 300,
    left:30,
    fontSize:15,
    fontWeight :'bold',
    borderWidth: 2,
    borderColor: "#20232a",
    textAlign: "center",
  },

 
});

export default Demande;
