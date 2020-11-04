import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import Contact from './contact';

//let contact = ' ';
function GroupChat() {
  const [contact, setContact] = useState(' ');
  const [chk, setchk] = useState(false);
  useEffect(() => {
    const getContact = async () => {
      const res = await AsyncStorage.getItem('contact');
      setContact(JSON.parse(res));
    };

    getContact();
  }, []);

  const renderContact = () => {
    const arr = [];

    for (let i = 0; i < contact.length; i++) {
      arr.push(
        <CheckBox
          key={i}
          checkedIcon="dot-circle-o"
          title={
            <Contact
              key={contact[i].Id}
              name={contact[i].Nom}
              imgUrl={contact[i].PhotoProfil}
              grp
            />
          }
          checked={chk}
          onPress={() => {
            setchk((prevState) => !prevState);
          }}
        />
      );
    }

    return arr;
  };
  return <View>{renderContact()}</View>;
}
const style = StyleSheet.create({});
export default GroupChat;
