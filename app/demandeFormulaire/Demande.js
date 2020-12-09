import React from 'react'
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Alert, Picker } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';
import AsyncStorage from "@react-native-community/async-storage";


let userId = 0
class Demande extends React.Component{

  
  
   updateCategorie = (categorie) => {
      this.setState({ categorie: categorie })
   }

<<<<<<< HEAD
   constructor(props){
    super(props);
    this.state={
      userName:'FloB',
      categorie:'Aller faire des courses',
      descriptif:'',
      userId: '3'
    }
  }

=======
  constructor(props){
     super(props);
     this.state={
       categorie:'Courses',
       descriptif:'',
     }
   }
   componentDidMount(){
     let t = this;
    this.getToken().then(function(result) {
      t.setState({userId : result});
   });
   
   }

   componentDidMount(){
     async function getUserId(){
      let id = await AsyncStorage.getItem('user')
      id = JSON.parse(id).Id
      console.log(id)
      console.log(userId)
      userId = id
     }
     getUserId()
    }
     
>>>>>>> 580549ce9a46b8a5b198b7640ab8afd914ab8ab9
  
   submit(){
     //console.log(this.state) 
     const newDemande = {categorie: this.state.categorie, descriptif: this.state.descriptif, userId: userId}
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
    alert('Demande envoyée.') 
  }
  
  render(){
    return (
      <View style={styles.container}>
        
        <Title style={{height:'6%', fontSize:30, textAlign: 'center', marginTop:'10%'}}> Formulaire de service</Title>

        <Paragraph style={styles.para}> Type de demande</Paragraph>

          <Picker style={{height:'9%', fontSize:19, width:'90%', marginLeft:'5%', marginTop:'2%'}} selectedValue = {this.state.categorie}  onValueChange = {this.updateCategorie}>
              <Picker.Item label="Aller faire des courses" value="Courses" />
              <Picker.Item label="Aller chercher un colis" value="Colis" />
              <Picker.Item label="Récupérer/Emmener une personne" value="Récupérer une personne" />
              <Picker.Item label="Aller faire des lessives" value="Lessive" />
              <Picker.Item label="Autres" value="Autres" />
          </Picker>
         
          <TextInput mode='outlined' multiline={true} numberOfLines={5} onChangeText={(text)=>{this.setState({descriptif:text})}} style={styles.desc} placeholder="Entrez un descriptif du service"/>

          <TouchableOpacity style={styles.bout} onPress={() => {this.submit()}}>

            <Text style={styles.textBout}> Envoyer votre demande </Text>

          </TouchableOpacity>
        
      </View>
    );
  };
};




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

