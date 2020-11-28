import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground ,TextInput,TouchableOpacity, Button} from "react-native";
import { Rating, AirbnbRating , Overlay,Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'modal-react-native-web';
import pdp from '../assets/profil_defaut.png';
class Notation extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        id : 0,
        donneurId: props.route.params.donneurId,
        idDemande: props.route.params.idDemande,
        chain : [],
        commentaire: "",
        rate: 0,
        visible : false
        }
        this.ratingCompleted = this.ratingCompleted.bind(this);
      }
      //props.navigation.getParam('idDemande', 'NO-ID')
      async storeToken(m) {
        try {
           await AsyncStorage.setItem("id", JSON.stringify(m));
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      async getToken() {
        try {
          let userData = await AsyncStorage.getItem("id");
          let data = JSON.parse(userData);
          return data;
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }


     componentDidMount(){
       
try{

console.log(this.state.donneurId);

  /*
      let id = localStorage.getItem('id');
      this.setState({id : id});
      this.afficher();*/
      let t = this;
      this.getToken().then(function(result) {
        t.setState({id : result});
        t.afficher();
        //t.setState({chain: t.afficher()});
    });
}catch{
    this.props.navigation.navigate('login');
}
        
     }
    ratingCompleted (rating) {
            this.setState(state => { state.rate = rating});
            console.log(rating);
          
      }

onChangeText(text){
      this.setState(state => { state.commentaire = text});
     
  }
  

onPressButton(){
  let rate = this.state.rate;
  let donneurId = this.state.donneurId;
  let commentaire = this.state.commentaire;
  let idDemande = this.state.idDemande;
 
   
  fetch('http://localhost:3000/rating/', {
    method: 'POST',
    body: JSON.stringify({
      Id : this.state.id,
      donneurId : donneurId,
      idDemande : idDemande,
      rating: rate,
      commentaire: commentaire

    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin":"true"
    }
  }) .then(response => response.json())
  .then(json => {})
this.toggle();


}


toggle(){
  let vis = !this.state.visible;
  this.setState({visible : vis});
}

afficher(){
  let test = [];
   fetch('http://localhost:3000/notation/', {
          method: 'POST',
          body: JSON.stringify({
            Id : this.state.id
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"true"
          }
        }) .then(response => response.json())
        .then(json => {
          if(json.message == 'pas de demande a ce nom'){
          }else{
            if(json.resultat[0]==undefined){
              test.push(<View style={styles.group} key={1} ><View style={styles.rect2}><Text style={styles.ericCartman}>Vous n'avez pas de demande{"\n"} Veuillez effectuer une demande avant de pouvoir noter un utilisateur </Text></View></View>);
              this.setState({chain: test});
              this.render();
            }else{
                for(let i = 0 ; i < json.resultat.length; i++){
                  
                 if(json.resultat[i].donneurId == this.state.donneurId  && json.resultat[i].idDemande == this.state.idDemande){
                   
                  if(json.resultat[i].PhotoProfil == 'null'){
                    test.push(<View style={styles.group} key={i}> <View style={styles.rect2}><View style={styles.ericCartmanStack}><Text style={styles.ericCartman}>{json.resultat[i].Prenom}{"\n"}{json.resultat[i].Nom}</Text><Image source={pdp} resizeMode="contain" style={{width: 70, height: 70,marginTop: 10}}></Image></View><AirbnbRating count={5} reviews={[ "décevant", "moyen", "bon","top","Jesus"]} defaultRating={json.resultat[i].rating} size={20} onFinishRating={(rating)=>{this.ratingCompleted(rating);}} />   <TextInput style={styles.InputS} multiline placeholder={'Commentaire'} maxLength={255} onChangeText={text => this.onChangeText(text)} value={this.state.commentaire[i]} /> <TouchableOpacity style={styles.containerButton} onPress={() => this.onPressButton()}><Text style={styles.envoyer}>Envoyer</Text></TouchableOpacity></View> </View>);
                    
                  }else{
                  test.push(<View style={styles.group} key={i}> <View style={styles.rect2}><View style={styles.ericCartmanStack}><Text style={styles.ericCartman}>{json.resultat[i].Prenom}{"\n"}{json.resultat[i].Nom}</Text><Image source={{uri:json.resultat[i].PhotoProfil}} resizeMode="contain" style={{width: 70, height: 70, marginTop: 10}}></Image></View><AirbnbRating count={5} reviews={[ "décevant", "moyen", "bon","top","Jesus"]} defaultRating={json.resultat[i].rating} size={20} onFinishRating={(rating)=>{this.ratingCompleted(rating);}} />   <TextInput style={styles.InputS} multiline placeholder={'Commentaire'} maxLength={255} onChangeText={text => this.onChangeText(text)} value={this.state.commentaire[i]} /> <TouchableOpacity style={styles.containerButton} onPress={() => this.onPressButton()}><Text style={styles.envoyer}>Envoyer</Text></TouchableOpacity></View> </View>);
                  }
                  this.setState({chain: test});
                  this.render();
                 }
          }
          }
        }
      })


}
     
      render(){
        let test = this.state.chain;
          
      
   
  return (
    <View style={styles.container}>
      <View style={styles.rect5Filler}></View>
      <View style={styles.rect5}>
        <View style={styles.rect}>
          <Text style={styles.rateYour}>Notation des Utilisateurs</Text>
        </View>

        {test.map((value, index) => {
         return value
        })}

        
      </View>
      <Overlay ModalComponent={Modal} isVisible={this.state.visible} >
        <View>
      <Text>Votre notation a bien été envoyée</Text>
      <View style={{flexDirection: 'row', width:'100%'}}>
              <View style={{flex: 1}}>
                <Button color='black' title='ok' onPress={() => {this.toggle();this.props.navigation.navigate('HomeScreen')}}></Button>

              </View>
              
              </View>
              </View>
      </Overlay>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"rgba(237,210,133,1)"
  },
  rect5Filler: {
    flex: 1
  },
  rect5: {
    backgroundColor: "rgba(237,210,133,1)"
  },
  rect: {
    width: 400,
    height: 66,
    backgroundColor: "rgba(124,202,187,1)",
    marginTop: 20,
    marginLeft: 0
  },
  rateYour: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 25,
    marginLeft: 110,
    fontSize: 20
  },
  group: {
    width: 276,
    height: 168,
    marginTop: 50,
    marginLeft: 53,
    marginBottom: 200
  },
  rect2: {
    width: 276,
    height: 300,
    backgroundColor: "rgba(161,183,138,1)",
    borderRadius: 57,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0
  },
  ericCartman: {
    top: 33,
    left: 76,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    width : 160
  },
  image: {
    marginTop: 10,
    top: 0,
    left: 0,
    width: 70,
    height: 70,
    position: "absolute"
  },
  ericCartmanStack: {
    width: 93,
    height: 92,
    marginLeft: 15
  },

  commentaire: {
    fontSize: 16,
    lineHeight: 16,
    paddingTop: 16,
    paddingBottom: 8,
    color: "#000",
    opacity: 0.5,
    alignSelf: "flex-start",
    left: 16,
    width: 334,
    top: 0,
    height: 142
  },
 
  containerButton: {
    backgroundColor: "#212121",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    marginLeft: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 50,
    paddingRight: 16,
    width: 20
  },
  envoyer: {
    color: "#fff",
    fontSize: 14,
    marginRight: 30
  },
  InputS:{
    height: 60,width : 269, borderColor: 'white', borderWidth: 3 ,
    marginLeft: 3,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }
});

export default Notation;
