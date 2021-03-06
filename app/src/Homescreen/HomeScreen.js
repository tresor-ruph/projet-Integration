/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
let userId = ' ';
function Homescreen(props) {
  async function getContact() {
    let id = await AsyncStorage.getItem('user');
    id = JSON.parse(id).Id;
    userId = id;
    fetch(`https://help-recover-api.herokuapp.com/users/${userId}`)
      .then((reponse) => reponse.json())
      .then((json) => {
        if (json[0].password === '85550') {
          props.navigation.navigate('Connexion');
        }
      });
  }
  useEffect(() => {
    getContact();
  });
  const handlePress = () => {
    props.navigation.navigate('Discussion_Repo', {screen: 'disc'});
  };
  const handleProfil = () => {
    props.navigation.navigate('Profil');
  };

  const handleDemande = () => {
    props.navigation.navigate('Demande');
  };

  const handleListeDem = () => {
    props.navigation.navigate('ListeDem');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity  onPress={handleAdmin}>
          <Text style={styles.joffreMonService1}>
            Administration
          </Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleListeDem}>
          <Text style={styles.joffreMonService1}>J&#39;offre mon{'\n'}service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleDemande}>
          <Text style={styles.demandeDaide}>Demande {'\n'}d&#39;aide</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button3Row}>
        <TouchableOpacity style={styles.button3} onPress={handleProfil}>
          <Text style={styles.profile}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} style={styles.button4}>
          <Text style={styles.discussion}>Discussion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(227,144,153,1)',
    borderRadius: 22,
  },
  joffreMonService1: {
    color: '#121212',
    lineHeight: 18,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 77,
    marginLeft: 40,
  },
  button2: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(118,171,227,1)',
    borderRadius: 22,
    marginLeft: 23,
    marginTop: 2,
  },
  demandeDaide: {
    color: '#121212',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 75,
    marginLeft: 41,
  },
  buttonRow: {
    height: 196,
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: 9,
    marginRight: 4,
  },
  button3: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(189,244,123,1)',
    borderRadius: 22,
  },
  profile: {
    color: '#121212',
    fontSize: 18,
    marginTop: 73,
    marginLeft: 58,
  },
  button4: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(183,154,209,1)',
    borderRadius: 22,
    marginLeft: 23,
  },
  discussion: {
    color: '#121212',
    fontSize: 21,
    textAlign: 'center',
    marginTop: 73,
    marginLeft: 30,
  },
  button3Row: {
    height: 194,
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: 9,
    marginRight: 4,
  },
  icon: {
    top: 0,
    left: 38,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
  },
  icon3: {
    top: 36,
    left: 33,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
  },
  icon4: {
    top: 42,
    left: 0,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
  },
  iconStack: {
    width: 78,
    height: 85,
    marginTop: -576,
    marginLeft: -105,
  },
  icon2: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    marginTop: -143,
    marginLeft: 344,
  },
});

export default Homescreen;
