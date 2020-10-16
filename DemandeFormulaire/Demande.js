import React from 'react'
<<<<<<< HEAD
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Alert, Picker } from 'react-native'
=======
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
>>>>>>> fa36ff2092f36b2e69285c01e51e82a292293ad3
import { Title, Paragraph } from 'react-native-paper';



class Demande extends React.Component{

  state = {service : 'Aller faire des courses'}
   updateService = (service) => {
      this.setState({ service: service })
   }

  render(){
    return (
      <View style={styles.container}>

        <Title style={{height:100, fontSize:30, textAlign: 'center'}}> Formulaire de demande de service</Title>

        <Paragraph style={styles.para}> Type de demande</Paragraph>

        <Picker selectedValue = {this.state.service} onValueChange = {this.updateService}>
            <Picker.Item label="Aller faire des courses" value="courses" />
            <Picker.Item label="Aller chercher à manger" value="Resto" />
            <Picker.Item label="Aller chercher les enfants" value="Enfants" />
            <Picker.Item label="Aller faire des lessives" value="Lessive" />
            <Picker.Item label="Autres" value="others" />
         </Picker>
         
        <TextInput multiline={true} numberOfLines={5} style={styles.desc} placeholder="Entrez un descriptif du service"/>

        <TouchableOpacity style={styles.bout} onPress={() => Alert.alert('Appuyé')}>

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
