/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Button, TouchableOpacity, Text } from 'react-native';

import Contact from './contact';


function ChatOption(route) {
  const [ownerId, setOwnerId] = useState('ownerId');
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState('userId');
  // const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      setUserId(user.Id);
    };
    getUser();

    fetch(`http://localhost:3000/groupUsers/${route.route.params.id}`)
      .then((response) => response.json())
      .then((json) => {
        setOwnerId(json[0].ownerId);
        setMembers(json);
      });
  }, [isFocused]);

  const leaveGroup = (id, bol) => {
    fetch(`http://localhost:3000/group/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json()) // or res.json()
      .then(() => {
        if (bol) {
          // setRefresh((prevState) => !prevState);
        } else {
          navigation.navigate('Discussion_Repo', { screen: 'groups' });
        }
      });
  };

  const deleteGroup = () => {
    fetch(`http://localhost:3000/group/all/${route.route.params.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json()) // or res.json()
      .then(() => {
        navigation.navigate('Discussion_Repo', { screen: 'groups' });
      });
  };

  const renderMemebers = () => {
    console.log(ownerId);
    console.log(userId);

    const arr = [];
    let i = 0;
    members.forEach((elt) => {
      arr.push(
        <Contact
          key={i}
          id={elt.userId}
          name={elt.Nom}
          imgUrl={elt.PhotoProfil}
          grp={false}
  // onNav={() => navigation.navigate('Chat', { recieverId: contacts[i].Id, senderId: userId })}
          component={
            ownerId === userId && (
              <Button
                title="test"
                onPress={() => leaveGroup(elt.userId, true)}
              />
            )
          }
        />
      );
      i++;
    });

    return arr;
  };

  return (
    <View>
      {ownerId === userId && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddGroupMem', {
              mem: members,
              grpId: route.route.params.id,
            })
          }
        >
          <Text>Add Members</Text>
        </TouchableOpacity>
      )}
      {ownerId !== userId && (
        <TouchableOpacity onPress={() => leaveGroup(userId, false)}>
          <Text>Quitter le group</Text>
        </TouchableOpacity>
      )}

      {renderMemebers()}

      {ownerId === userId && (
        <TouchableOpacity onPress={deleteGroup}>
          <Text>Suprimer le groupe</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ChatOption;
