import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

class Notation2 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        id : localStorage.getItem("id"),
        chain : [],
        chain2 : [],
        }
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
        
        console.log(this.state.id);
              let t = this;
              this.getToken().then(function(result) {
                t.setState({id : result});
                t.afficher();
            });
        }catch{
            this.props.navigation.navigate('login');
        }
                
             }
      afficher(){
        let test = [];
        let test2 =[];
        let compte = 0;
        let c = 0;
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
                  test2.push(<View style={styles.rect} key = {1}> <Text style={styles.loremIpsum}>aucun utilisateur {'\n'}ne vous a noté pour l'instant</Text> </View>);
                    this.setState({chain2: test2});
                    this.render();
                  }else{
                      for(let i = 0;i<json.resultat.length;i++){
                        compte = compte+json.resultat[i].rating;
                        c++;
                      }
                      compte = compte/c;
                    test2.push(<View style={styles.rect} key = {-1}> <Text style={styles.loremIpsum}>votre notation est de : {compte} sur 5</Text> </View>);
                      for(let i = 0 ; i < json.resultat.length; i++){
                        
                       //if(json.resultat[i].donneurId == this.state.donneurId  && json.resultat[i].idDemande == this.state.idDemande){
                         
                        
                        test.push( <View style={styles.rect2} key ={i}><Text style={styles.loremIpsum2}>commentaire de {json.resultat[i].Nom} : </Text><Text style={styles.tresBien}>{json.resultat[i].commentaire}</Text></View>);
                        this.setState({chain: test});
                        this.setState({chain2: test2});
                        this.render();
                       //}
                }
                }
              }
            })
      
      
      }


      render(){
        let test = this.state.chain;
        let titre = this.state.chain2;
  return (
    <View style={styles.container}>
      
      {titre.map((value, index) => {
         return value
        })}
      {test.map((value, index) => {
         return value
        })}
    </View>

  );}
}

const styles = StyleSheet.create({
  container: {
    width: 336,
    height: 312,
    
  },
  rect: {
    width: 450,
    height: 131,
    backgroundColor: "rgba(255,231,221,1)",
    alignItems: 'center',
  },
  loremIpsum: {
    flex: 1,
    fontFamily: "roboto-regular",
    color: "#121212",
    lineHeight: 14,
    fontSize: 19,
    marginTop: 59,
    marginLeft: 20
  },
  rect2: {
    
    width: 375,
    height: 129,
    backgroundColor: "rgba(175,176,181,1)",
    marginTop: 52,
    marginLeft: 41,
    marginRight: 41,
    alignItems: 'center',
  },
  loremIpsum2: {
    flex: 0.2,
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 18,
    textDecorationLine: "underline",
    marginLeft: 10
  },
  tresBien: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 14,
    marginTop: 47,
    marginLeft: 10
  }
});

export default Notation2;
