import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';



class HomeScreen extends React.Component {

  click_esp_pers = () => {this.props.navigation.navigate('MainChat') }
  click_cat_O = () => {this.props.navigation.navigate('catalogueOffre') }
  render(){
    return(
  <View style={styles.container}>
    <TouchableOpacity style={styles.box1}>
      <Text style={styles.text}>Demande de Service</Text>
    </TouchableOpacity>
  
      <TouchableOpacity style={styles.box2} onPress = {this.click_cat_O}>
        <Text style={styles.text}>Offre de Service</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box3} onPress = {this.click_esp_pers} >
        <Text style={styles.text}>Espace personnel</Text>
      </TouchableOpacity>
    
  </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
      width : "100%",
      height : "100%",
    backgroundColor: 'rgba(106,106,255,0.6)',
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

export default HomeScreen;