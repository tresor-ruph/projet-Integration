import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {View, StyleSheet, Text} from 'react-native';

class descriptifDemande extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demande: [],
    };
  }

  componentDidMount() {
    fetch(`https://help-recover-api.herokuapp.com/demandeD/${this.state.userId}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({demande: json});
      });
  }

  render() {
    return (
      <View>
        <Text style={styles.mesde}>Mes Demandes en cours :</Text>
        {this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.userName}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
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
});

export default descriptifDemande;
