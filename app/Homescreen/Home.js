/* eslint-disable max-len */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

//<ImageBackground source={require('../img/degrade4.jpg')}>

class Home extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  render() {
    return (
        <View style={styles.container}>
        <View style={styles.rect}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.button}
            >
            <Text style={styles.connectezVous}>Connectez-vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('signup')}
            style={styles.button2}
            >
            <Text style={styles.inscrivezVous}>Inscrivez vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            style={styles.button3}
            >
            <Text style={styles.inscrivezVous}>Page Home</Text>
            </TouchableOpacity>
            
        </View>
        </View>
  );
    }
}
//sqetqstrt
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    flex: 1,
    backgroundColor: 'rgba(231,225,225,1)',
    marginTop: 0
  },
  button: {
    width: 241,
    height: 71,
    backgroundColor: 'rgba(222,72,72,1)',
    borderRadius: 20,
    marginTop: '30%',
    marginLeft: 59
  },
  connectezVous: {
    color: '#121212',
    fontSize: 23,

    marginLeft: 40
  },
  button2: {
    width: 241,
    height: 72,
    backgroundColor: 'rgba(6,194,23,1)',
    borderRadius: 20,
    marginTop: 28,
    marginLeft: 59
  },
  button3: {
    width: 241,
    height: 72,
    backgroundColor: 'rgba(6,194,23,1)',
    borderRadius: 20,
    marginTop: 28,
    marginLeft: 59
  },
  inscrivezVous: {
    color: '#121212',
    fontSize: 23,
    marginTop: 18,
    marginLeft: 48
  }
});

export default Home;
