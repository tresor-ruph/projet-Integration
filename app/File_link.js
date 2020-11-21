/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
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
import DiscHeader from './discHeader';
import Demande from './demandeFormulaire/Demande';
import ListeDem from './Catalogue/ListeDem';
import mesDemandes from './Catalogue/mesDemandes';
import Proposition from './Catalogue/proposition';
import PropositionA from './Catalogue/propositionAssignee';

//import Login from './Login/login'
import Notation from './Homescreen/Notation';
import checkProfil from './Profil/checkProfil';
// Create the navigator
const Stack = createStackNavigator();
function Nav() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="checkProfil" component={checkProfil} />


            <Stack.Screen name="signup" component={Form} />
            <Stack.Screen name="succes" component={Succes} />
            
            <Stack.Screen name="ListeDem" component={ListeDem} />
            <Stack.Screen name="Demande" component={Demande} />
            <Stack.Screen name="Notation" component={Notation} />
            <Stack.Screen name="mesDemandes" component={mesDemandes} />
            <Stack.Screen name="Proposition" component={Proposition} />
            <Stack.Screen name="PropositionA" component={PropositionA} />

        <Stack.Screen
name="Ajouter Membres" component={AddGroupMem}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(0,128,192,0.7)',
          },
        }}
        />

        <Stack.Screen
name="selectioner Membres" component={GroupChat} 
         options={{
          headerStyle: {
            backgroundColor: 'rgba(0,128,192,0.7)',
          },
        }}
        />
        <Stack.Screen
name="Creer groupe" component={ConfGroup}
          
            options={{
              headerStyle: {
                backgroundColor: 'rgba(0,128,192,0.7)',
              },
            }}
          
          
        />
        <Stack.Screen
name="Parametres" component={ChatOption}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(0,128,192,0.7)',
          },
        }}
        />



        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Profil" component={Profil} />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            header: (navigation) => <MessHeader id={navigation} Screen="disc" />,
          }}
        />

        <Stack.Screen name="Succes" component={Succes} />

        <Stack.Screen
name="Discussion_Repo"
        component={Discussion_Repo} 
        options={{
          header: (navigation) => <DiscHeader id={navigation} />,
        }}
        />
        
      
        <Stack.Screen
name="Ajouter un contact" component={addContact} 
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

