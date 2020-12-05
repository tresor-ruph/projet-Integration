/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Overlay } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';



function Mainscreen(props) {
  const handlePress = () => {
    props.navigation.navigate('Discussion_Repo');
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
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleListeDem}>
          <Text style={styles.joffreMonService1}>
            J&#39;offre mon{'\n'}service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleDemande}>
          <Text style={styles.demandeDaide}>Demande {'\n'}d&#39;aide</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button3Row}>
        <TouchableOpacity style={styles.button3} onPress={handleProfil}>
          <Text style={styles.profile}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.button4}
        >
          <Text style={styles.discussion}>Discussion</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconStack}>
        <MaterialCommunityIconsIcon
          name='home'
          style={styles.icon}
        />
        <MaterialCommunityIconsIcon
          name="home"
          style={styles.icon3}
        />
        <MaterialCommunityIconsIcon
          name="account-circle"
          style={styles.icon4}
        />
      </View>
      <MaterialCommunityIconsIcon
        name="home"
        style={styles.icon2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(227,144,153,1)',
    borderRadius: 22
  },
  joffreMonService1: {
    fontFamily: 'roboto-300',
    color: '#121212',
    lineHeight: 18,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 77,
    marginLeft: 40
  },
  button2: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(118,171,227,1)',
    borderRadius: 22,
    marginLeft: 23,
    marginTop: 2
  },
  demandeDaide: {
    fontFamily: 'roboto-300',
    color: '#121212',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 75,
    marginLeft: 41
  },
  buttonRow: {
    height: 196,
    flexDirection: 'row',
    marginTop: 157,
    marginLeft: 9,
    marginRight: 4
  },
  button3: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(189,244,123,1)',
    borderRadius: 22
  },
  profile: {
    fontFamily: 'arial-regular',
    color: '#121212',
    fontSize: 18,
    marginTop: 73,
    marginLeft: 58
  },
  button4: {
    width: '46%',
    height: 194,
    backgroundColor: 'rgba(183,154,209,1)',
    borderRadius: 22,
    marginLeft: 23
  },
  discussion: {
    fontFamily: 'roboto-300',
    color: '#121212',
    fontSize: 21,
    textAlign: 'center',
    marginTop: 73,
    marginLeft: 30
  },
  button3Row: {
    height: 194,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 9,
    marginRight: 4
  },
  icon: {
    top: 0,
    left: 38,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40
  },
  icon3: {
    top: 36,
    left: 33,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40
  },
  icon4: {
    top: 42,
    left: 0,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 40
  },
  iconStack: {
    width: 78,
    height: 85,
    marginTop: -576,
    marginLeft: -105
  },
  icon2: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    marginTop: -143,
    marginLeft: 344
  }
});

export default Mainscreen;
