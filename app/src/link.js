/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Homescreen/HomeScreen';
import Chat from './Messenger/Chat';

import Discussion_Repo from './Messenger/Discussionscreen';
import addContact from './Messenger/addContact';
import ConfGroup from './Messenger/confGroup';
import GroupChat from './Messenger/groupChat';
import ChatOption from './Messenger/chatOptions';
import AddGroupMem from './Messenger/addGroupMem';
import DiscHeader from './discHeader';
import MessHeader from './header';

import React from 'react';
import 'react-native-gesture-handler';
import VideoWeb from './video';
import Login from './login';
const Stack = createStackNavigator();
function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="chatvideo" component={VideoWeb} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          name="Ajouter Membres"
          component={AddGroupMem}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="selectioner Membres"
          component={GroupChat}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="Creer groupe"
          component={ConfGroup}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="Parametres"
          component={ChatOption}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            header: (navigation) => <MessHeader id={navigation} Screen="disc" />,
          }}
        />
        <Stack.Screen
          name="Discussion_Repo"
          component={Discussion_Repo}
          options={{
            header: (navigation) => <DiscHeader id={navigation} />,
          }}
        />
        <Stack.Screen
          name="Ajouter un contact"
          component={addContact}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(0,128,192,0.7)',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;
