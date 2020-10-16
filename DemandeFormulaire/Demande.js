import React from 'react'
import {StyleSheet, View, TextInput,TouchableOpacity, Text, Alert, Picker } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';



class Demande extends React.Component{

  state = {service : 'Aller faire des courses'}
   updateService = (service) => {
      this.setState({ service: service })
   }

  render(){ 
    return (
      <View style={styles.container}>

        <Title style={{height:100, fontSize:30, textAlign: 'center', fontWeight:"bold"}}> Formulaire de demande de service</Title>

        <Paragraph style={styles.para}> Type de demande</Paragraph>

        <Picker style={styles.listD} selectedValue = {this.state.service} onValueChange = {this.updateService}>
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
    justifyContent: "flex-start",
    backgroundColor: 'rgba(106,106,255,0.6)',
  },

  listD: {
    marginTop: '5%',
    height: '10%',
    fontSize: 30
  },

  bout: {
    width: '80%',
    height : 150,
    backgroundColor: 'rgba(242,100,107,1)',
    borderRadius:20,
    marginTop:'70%',
    marginLeft: '10%'
  },

  para:{
    left:30,
    fontSize:30,
    fontWeight:"bold",
  },
  textBout: {
    color: '#FFF',
    fontSize: 25,
    textAlign: "center",
    marginTop: '20%',
  },

  desc:{
    flex:1,
    position:'absolute',
    height : '35%',
    width : '90%',
    marginLeft: '5%',
    marginTop: '55%',
    fontSize: 40,
    fontWeight :'bold',
    borderWidth: 2,
    borderColor: "#20232a",
    textAlign: "center",
  },

 
});

export default Demande;
