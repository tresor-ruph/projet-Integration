import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';
import Contact from './contact';

//let contact = ' ';
function GroupChat() {
  const [group, setGroup] = useState([]);
  const [contact, setContact] = useState([]);
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
          checked={contact[i].check}
          onPress={() => {

            setchk((prevState) => !prevState);
            contact[i].check = chk;

            if (chk === true) {
              //we add the contact into group
              setGroup((prevState) => [...prevState, contact[i].Nom]);
            } else {
              //we remove the contact from group if it exist

              // eslint-disable-next-line no-lonely-if
              if (group.includes(contact[i].Nom)) {
                setGroup((prevState) =>
                //this line will remove contact[i].Nom from arr prevSate
                  prevState.filter((elt) => elt !== contact[i].Nom)
                );
              }
            }
          }}
        />
      );
    }

    return arr;
  };
  console.log(group);

  return <View>{renderContact()}</View>;
}
export default GroupChat;
