/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable consistent-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet, Button, View, TextInput, TouchableOpacity, Text, Alert, Picker} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let userId = 0;
class Demande extends React.Component {
  updateCategorie = (categorie) => {
    this.setState({categorie: categorie});
  };

  constructor(props) {
    super(props);
    this.state = {
      categorie: 'Courses',
      descriptif: '',
    };
  }

  componentDidMount() {
    async function getUserId() {
      let id = await AsyncStorage.getItem('user');
      id = JSON.parse(id).Id;
      console.log(id);
      console.log(userId);
      userId = id;
    }
    getUserId();
  }

  submit() {
    //console.log(this.state)
    const newDemande = {categorie: this.state.categorie, descriptif: this.state.descriptif, userId: userId};
    console.log(newDemande);

    fetch('https://help-recover-api.herokuapp.com/demandeE/', {
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
      }),
    });
    alert('Demande envoyée.');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.para}> Selectionez le type de service :</Text>
        </View>
        <View style={styles.picker1}>
          <Picker style={styles.picker2} selectedValue={this.state.categorie} onValueChange={this.updateCategorie}>
            <Picker.Item label="Aller faire des courses" value="Courses" />
            <Picker.Item label="Aller chercher un colis" value="Colis" />
            <Picker.Item label="Récupérer/Emmener une personne" value="Récupérer une personne" />
            <Picker.Item label="Aller faire des lessives" value="Lessive" />
            <Picker.Item label="Autres" value="Autres" />
          </Picker>
        </View>
        <TextInput
          mode="outlined"
          multiline={true}
          onChangeText={(text) => {
            this.setState({descriptif: text});
          }}
          style={styles.desc}
          placeholder="Entrez un descriptif du service"
        />
        {/* <Button title="Envoyer votre demande" color="green" onPress={() => this.submit()} /> */}
        <View style={{marginTop: 40}}>
          <Button title="Envoyez votre demande" onPress={() => this.submit()} color="green" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  para: {
    fontSize: 15,
    marginTop: 50,
    fontWeight: 'bold',
    color: 'green',
  },

  picker2: {
    borderColor: 'black',
  },
  picker1: {
    borderRadius: 10,
    backgroundColor: 'grey',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  desc: {
    marginTop: '10%',
    width: '100%',
    height: '20%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

export default Demande;
