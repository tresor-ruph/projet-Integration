import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet,TextInput,Text,TouchableOpacity, Button} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

let userId = 0
class ListeDem extends React.Component {
  click_MesProp =() => { this.props.navigation.navigate('Proposition'); }
  click_MesPropA =() => { this.props.navigation.navigate('PropositionA'); }
  constructor(props){
    super(props);
    this.state = { 
      demande : [],
    };
  }  
  
  componentDidMount(){
    async function getUserId(){
      let id = await AsyncStorage.getItem('user')
      id = JSON.parse(id).Id
      console.log(id)
      console.log(userId)
      userId = id
     }
     getUserId()

    fetch(`http://localhost:3000/demandeU/${userId}`)
    .then(response => response.json())
    .then(json => {
      this.setState({demande: json})
    })

    
  } 

  submit(idDem){
    fetch(`http://localhost:3000/demandeS/${idDem}`, {  
      method: 'delete',
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    this.componentDidMount()
    this.forceUpdate()
  }
  

  render(){
    return(
      <View>
        <Button color='green' title='Propositions de services' onPress={this.click_MesProp}></Button>
        <Button color='purple' title='Demandes assignées' onPress={this.click_MesPropA}></Button>
        <Text style={styles.mesde}>Mes Demandes en cours :</Text>
          
      {
        this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.PhotoProfil}} />
            <ListItem.Content>
              <ListItem.Title>{l.userName}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <Button color='red' title='Supprimer' onPress={() => {this.submit(l.idDemande)}}></Button>
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
    width: '50%'
  }

})

export default ListeDem;
