/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ListItem} from 'react-native-elements';
import {View, StyleSheet, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let userId = 0;
class listeAttente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attente: [],
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

    fetch('https://help-recover-api.herokuapp.com/users/attente')
      .then((response) => response.json())
      .then((json) => {
        this.setState({attente: json});
      });
  }

  accepter(Nome, Prenome, Adressee, CodeP, date, scanner, Maile, passworde, idUsere) {
    fetch('https://help-recover-api.herokuapp.com/users/confirmation', {
      method: 'POST',
      body: JSON.stringify({
        Nom: Nome,
        Prenom: Prenome,
        Adresse: Adressee,
        dateNaissance: date,
        Mail: Maile,
        CodePostal: CodeP,
        password: passworde,
        ScannerDoc: scanner,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
      },
    }).then((response) => response.json());

    fetch(`https://help-recover-api.herokuapp.com/suppFile/${idUsere}`, {
      method: 'delete',
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    this.componentDidMount();
    this.forceUpdate();
  }

  submit(idUsere) {
    fetch(`https://help-recover-api.herokuapp.com/suppFile/${idUsere}`, {
      method: 'delete',
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    this.componentDidMount();
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, marginRight: '1%'}}>
            <Button color="blue" title="Demandes" onPress={this.click_MesProp} />
          </View>
          <View style={{flex: 1, marginLeft: '1%'}}>
            <Button color="black" title="Utilisateurs" onPress={this.click_MesPropA} />
          </View>
        </View>
        <Text style={styles.mesde}>Liste d'attente</Text>

        {this.state.attente.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                {l.Nom} {l.Prenom}
              </ListItem.Title>
              <ListItem.Subtitle>{l.nombre}</ListItem.Subtitle>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 1}}>
                  <Button
                    color="green"
                    title="Accepter"
                    onPress={() => {
                      this.accepter(
                        l.Nom,
                        l.Prenom,
                        l.Adresse,
                        l.CodePostal,
                        l.dateNaissance,
                        l.ScannerDoc,
                        l.Mail,
                        l.password,
                        l.Id,
                      );
                    }}
                  />
                </View>
                <View style={{flex: 1, marginLeft: '4%'}}>
                  <Button
                    color="red"
                    title="Refuser"
                    onPress={() => {
                      this.submit(l.Id);
                    }}
                  />
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picks: {
    width: '50%',
  },
  mesde: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default listeAttente;
