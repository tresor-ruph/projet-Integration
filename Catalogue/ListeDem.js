import React, { Component } from 'react';
import {Title} from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet,TextInput,Text,TouchableOpacity} from 'react-native';



class ListeDem extends React.Component {

  constructor(props){
    super(props);
    this.state = { demande : []};
  }  
  
  componentDidMount(){
    fetch('http://localhost:3000/contacts/')
    .then(response => response.json())
    .then(json => {
      this.setState({demande: json})
      console.log(json)
      console.log(this.state.demande)
  })
  }

  render(){
    return(
      <View>
      {
        this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.Nom}</ListItem.Title>
              <ListItem.Subtitle>{l.Prenom}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
    );
  };
};

export default ListeDem;
