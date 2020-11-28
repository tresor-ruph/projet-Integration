import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground ,TextInput,TouchableOpacity} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { Rating, AirbnbRating } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class Notation extends React.Component {
    constructor() {
        super();
        this.state={
        id : 0,
        donneurId: [],
        chain : [],
        commentaire: [],
        rate: []
        }
        this.ratingCompleted = this.ratingCompleted.bind(this);
      }
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
    ratingCompleted (rating,donneur) {
        for(let i = 0;i<this.state.donneurId.length;i++){
          if(this.state.donneurId[i]==donneur){
            this.setState(state => { state.rate[i] = rating});
            console.log(rating);
          }
        }
      }

onChangeText(text,donneur){
  for(let i = 0;i<this.state.donneurId.length;i++){
    if(this.state.donneurId[i]==donneur){
      this.setState(state => { state.commentaire[i] = text});
      console.log(text);
    }
  }
  
}
onPressButton(donneur){
  let rate = 0;
  let donneurId = 0;
  let commentaire = "";
  for(let i = 0;i<this.state.donneurId.length;i++){
    if(this.state.donneurId[i]==donneur){
      donneurId= this.state.donneurId[i];
      rate = this.state.rate[i];
      commentaire = this.state.commentaire[i];
    }
  }
  fetch('http://localhost:3000/rating/', {
    method: 'POST',
    body: JSON.stringify({
      Id : this.state.id,
      donneurId : donneurId,
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
                  
                 
                  //this.setState(state => { state.commentaire.push(json.resultat[i].commentaire)});

                  test.push(<View style={styles.group} key={i}> <View style={styles.rect2}><View style={styles.ericCartmanStack}><Text style={styles.ericCartman}>{json.resultat[i].Prenom}{"\n"}{json.resultat[i].Nom}</Text><Image source={{uri:json.resultat[i].PhotoProfil}} resizeMode="contain" style={styles.image}></Image></View><AirbnbRating count={5} reviews={[ "décevant", "moyen", "bon","top","Jesus"]} defaultRating={json.resultat[i].rating} size={20} onFinishRating={(rating)=>{this.ratingCompleted(rating,json.resultat[i].donneurId);}} />   <TextInput style={styles.InputS} multiline maxLength={255} onChangeText={text => this.onChangeText(text,json.resultat[i].donneurId)} value={this.state.commentaire[i]} /> <TouchableOpacity style={styles.containerButton} onPress={() => this.onPressButton(json.resultat[i].donneurId)}><Text style={styles.envoyer}>Envoyer</Text></TouchableOpacity></View> </View>);
                  this.setState(state => { state.rate.push(json.resultat[i].rating)});
                  this.setState(state => { state.donneurId.push(json.resultat[i].donneurId)})                  
                  this.setState(state => { state.commentaire.push(json.resultat[i].commentaire)});
                  this.setState({chain: test});
                  this.render();
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
  icon: {
    fontSize: 40,
    color: "rgba(255,26,26,1)",
    height: 0,
    width: 0,
    marginLeft: 41
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 81
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 125
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 165
  },
  icon4: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 205
  },
  image1: {
    top: 17,
    left: 8,
    width: 93,
    height: 92,
    position: "absolute"
  },
  image1_imageStyle: {},
  icon8: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginTop: 92,
    marginLeft: 66
  },
  icon9: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 26
  },
  ericCartman1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -59,
    marginLeft: 76
  },
  rect3: {
    top: 0,
    left: 0,
    width: 276,
    height: 168,
    position: "absolute",
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
  image3: {
    width: 93,
    height: 92,
    marginTop: 7,
    marginLeft: 15
  },
  image3_imageStyle: {},
  icon18: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginTop: 92,
    marginLeft: 66
  },
  icon19: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 26
  },
  ericCartman3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -59,
    marginLeft: 75
  },
  icon15: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 204
  },
  icon16: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 164
  },
  icon17: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 124
  },
  image1Stack: {
    top: 0,
    left: 0,
    width: 276,
    height: 168,
    position: "absolute"
  },
  icon5: {
    top: 109,
    left: 198,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0
  },
  icon6: {
    top: 109,
    left: 158,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0
  },
  icon7: {
    top: 109,
    left: 118,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0
  },
  image1StackStack: {
    width: 276,
    height: 168,
    marginTop: 27,
    marginLeft: 60
  },
  image2: {
    top: 17,
    left: 8,
    width: 93,
    height: 92,
    position: "absolute"
  },
  image2_imageStyle: {},
  icon13: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginTop: 92,
    marginLeft: 66
  },
  icon14: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 26
  },
  ericCartman2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -59,
    marginLeft: 76
  },
  rect4: {
    top: 0,
    left: 0,
    width: 276,
    height: 168,
    position: "absolute",
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
  image4: {
    width: 93,
    height: 92,
    marginTop: 16,
    marginLeft: 15
  },
  image4_imageStyle: {},
  icon23: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginTop: 92,
    marginLeft: 66
  },
  icon24: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 26
  },
  ericCartman4: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: -59,
    marginLeft: 75
  },
  icon20: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 204
  },
  icon21: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 164
  },
  icon22: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0,
    marginLeft: 124
  },
  image2Stack: {
    top: 0,
    left: 0,
    width: 276,
    height: 168,
    position: "absolute"
  },
  icon10: {
    top: 109,
    left: 198,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0
  },
  icon11: {
    top: 109,
    left: 158,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0
  },
  icon12: {
    top: 109,
    left: 118,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 0,
    width: 0
  },
  image2StackStack: {
    width: 276,
    height: 168,
    marginTop: 39,
    marginLeft: 60
  },
  materialFixedLabelTextbox: {
    height: 107,
    width: 171,
    borderWidth: 1,
    borderColor: "rgba(159,112,112,1)",
    borderRadius: 26,
    marginTop: 273,
    marginLeft: 102
  },
  materialButtonDark: {
    height: 36,
    width: 100,
    marginTop: 15,
    marginLeft: 200
  },
  containerText: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "white",
    flexDirection: "row",
    height: 107,
    width: 171,
    borderWidth: 1,
    borderColor: "rgba(159,112,112,1)",
    borderRadius: 26,
    marginTop: 1,
    marginLeft: 50
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
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 30
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
