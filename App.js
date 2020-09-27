import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Text style={styles.text}>Demande de Service</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.text}>Offre de Service</Text>

    </View>
    <View style={styles.box3}>
      <Text style={styles.text}>Espace personnel</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    position: 'absolute',
    top: 250,
    left: 40,
    width: 150,
    height: 150,
    backgroundColor: 'rgba(242,100,107,1)',
    borderRadius : 20,
  },
  box2: {
    ...StyleSheet.absoluteFill,
    width: 150,
    height: 150,
    top: 250,
    left: 200,
    backgroundColor: 'rgba(94,94,205,1)',

    borderRadius : 20,
  },
  box3: {
    position: 'absolute',
    top: 420,
    left: 40,
    width: 310,
    height: 150,
    backgroundColor: 'rgba(0,128,0,0.5)',

    borderRadius : 20,
  },
  text: {
    color: '#FFF',
    fontSize: 25,
    
    textAlign: "center",
    marginTop: 40,
  }
});

export default App;