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


  

  render(){
    return(
      <View>
        <Text style={styles.mesde}>Offre de services :</Text>
          
      {
        this.state.propositions.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.PhotoProfil}} />
            <ListItem.Content>
              <ListItem.Title>{l.Prenom} {l.Nom}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <Button color='green' title='Cloturer' onPress={() => {console.log('Yes')}}></Button>
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

export default PropositionAssignee;
