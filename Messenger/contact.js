import React from 'react';

//import all the components we are going to use
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Since we cannot access navigation props directly when called in a child component ,we will use navigation hooks


function Contact(props){
    const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
          //borderRadius style will help us make the Round Shape Image
          
          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2
          }}
        />
        <TouchableOpacity style ={styles.mess} onPress={() => navigation.navigate("Chat")}>
        <Text>Last message heredfsdfsdfsdfsd</Text>
        </TouchableOpacity>
        <View/>
      </View>
      <View style = {styles.viewStyleForLine}></View>        

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width : '100%',
    flexDirection : "row",
    marginTop : 20,
   
  },
  mess : {
      width : '100%',
      marginLeft:'10%',
      marginTop : '10%',
        
  },
  viewStyleForLine: {
      marginTop : 8,
    borderBottomColor: "rgba(177,175,184,0.3)", 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    alignSelf:'stretch',
    width: "100%"
  },
  textHeadingStyle: {
    marginTop: 30,
    fontSize: 40,
    color: '#0250a3',
    fontWeight: 'bold',
  },
});

export default Contact;