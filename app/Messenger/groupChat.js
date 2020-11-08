import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";

import AsyncStorage from "@react-native-community/async-storage";
import Contact from "./contact";
import { useNavigation } from '@react-navigation/native';


//let contact = ' ';
function GroupChat() {
  const [group, setGroup] = useState([]);
  const [contact, setContact] = useState([]);
  const [owner, setOwner] = useState([]);
  const [chk, setchk] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ConfGroup', {grp: group, grpowner: owner });
  };
  useEffect(() => {
    const getContact = async () => {
      const res = await AsyncStorage.getItem("contact");
      setContact(JSON.parse(res));
      const res2 = await AsyncStorage.getItem('user');
      setOwner(JSON.parse(res2).Id);
      const AsyncGrp = await AsyncStorage.getItem('group');
      if(AsyncGrp === null){
      await AsyncStorage.setItem('group', JSON.stringify([]));
      }

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
              setGroup((prevState) => [...prevState, contact[i].Id]);
            } else {
              //we remove the contact from group if it exist

              // eslint-disable-next-line no-lonely-if
              if (group.includes(contact[i].Id)) {
                setGroup((prevState) =>
                  //this line will remove contact[i].Nom from arr prevSate
                  prevState.filter((elt) => elt !== contact[i].Id)
                );
              }
            }
          }}
        />
      );
    }

    return arr;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{renderContact()}</ScrollView>
     <View>
          {console.log(group)}
          <TouchableOpacity
            style={styles.navTo}
            onPress={handlePress}
          >
            <Icon name={"arrow-right-bold"} style={styles.icon} />
          </TouchableOpacity>
        
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    flex: 0.8,
  },
  buttonAdd: {
    width: 56,
    height: 70,
   // position: "fixed",
    flex: 0.1,
    left: "80%",
    right: 0,
    bottom: 80,
  },
  navTo: {

    height: 56,
    width: 56,
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
    left: "80%",
    
    right: 0,
    bottom: 80,
   // position: 'fixed',


  },
  icon: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center",
  },
});
export default GroupChat;
