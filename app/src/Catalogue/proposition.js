import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {View, StyleSheet, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let userId = 0;
class Proposition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propositions: [],
      idServeur: 0,
      idDemande: 0,
      idDemandeur: 0,
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

    fetch(`https://help-recover-api.herokuapp.com/propositionG/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({propositions: json});
      });
  }

  submit(idDem, idServ, idDemandeur, idProp) {
    const propos = {idServeur: idServ, idDemande: idDem, idDemandeur: idDemandeur};
    console.log(propos);

    fetch('https://help-recover-api.herokuapp.com/propositionE/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
      },
      body: JSON.stringify({
        idServeur: propos.idServeur,
        idDemande: propos.idDemande,
        idDemandeur: propos.idDemandeur,
      }),
    });

    fetch(`https://help-recover-api.herokuapp.com/proposS/${idProp}`, {
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
        {this.state.propositions.length === 0 && (
          <Text style={styles.mesde}>Vous n'avez aucune proposition en cours</Text>
        )}

        {this.state.propositions.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.PhotoProfil}} />
            <ListItem.Content>
              <ListItem.Title>
                {l.Prenom} {l.Nom}
              </ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <Button
                color="green"
                title="Accepter"
                onPress={() => {
                  this.submit(l.idDem, l.idServeur, l.idDemandeur, l.idProposition);
                }}
              />
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
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Proposition;
