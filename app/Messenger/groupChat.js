import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";

import AsyncStorage from "@react-native-community/async-storage";
import Contact from "./contact";
import { event } from "react-native-reanimated";

//let contact = ' ';
function GroupChat() {
  const [group, setGroup] = useState([]);
  const [contact, setContact] = useState([]);
  const [chk, setchk] = useState(false);
  useEffect(() => {
    const getContact = async () => {
      const res = await AsyncStorage.getItem("contact");
      setContact(JSON.parse(res));
    };

    getContact();
  }, []);

  const test = (event) => {
    console.log(event);
    console.log("test");
  };

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
          onPress={(event) => {
            // event.target.check
            console.log(event.checked);
            setGroup((prevState) => [...prevState, contact[i].Nom]);
            console.log(group);
          }}
        />
      );
    }

    return arr;
  };
  console.log(group);

  return <View>{renderContact()}</View>;
}
const style = StyleSheet.create({});
export default GroupChat;
