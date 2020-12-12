import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
//import RecentChatStorage from './recentChat_storage';
import {ListItem, Avatar} from 'react-native-elements';

let userId = ' ';
//import Contact from "./contact";
function GroupScreen(props) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [groups, setGroups] = useState('');

  useEffect(() => {
    async function getUser() {
      let id = await AsyncStorage.getItem('user');
      id = JSON.parse(id).Id;
      userId = id;
      try {
        fetch(`https://help-recover-api.herokuapp.com/group/${userId}`)
          .then((response) => response.json())
          .then((json) => {
            setGroups(json);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [isFocused]);

  function renderScreen() {
    const arr = [];

    Array.from(groups)
      .sort((a, b) => a.GroupName.localeCompare(b.GroupName))
      .forEach((elt) => {
        arr.push(
          <ListItem
            key={elt.Id}
            bottomDivider
            onPress={() => navigation.navigate('Chat', {recieverId: elt.Id, senderId: userId, group: true})}>
            <Avatar source={{uri: elt.GroupImage}} size="large" rounded />
            <ListItem.Content>
              <ListItem.Title>{elt.GroupName}</ListItem.Title>
            </ListItem.Content>
          </ListItem>,
        );
      });

    return <View>{arr}</View>;
  }
  return <View>{renderScreen()}</View>;
}

export default GroupScreen;
