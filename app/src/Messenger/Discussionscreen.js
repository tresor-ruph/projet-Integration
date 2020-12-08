/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
//this component is the home screen of our chat component

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, SafeAreaView, ScrollView, Button} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialButtonShare from './components/MaterialButtonShare';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Contact from './contact';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import RecentChat from './recentChats';
import {useNavigation} from '@react-navigation/native';
import {ListItem, Avatar} from 'react-native-elements';

import GroupScreen from './GroupScreen';
import contactStorage from './contact_storage';

let userId = ' ';
let disp = ' ';
let userName;
function Discussion_Repo(route, props) {
  const [contacts, setContact] = useState(' ');
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(0);
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  disp = route.route.params.screen;
  async function getContact() {
    let recentChats = await AsyncStorage.getItem('recentChats');
    if (recentChats == null) {
      await AsyncStorage.setItem('recentChats', JSON.stringify([]));
    }
    let contact = await AsyncStorage.getItem('contact');
    if (contact == null) {
      let test = [];
      await AsyncStorage.setItem('contact', JSON.stringify(test));
    } else {
      contact = JSON.parse(contact);
      setContact(contact);
    }
    setLoaded(true);

    let id = await AsyncStorage.getItem('user');
    userName = JSON.parse(id).name;
    id = JSON.parse(id).Id;
    userId = id;
  }

  useEffect(() => {
    getContact();
  }, [loaded, isFocused]);

  function renderScreen() {
    if (disp === 'disc') {
      return <RecentChat />;
    } else if (disp === 'groups') {
      return <GroupScreen />;
    } else if (disp === 'contacts') {
      let arr = [];
      Array.from(contacts)
        .sort((a, b) => a.Nom.localeCompare(b.Nom))

        .forEach((elt) => {
          arr.push(
            <ListItem key={elt.Id} bottomDivider>
              <Avatar source={{uri: elt.PhotoProfil}} size="large" rounded />
              <ListItem.Content>
                <ListItem.Title>{elt.Nom}</ListItem.Title>
                <View style={{flexDirection: 'row', left: '200%', top: -25}}>
                  <Icon
                    name="message"
                    style={{left: '65%', fontSize: 25, color: 'green'}}
                    onPress={() => {
                      navigation.navigate('Chat', {
                        recieverId: elt.Id,
                        senderId: userId,
                        moreInfo: -1,
                        sendername: userName,
                      });
                    }}
                  />
                  <Icon
                    name="delete-forever"
                    style={{left: '80%', fontSize: 25, color: 'red', marginLeft: 50}}
                    onPress={() => {
                      contactStorage(elt.Id);
                      getContact();
                    }}
                  />
                </View>
              </ListItem.Content>
            </ListItem>,
          );
        });
      return (
        <View>
          <View>{arr}</View>
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{loaded ? renderScreen() : <Text> </Text>}</ScrollView>
      <View>
        <TouchableOpacity style={styles.buttonAdd}>
          {disp == 'contacts' && (
            <MaterialButtonShare
              iconName="account-plus"
              icon="account-plus"
              style={styles.materialButtonShare}
              nav="Ajouter un contact"
            />
          )}
          {disp == 'groups' && (
            <TouchableOpacity
              style={[styles.groupAdd, props.style]}
              onPress={() => navigation.navigate('selectioner Membres')}>
              <Icon name="account-multiple-plus" style={styles.icongroup} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.footer, styles.materialIconTextButtonsFooter1]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Discussion_Repo', {screen: 'disc'});
          }}
          style={styles.buttonWrapper1}>
          <MaterialCommunityIconsIcon name={'wechat'} style={styles.icon1} />
          <Text style={styles.btn1Text}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Discussion_Repo', {screen: 'groups'});
          }}
          style={styles.activeButtonWrapper}>
          <MaterialCommunityIconsIcon name={'account-group'} style={styles.Icon3} />
          <Text style={styles.activeContent}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Discussion_Repo', {screen: 'contacts'});
          }}
          style={styles.buttonWrapper2}>
          <MaterialCommunityIconsIcon name={'contacts'} style={styles.icon2} />
          <Text style={styles.btn2Text}>Contacts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    // fontFamily:"arial"
  },
  scrollView: {
    flex: 0.8,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },
  materialIconTextButtonsFooter1: {
    height: 62,
    width: '100%',
    marginTop: 678,
  },
  deleteForv: {
    marginLeft: 55,
    color: 'red',
    fontSize: 30,
    top: -37,
  },
  messIcon: {
    color: 'green',
    fontSize: 30,
    top: -37,
  },
  buttonWrapper1: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
  },
  icon1: {
    backgroundColor: 'transparent',
    color: '#616161',
    fontSize: 24,

    //opacity: 0.8,
  },
  btn1Text: {
    fontSize: 12,
    color: '#616161',

    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  activeButtonWrapper: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
  },
  Icon3: {
    color: '#616161',
    fontSize: 24,
    /* backgroundColor: "transparent",
    color: "#9E9E9E",
    fontSize: 24,
    opacity: 0.8,*/
  },
  activeContent: {
    fontSize: 14,
    color: '#616161',

    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  buttonWrapper2: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
  },
  icon2: {
    //backgroundColor: "transparent",
    color: '#616161',
    fontSize: 24,
    //opacity: 0.8,
  },
  btn2Text: {
    fontSize: 12,
    color: '#616161',

    backgroundColor: 'transparent',
    paddingTop: 4,
  },
  buttonAdd: {
    width: 56,
    height: 56,
    position: 'absolute',
    flex: 0.1,
    left: '80%',
    right: 0,
    bottom: 80,
  },
  materialButtonShare: {
    height: 56,
    width: 56,
  },
  groupAdd: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(65,117,5,1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
  },
  icongroup: {
    color: '#fff',
    fontSize: 24,
    alignSelf: 'center',
  },
});
export default Discussion_Repo;
