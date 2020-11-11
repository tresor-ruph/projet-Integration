import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { View, StyleSheet,TextInput,Text,TouchableOpacity, Button} from 'react-native';



class ListeDem extends React.Component {
    
  constructor(props){
    super(props);
    this.state = { 
      demande : [],
      userId: '2'
    };
  }  
  
  componentDidMount(){
    fetch(`http://localhost:3000/demandeU/${this.state.userId}`)
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
  }
  

  render(){
    return(
      <View>
          <Text style={styles.mesde}>Mes Demandes en cours :</Text>
      {
        this.state.demande.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{l.userName}</ListItem.Title>
              <ListItem.Subtitle>{l.categorie}</ListItem.Subtitle>
              <Button title='Supprimer' onPress={() => {this.submit(l.idDemande)}}></Button>
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
