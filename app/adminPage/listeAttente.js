import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet,TextInput,Text,TouchableOpacity, Button} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

let userId = 0
class listeAttente extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      attente : [],
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

    fetch(`http://localhost:3000/users/attente`)
    .then(response => response.json())
    .then(json => {
      this.setState({attente: json})
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
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, marginRight: '1%'}}>
            <Button color='blue' title="Demandes" onPress={this.click_MesProp}></Button>
          </View>
          <View style={{flex: 1, marginLeft: '1%'}}>
            <Button color='black' title='Utilisateurs' onPress={this.click_MesPropA}></Button>
          </View>
        </View>
        <Text style={styles.mesde}>Liste d'attente</Text>
          
      {
        this.state.attente.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{l.Nom} {l.Prenom}</ListItem.Title>
              <ListItem.Subtitle>{l.ScannerDoc}</ListItem.Subtitle>
              <View style={{flexDirection: 'row', width:'100%'}}>
              <View style={{flex: 1}}>
                <Button color='green' title='Accepter'></Button>

              </View>
              <View style={{flex: 1, marginLeft: '4%'}}>
                <Button color='red' title='Refuser'></Button>
              </View>
              </View>
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
  },
  mesde:{
    fontSize: '140%',
    fontWeight: 'bold'
  }

})

export default listeAttente;