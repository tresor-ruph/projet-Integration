/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {View, StyleSheet, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let userId = 0;
class ListeDem extends React.Component {
  click_MesProp = () => {
    this.props.navigation.navigate('Proposition');
  };
  click_MesPropA = () => {
    this.props.navigation.navigate('PropositionA');
  };
  constructor(props) {
    super(props);
    this.state = {
      demande: [],
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

    fetch(`https://help-recover-api.herokuapp.com/demandeU/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({demande: json});
      });
  }

  submit(idDem) {
    fetch(`https://help-recover-api.herokuapp.com/demandeS/${idDem}`, {
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
            <Button color="green" title="Mes Propositions d'aide" onPress={this.click_MesProp}></Button>
          </View>
          <View style={{flex: 1, marginLeft: '1%'}}>
            <Button color="black" title=" Mes Demandes assignées" onPress={this.click_MesPropA}></Button>
          </View>
        </View>
        {this.state.demande.length === 0 && <Text style={styles.mesde}> Vous n'avez aucune demande en cours</Text>}

        {this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.PhotoProfil}} />
            <ListItem.Content>
              <ListItem.Title>{l.userName}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <Button
                color="red"
                title="Supprimer"
                onPress={() => {
                  this.submit(l.idDemande);
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ListeDem;
