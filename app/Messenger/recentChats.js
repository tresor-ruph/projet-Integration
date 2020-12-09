/* eslint-disable quotes */

import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
=======
import { View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
>>>>>>> 580549ce9a46b8a5b198b7640ab8afd914ab8ab9

import Contact from "./contact";
import OverlayExample from "./overlay";

//import Contact from "./contact";

function RecentChat() {
  const [recentChat, setRecent] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [confOffre, setConfOffre] = useState(false);
  const [idDem, setIdDem] = useState("");
  const [idOffreur, setIdOffreur] = useState("");
  const [idServ, setIdServ] = useState("");
  const [idNom, setIdNom] = useState(" ");

  useEffect(() => {
    const getId = async () => {
      let id = await AsyncStorage.getItem("user");
      id = JSON.parse(id).Id;

      //setUserId(id);

      // eslint-disable-next-line no-undef
      fetch(`http://localhost:3000/chatconv/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setRecent(json);
          console.log(json);
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
          repert={false}
          lastMess={element.descriptif}
          onNav={() =>
            navigation.navigate("Chat", {
              recieverId: element.recieverId,
              senderId: element.senderId,
              check: "offre",
              //servId : serviceId,
              handleItem: (item) => {
                if (item === "confOffre") {
                  setConfOffre(true);
                  setIdDem(element.recieverId);
                  setIdOffreur(element.senderId);
                  setIdServ(element.contact);
                  setIdNom(element.descriptif);
                }
                console.log(item);
              },
              handleItem2: (item2) => {
                console.log(item2);
              },
            })
          }
        />
      );
      ++i;
    });

    return <View>{arr}</View>;
  }
  return (
    <View>
      {confOffre && (
        <OverlayExample
          idDem={idDem}
          idOffre={idServ}
          userId={idOffreur}
          descrip={idNom}
        />
      )}
      {renderScreen()}
    </View>
  );
}

export default RecentChat;
