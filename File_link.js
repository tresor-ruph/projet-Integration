import React from "react"
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen'
import Chat  from './Messenger/Chat'
import MainChat  from './Messenger/Main_Chat'
import catalogueOffre from './Catalogue/catalogueOffre'
import Demande from './DemandeFormulaire/Demande'
import ListeDem from './Catalogue/ListeDem'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



// Create the navigator
const Stack = createStackNavigator()
class Nav extends React.Component {
render() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen name = "MainChat" component = {MainChat} />
            <Stack.Screen name = "FaireDemande" component = {Demande} />
            <Stack.Screen name = "Chat" component = {Chat} />
            <Stack.Screen name = "ListeDem" component = {ListeDem} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

}

export default Nav
