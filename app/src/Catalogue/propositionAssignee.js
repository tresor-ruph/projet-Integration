/* eslint-disable prettier/prettier */
import React from 'react';
import {ListItem, Avatar, Overlay} from 'react-native-elements';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

let userId = 0;
class PropositionAssignee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propositions: [],
      idServeur: 0,
      idDemande: 0,
      idDemandeur: 0,
      visible: false,
      idD: 0,
      idDo: 0,
      id: 0,
    };
  }

  componentDidMount() {
    async function getUserId() {
      let id = await AsyncStorage.getItem('user');
      id = JSON.parse(id).Id;
      console.log(id);
      userId = id;
    }
    getUserId();

    fetch(`https://help-recover-api.herokuapp.com/propositionA/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({propositions: json});
        console.log(this.state.propositions);
      });
  }

  submit(idDem, donneurId, userId) {
    alert('Etes vous sur ?');
    this.setState({idD: idDem});
    this.setState({idDo: donneurId});
    this.setState({id: userId});
    fetch(`https://help-recover-api.herokuapp.com/demandeS/${idDem}`, {
      method: 'delete',
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    let vis = !this.state.visible;
    this.setState({visible: vis});
  }

  submit2(idDem) {
    alert('Etes vous sur ?');
    fetch(`https://help-recover-api.herokuapp.com/proposSA/${idDem}`, {
      method: 'delete',
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    this.componentDidMount();
    this.forceUpdate();
  }

  visible(notation) {
    if (notation) {
      let vis = !this.state.visible;
      this.setState({visible: vis});
      fetch('https://help-recover-api.herokuapp.com/ajoutNotation/', {
        method: 'POST',
        body: JSON.stringify({
          Id: this.state.id,
          donneurId: this.state.idDo,
          idDemande: this.state.idD,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
        },
      })
        .then((response) => response.json())
        .then((json) => {});

      this.props.navigation.navigate('Notation', {idDemande: this.state.idD, donneurId: this.state.idDo});
    } else {
      let vis = !this.state.visible;
      this.setState({visible: vis});
      this.componentDidMount();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.8, y: 0.8}}
        locations={[0, 0.9]}
        colors={['#0077b6', '#ffffff']}
        style={styles.linearGradient}>
      
        <Text style={styles.mesde}>Vos demandes assignées</Text>
        {this.state.propositions.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.PhotoProfil}} size="large" rounded />
            <ListItem.Content>
              <ListItem.Title>
                {l.Prenom} {l.Nom}
              </ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 1}}>
                  <Button
                    color="blue"
                    title="Cloturer"
                    onPress={() => {
                      this.submit(l.idDemande, l.idServeur, l.userId);
                    }}></Button>
                </View>
                <View style={{flex: 1, marginLeft: '4%'}}>
                  <Button
                    color="red"
                    title="Annuler"
                    onPress={() => {
                      this.submit2(l.idPropositionConfirme);
                    }}></Button>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
        <Overlay isVisible={this.state.visible}>
          <View>
            <Text>Voulez-vous noter cet utilisateur?</Text>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={{flex: 1}}>
                <Button
                  color="blue"
                  title="oui"
                  onPress={() => {
                    this.visible(true);
                  }}></Button>
              </View>
              <View style={{flex: 1, marginLeft: '4%'}}>
                <Button
                  color="red"
                  title="non"
                  onPress={() => {
                    this.visible(false);
                  }}></Button>
              </View>
            </View>
          </View>
        </Overlay>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  picks: {
    width: '50%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  mesde: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PropositionAssignee;
