import React from 'react'
<<<<<<< HEAD:DemandeFormulaire/Demande.js
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Alert, Picker } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';





class Demande extends React.Component{

  
  
   updateCategorie = (categorie) => {
      this.setState({ categorie: categorie })
   }

  constructor(props){
     super(props);
     this.state={
       categorie:'Courses',
       descriptif:'',
       userId: 2
     }
   }


  
   submit(){
  
     //console.log(this.state) 
     const newDemande = {categorie: this.state.categorie, descriptif: this.state.descriptif, userId: this.state.userId}
     console.log(newDemande);

     fetch('http://localhost:3000/demandeE/', {  
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
      },
      body: JSON.stringify({
        
        categorie: newDemande.categorie,
        descriptif: newDemande.descriptif,
        userId: newDemande.userId,
      })
    }) 
  }
  
  render(){
    return (
      <View style={styles.container}>
        
        <Title style={{height:'6%', fontSize:30, textAlign: 'center', marginTop:'10%'}}> Formulaire de service</Title>

        <Paragraph style={styles.para}> Type de demande</Paragraph>

          <Picker style={{height:'9%', fontSize:19, width:'90%', marginLeft:'5%', marginTop:'2%'}} selectedValue = {this.state.categorie}  onValueChange = {this.updateCategorie}>
              <Picker.Item label="Aller faire des courses" value="Courses" />
              <Picker.Item label="Aller chercher un colis" value="Colis" />
              <Picker.Item label="Aller chercher les enfants" value="Récupérer une personne" />
              <Picker.Item label="Aller faire des lessives" value="Lessive" />
              <Picker.Item label="Autres" value="Autres" />
          </Picker>
         
          <TextInput mode='outlined' multiline={true} numberOfLines={5} onChangeText={(text)=>{this.setState({descriptif:text})}} style={styles.desc} placeholder="Entrez un descriptif du service"/>

          <TouchableOpacity style={styles.bout} onPress={() => {this.submit()}}>

            <Text style={styles.textBout}> Envoyer votre demande </Text>

          </TouchableOpacity>
        
=======
import {StyleSheet, View, TextInput, CheckBox,TouchableOpacity, Text, Alert } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';


class Demande extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Title style={{height:100, fontSize:30, textAlign: 'center'}}> Formulaire de demande de service</Title>
        <Paragraph style={styles.para}> Descriptif </Paragraph>
        <TextInput multiline={true} numberOfLines={5} style={styles.desc} placeholder="Entrez un descriptif du service"/>
        <TouchableOpacity style={styles.bout} onPress={() => Alert.alert('Appuyé')}>
          <Text style={styles.textBout}> Envoyer votre demande </Text>
        </TouchableOpacity>
>>>>>>> 007f35d704583775592c5ab655ac89fa9cca126a:app/demandeFormulaire/Demande.js
      </View>
    );
  };
};


<<<<<<< HEAD:DemandeFormulaire/Demande.js


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(230,230,230,1)',
  },

  listD: {
    marginTop: '5%',
    height: '10%',
    fontSize: 30
  },

  bout: {
    width: '92%',
    height : '20%',
    backgroundColor:'rgb(0, 150, 136)',
    borderRadius:20,
    marginTop:'62%',
    marginLeft: '4%', 
  },

  para:{
    height:'3%',
    marginTop:'15%',
    fontSize:25,
    marginLeft:'4%',
  },
  textBout: {
    color: '#FFF',
    fontSize: 30,
    textAlign: 'center',
    marginTop: '11%',
  },

  desc:{
    flex:1,
    position:'absolute',
    height : '27%',
    width : '90%',
    marginLeft: '5%',
    marginTop: '72%',
    fontSize: 30,
    borderWidth: 3,
    borderColor: "#20232a",
    textAlign: "center",
  },


 
});

export default Demande;

=======
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
    height:50,
    left : 40,
    fontSize: 20,
    marginTop:40,
    fontWeight :'bold',
  },

  textBout: {
    color: '#FFF',
    fontSize: 25,
    textAlign: "center",
    marginTop:45,
  },

  desc:{
    position:'absolute',
    height : 110,
    width : 300,
    left:30,
    fontSize:15,
    fontWeight :'bold',
    borderWidth: 2,
    borderColor: "#20232a",
    textAlign: "center",
  }
});





export default Demande
>>>>>>> 007f35d704583775592c5ab655ac89fa9cca126a:app/demandeFormulaire/Demande.js
