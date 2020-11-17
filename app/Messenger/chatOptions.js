/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';

import Contact from './contact';

function ChatOption(route) {
  const [ownerId, setOwnerId] = useState('ownerId');
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState('userId');
  const [load, setLoad] = useState(0);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      setUserId(user.Id);
    };
    getUser();
    getMembers();

   
  }, [isFocused]);

  function getMembers() {
    fetch(`http://localhost:3000/groupUsers/${route.route.params.id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setOwnerId(json[0].ownerId);
      setMembers(json);
    });
  }

  const leaveGroup = (id, bol) => {
    fetch(`http://localhost:3000/group/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        if (bol) {
          getMembers();
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
    const arr = [];
    let i = 0;
    members.forEach((elt) => {
      arr.push(
        
        <Contact
          key={elt.userId}
          id={elt.userId}
          name={elt.Nom}
          imgUrl={elt.PhotoProfil}
          grp={false}
          // onNav={() => navigation.navigate('Chat', { recieverId: contacts[i].Id, senderId: userId })}
          component={
            ownerId === userId && (
              elt.userId === userId ?
                 <View style={{ borderRadius: 10 }}><Text style={{ color: 'green' }}>Admin</Text></View> :
              <View style={{ borderRadius: 10 }}>
                <TouchableOpacity onPress={() => leaveGroup(elt.userId, true)}>
                  <Text style={{ color: 'red' }}>retirer</Text>
                </TouchableOpacity>
              </View>
              
              
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
        <View style={styles.addMemb}>
          <Button
            title="Ajouter Membre"
            onPress={() =>
              navigation.navigate('AddGroupMem', {
                mem: members,
                grpId: route.route.params.id,
              })
            }
            color="green"
          />
        </View>
      )}

      {ownerId === userId && (
        <View style={styles.suprimerGrp}>
          <Button
            title="suprimer le group"
            onPress={deleteGroup}
            color="red"
          />
        </View>
      )}
      {ownerId !== userId && (
        <Button
          onPress={() => leaveGroup(userId, false)}
          title="QUITTER LE GROUPE"
          color="red"
        />
      )}
      <View style={{ backgroundColor: 'white', marginTop: 10 }}>
        <Text style={styles.participant}>Participants</Text>
      </View>
      {renderMemebers()}
    </View>
  );
}

const styles = StyleSheet.create({
  addMemb: {
    marginTop: 10,
  },
  suprimerGrp: {
    marginTop: 10,
    backgroundColor: 'red',
  },

  participant: {
    color: 'green',
    fontSize: 16,
  },
});

export default ChatOption;
