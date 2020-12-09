import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Contact from './contact';
import {useNavigation, useIsFocused} from '@react-navigation/native';
//import RecentChatStorage from './recentChat_storage';

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
        fetch(`https://help-recover-api.herokuapp.com/group/${1}`)
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
      .forEach((element) => {
        arr.push(
          <Contact
            key={element.Id}
            id={element.Id}
            name={element.GroupName}
            imgUrl={element.GroupImage}
            lastMess={element.text}
            grp={true}
            repert={false}
            onNav={() => navigation.navigate('Chat', {recieverId: element.Id, senderId: userId, group: true})}
          />,
        );
      });

    return <View>{arr}</View>;
  }
  return <View>{renderScreen()}</View>;
}

export default GroupScreen;
