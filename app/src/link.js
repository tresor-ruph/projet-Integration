/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// eslint-disable-next-line prettier/prettier

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Nav;
