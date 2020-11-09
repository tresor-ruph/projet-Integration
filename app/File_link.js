import React from "react"
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen'
import Chat  from './Messenger/Chat'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Discussion_Repo from './Messenger/Discussionscreen'
import addContact from './Messenger/addContact'
import Login from './Messenger/components/login'
import Profil from './Profil/Profil'
//import Form from './SignIn/Form'
import Succes from './SignIn/Success'
import Form from './SignIn/Form'
import Home from './Homescreen/Home'
import ConfGroup from './Messenger/confGroup'
import GroupChat from './Messenger/groupChat'
import { Button,StyleSheet,TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {  Menu, Divider, Provider } from 'react-native-paper';



//import Login from './Login/login'

// Create the navigator
const Stack = createStackNavigator();
class Nav extends React.Component {
render() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = "Home" component = {Home} />
            <Stack.Screen name = "Login" component = {Login} />

            <Stack.Screen name = "GroupChat" component = {GroupChat} />
           <Stack.Screen name = "ConfGroup" component = {ConfGroup} />



            <Stack.Screen name = "signup" component = {Form} />
            <Stack.Screen name = "succes" component = {Succes} />


            {/*<Stack.Screen name = "login" component = {Login} />*/}


            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen name = "Profil" component = {Profil} />


            <Stack.Screen name = "Chat" component = {Chat} options={{
          
          headerRight: () => (
            <TouchableOpacity style={styles.container } onPress = {() => {
              return(
                
              )
            }}>
        <Icon name="menu" style={styles.caption}></Icon>
    </TouchableOpacity>
          ),
        }}/>
          
            <Stack.Screen name = "Succes" component = {Succes}  />



            <Stack.Screen name = "Discussion_Repo" component = {Discussion_Repo} />
            <Stack.Screen name = "addContact" component = {addContact} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2
  },
  caption: {
    color: "#fff",
    fontSize: 24
  }
});

export default Nav
