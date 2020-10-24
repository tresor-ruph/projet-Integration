import React from "react"
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen'
import Chat  from './Messenger/Chat'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Discussion_Repo from './Messenger/Discussionscreen'
import addContact from './Messenger/addContact'
import Login from './Messenger/components/login'



// Create the navigator
const Stack = createStackNavigator()
class Nav extends React.Component {
render() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = "login" component = {Login} />

            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen name = "Chat" component = {Chat} />
            <Stack.Screen name = "Discussion_Repo" component = {Discussion_Repo} />
            <Stack.Screen name = "addContact" component = {addContact} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

}

export default Nav
