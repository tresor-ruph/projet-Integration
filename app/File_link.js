/* eslint-disable camelcase */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './Homescreen/HomeScreen';
import Chat from './Messenger/Chat';

import Discussion_Repo from './Messenger/Discussionscreen';
import addContact from './Messenger/addContact';
import Login from './Messenger/components/login';
import Profil from './Profil/Profil';
//import Form from './SignIn/Form'
import Succes from './SignIn/Success';
import Form from './SignIn/Form';
import Home from './Homescreen/Home';
import ConfGroup from './Messenger/confGroup';
import GroupChat from './Messenger/groupChat';
import ChatOption from './Messenger/chatOptions';
import MessHeader from './header';
import AddGroupMem from './Messenger/addGroupMem';

//import Login from './Login/login'

// Create the navigator
const Stack = createStackNavigator();
function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddGroupMem" component={AddGroupMem} />

        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="ConfGroup" component={ConfGroup} />
        <Stack.Screen name="ChatOption" component={ChatOption} />

        <Stack.Screen name="signup" component={Form} />
        <Stack.Screen name="succes" component={Succes} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Profil" component={Profil} />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            header: (navigation) => <MessHeader id={navigation} />,
          }}
        />

        <Stack.Screen name="Succes" component={Succes} />

        <Stack.Screen name="Discussion_Repo" component={Discussion_Repo} />
        <Stack.Screen name="addContact" component={addContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;