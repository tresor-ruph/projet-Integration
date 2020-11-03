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


            <Stack.Screen name = "signup" component = {Form} />
            <Stack.Screen name = "succes" component = {Succes} />


            {/*<Stack.Screen name = "login" component = {Login} />*/}


            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen name = "Profil" component = {Profil} />


            <Stack.Screen name = "Chat" component = {Chat} />
          
            <Stack.Screen name = "Succes" component = {Succes} />



            <Stack.Screen name = "Discussion_Repo" component = {Discussion_Repo} />
            <Stack.Screen name = "addContact" component = {addContact} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

}

export default Nav
