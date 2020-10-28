import React, { Component } from 'react';
import {Title} from 'react-native-paper';
import {View} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';


class ListeDem extends React.Component {
  state = { demande : [
    { Titre: 'Salim', Description: 'Lave-vaisselle' },
    { Titre: 'Bilel', Description: 'Courir' },
    { Titre: 'Adel', Description: 'Sortir' },
    { Titre: 'Souhaib', Description: 'Sourire' },
    { Titre: 'Florian', Description: 'Courses' },
  ]}
  render(){
    return(
      <View>
      {
        this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.Titre}</ListItem.Title>
              <ListItem.Subtitle>{l.Description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
    );
  };
};

export default ListeDem
