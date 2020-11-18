/* eslint-disable quotes */

import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import Contact from "./contact";


//import Contact from "./contact";

function RecentChat() {
  const [recentChat, setRecent] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getId = async () => {
      let id = await AsyncStorage.getItem("user");
      id = JSON.parse(id).Id;
      //setUserId(id);

      // eslint-disable-next-line no-undef
      fetch(`http://192.168.1.52:3000/chatconv/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setRecent(json);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getId();
  }, [isFocused]);

  function renderScreen() {
    const arr = [];
    let i = 0;

    Array.from(recentChat).forEach((element) => {
      arr.push(
        <Contact
          key={i}
          name={element.Nom}
          imgUrl={element.PhotoProfil}
          lastMess={"test test"}
          repert={false}
          onNav={() =>
            navigation.navigate("Chat", {
              recieverId: element.recieverId,
              senderId: element.senderId,
            })
          }
        />
      );
      ++i;
    });

    return <View>{arr}</View>;
  }
  return <View>{renderScreen()}</View>;
}


export default RecentChat;
