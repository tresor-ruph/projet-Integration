/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
import React from 'react';
import { StyleSheet, View, Text ,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'localstorage-polyfill';
let userId = 0;
class Notation2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        id: 0,
        chain: [],
        chain2: [],
        };
      } 
      async storeToken(m) {
        try {
           await AsyncStorage.setItem('id', JSON.stringify(m));
        } catch (error) {
          console.log('Something went wrong', error);
        }
      }
      async getToken() {
        try {
          const userData = await AsyncStorage.getItem('id');
          const data = JSON.parse(userData);
          return data;
        } catch (error) {
          console.log('Something went wrong', error);
        }
      }
      componentDidMount() {
        try {
              //const t = this;
              async function getUserId(){
              let idr = await AsyncStorage.getItem('id');
              id = JSON.parse(idr)
              userId =id ;
              }
              getUserId();
              //this.getToken().then((result) => {
                //this.setState({ id: idr });
                this.afficher();
            //});
          } catch (err) {
          console.log(err);
          }
             }
      afficher() {
        const test = [];
        const test2 = [];
        let compte = 0;
        let c = 0;
         fetch('https://help-recover-api.herokuapp.com/notation/', {
                method: 'POST',
                body: JSON.stringify({
                  Id: userId
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'true'
                }
              }).then(response => response.json())
              .then(json => {
                console.log(json);
                if (json.message === 'pas de demande a ce nom') {
                } else if (json.resultat[0] === undefined) {
                  test2.push(<View style={styles.rect} key={1}><Text style={styles.loremIpsum}> aucune notation pour l'instant </Text></View>);
                    this.setState({ chain2: test2 });
                    this.render();
                  } else {
                      for (let i = 0; i < json.resultat.length; i++) {
                        compte += json.resultat[i].rating;
                        c++;
                      }
                      compte /= c;
                      compte = compte.toFixed(2);
                      
                    test2.push(<View style={styles.rect} key={-1}><Text style={styles.loremIpsum}>votre notation est de : {compte} sur 5</Text></View>);
                      for (let i = 0; i < json.resultat.length; i++) {
                        test.push(<View style={styles.rect2} key={i}><Text style={styles.loremIpsum2}>commentaire de {json.resultat[i].Nom} : </Text><View><Text style={styles.tresBien}>{json.resultat[i].commentaire}</Text></View></View>);
                        this.setState({ chain: test });
                        this.setState({ chain2: test2 });
                        this.render();
                }
                }
            });
      }


      render() {
        const test = this.state.chain;
        const titre = this.state.chain2;
  return (
    <ScrollView style={styles.container}>
      {titre.map((value) => value)}
      {test.map((value) => value)}
    
    </ScrollView>

  ); 
}
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 312,
    
  },
  rect: {
    width: 370,
    height: 131,
    backgroundColor: 'rgba(255,231,221,1)',
    alignItems: 'center',
  },
  loremIpsum: {
    flex: 1,
    color: '#121212',
    //lineHeight: 14,
    fontSize: 19,
    marginTop: 59,
    marginLeft: 20
  },
  rect2: {
    
    width: 250,
    height: 129,
    backgroundColor: 'rgba(175,176,181,1)',
    marginTop: 52,
    marginLeft: 55,
    marginRight: 41,
    alignItems: 'center',
    marginBottom:10
  },
  loremIpsum2: {
    flex: 0.2,
    color: '#121212',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginLeft: 10,
    paddingBottom:0
  },
  tresBien: {
    color: '#121212',
    fontSize: 14,
    paddingTop: 0,
    marginLeft: 10,
    alignItems: 'center',
  }
});

export default Notation2;
