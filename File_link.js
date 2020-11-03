import React from "react"
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen'
import Chat  from './Messenger/Chat'
import MainChat  from './Messenger/Main_Chat'
import catalogueOffre from './Catalogue/catalogueOffre'
import Demande from './DemandeFormulaire/Demande'
import ListeDem from './Catalogue/ListeDem'
import Form from './SignIn/Form'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Homescreen/Home'
import Login from './Login/login'
import mesDemandes from './Catalogue/mesDemandes'


// Create the navigator
const Stack = createStackNavigator()
class Nav extends React.Component {
render() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "Home" component = {Home} />
                <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
                <Stack.Screen name = "MainChat" component = {MainChat} />
                <Stack.Screen name = "FaireDemande" component = {Demande} />
                <Stack.Screen name = "Chat" component = {Chat} />
                <Stack.Screen name = "ListeDem" component = {ListeDem} />
                <Stack.Screen name = "Form" component = {Form} />
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name = "mesDemandes" component = {mesDemandes} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

}

export default Nav
