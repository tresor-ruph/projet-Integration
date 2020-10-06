import React from "react"
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen'
import Chat  from './Messenger/Chat'
import DiscussionMain from './Messenger/Dicussion_Main'
import DiscussionScreen from './Messenger/Discussion_Screen'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Discussion_Repo from './Messenger/Discussion_Screen'



// Create the navigator
const Stack = createStackNavigator()
class Nav extends React.Component {
render() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name = "HomeScreen" component = {HomeScreen} />
            <Stack.Screen name = "Chat" component = {Chat} />
            <Stack.Screen name = "Discussion_Repo" component = {Discussion_Repo} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

}

export default Nav
