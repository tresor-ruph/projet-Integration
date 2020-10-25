import React, { Component } from 'react';
import {Title} from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet,TextInput,Text,TouchableOpacity, Picker} from 'react-native';



class ListeDem extends React.Component {
  click_MesDem =() => {this.props.navigation.navigate('mesDemandes')}
  constructor(props){
    super(props);
    this.state = { 
      demande : [],
      filtre: 'all'
    };
  }  
  
  componentDidMount(){
    console.log(this.state.filtre)
    if(this.state.filtre == 'all'){
    fetch('http://localhost:3000/demande/all')
    .then(response => response.json())
    .then(json => {
      this.setState({demande: json})
    })
    }
    else{
      fetch(`http://localhost:3000/demande/'${this.state.filtre}'`)
    .then(response => response.json())
    .then(json => {
      this.setState({demande: json})
      console.log(json)
      console.log(this.state.demande)
    })
    }
  } 
  
  updateFiltre = (filtre) => {
    this.setState({ filtre: filtre })
    console.log(this.state.filtre)
 }


  render(){
    return(
      <View>
        <Text style={styles.mesde} onPress={this.click_MesDem}>MES DEMANDES</Text>
        <Picker style={styles.picks} selectedValue = {this.state.filtre}  onValueChange = {this.updateFiltre}>
              <Picker.Item label="Aller faire des courses" value="courses" />
              <Picker.Item label="Aller chercher un colis" value="colis" />
              <Picker.Item label="Aller chercher les enfants" value="Enfants" />
              <Picker.Item label="Aller faire des lessives" value="Lessive" />
              <Picker.Item label="Autres" value="Autres" />
        </Picker>
      {
        this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.userName}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
    );
  };
};

const styles = StyleSheet.create({
  picks:{
    width: '50%',
    marginTop: '3%'
  },

  mesde:{
    fontSize: 15,
    left: 25,
    width: 130,
    height: 20,
    backgroundColor: 'rgba(128,255,255,1)',
    borderRadius : 20,
  }

})

export default ListeDem;
