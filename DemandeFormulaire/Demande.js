import React from 'react'
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
