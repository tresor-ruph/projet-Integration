import React from 'react'
import {StyleSheet, View, TextInput, CheckBox } from 'react-native'
import { Title, Paragraph } from 'react-native-paper';


class Demande extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Title style={{height:90}}> Formulaire de demande de service</Title>
        <Paragraph> Disponibilités </Paragraph>
        <TextInput multiline={true} numberOfLines={3} style={{marginBottom : 30, width : 300}} placeholder="Entrez vos heures de disponibilités de la journée"/>
        <Paragraph> Descriptif </Paragraph>
        <TextInput multiline={true} numberOfLines={5} style={{ width : 300}} placeholder="Entrez un descriptif du service"/>
      </View>
    );
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:20,
    justifyContent: "center",
  },
});



export default Demande
