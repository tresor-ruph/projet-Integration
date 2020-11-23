import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet,TextInput,Text,TouchableOpacity, Button} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

let userId = 0
class PropositionAssignee extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
      propositions : [],
      idServeur: 0,
      idDemande: 0,
      idDemandeur: 0
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

    fetch(`http://localhost:3000/propositionA/${userId}`)
    .then(response => response.json())
    .then(json => {
      this.setState({propositions: json})
    })
    
    
  } 

  submit(idDem){
    alert('Etes vous sur ?')
    fetch(`http://localhost:3000/demandeS/${idDem}`, {  
      method: 'delete',
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    this.componentDidMount()
    this.forceUpdate()
  }

  submit2(idDem){
    alert('Etes vous sur ?')
    fetch(`http://localhost:3000/proposSA/${idDem}`, {  
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
        <Text style={styles.mesde}>Vos demandes assignées</Text>
          
      {
        this.state.propositions.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.PhotoProfil}} />
            <ListItem.Content>
              <ListItem.Title>{l.Prenom} {l.Nom}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <View style={{flexDirection: 'row', width:'100%'}}>
              <View style={{flex: 1}}>
                <Button color='blue' title='Cloturer' onPress={() => {this.submit(l.idDemande)}}></Button>
              </View>
              <View style={{flex: 1, marginLeft: '4%'}}>
                <Button color='red' title='Annuler' onPress={() => {this.submit2(l.idPropositionConfirme)}}></Button>
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

export default PropositionAssignee;
