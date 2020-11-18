/* eslint-disable quotes */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";


function ChatOption(route) {
  const [ownerId, setOwnerId] = useState("ownerId");
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState("userId");

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      let user = await AsyncStorage.getItem("user");
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
        setOwnerId(json[0].ownerId);
        setMembers(json);
      });
  }

  const leaveGroup = (id, bol) => {
    fetch(`http://localhost:3000/group/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        if (bol) {
          getMembers();
        } else {
          navigation.navigate("Discussion_Repo", { screen: "groups" });
        }
      });
  };

  const deleteGroup = () => {
    fetch(`http://localhost:3000/group/all/${route.route.params.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json()) // or res.json()
      .then(() => {
        navigation.navigate("Discussion_Repo", { screen: "groups" });
      });
  };


  return (
    <View>
      {ownerId === userId && (
        <View style={styles.addMemb}>
          <Button
            title="Ajouter Membre"
            onPress={() =>
              navigation.navigate("Ajouter Membres", {
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
          <Button title="suprimer le group" onPress={deleteGroup} color="red" />
        </View>
      )}
      {ownerId !== userId && (
        <Button
          onPress={() => leaveGroup(userId, false)}
          title="QUITTER LE GROUPE"
          color="red"
        />
      )}
      <View style={{ backgroundColor: "white", marginTop: 10 }}>
        <Text style={styles.participant}>Participants</Text>
      </View>
      {members
        .sort((a, b) => a.Nom.localeCompare(b.Nom))
        .map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.PhotoProfil }} />
            <ListItem.Content>
              <ListItem.Title>{l.Nom}</ListItem.Title>
              {l.userId === userId ? (
                <TouchableOpacity
                  style={styles.retirer}
                  
                >
                  <Text style={{ color: "green" }}>Admin</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
style={styles.ajouter}
                onPress={() => leaveGroup(l.userId, true)}
                >
                  <Text style={{ color: "red" }}>retirer</Text>
                </TouchableOpacity>
              )}
            </ListItem.Content>
          </ListItem>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  addMemb: {
    marginTop: 10,
  },
  suprimerGrp: {
    marginTop: 10,
    backgroundColor: "red",
  },

  participant: {
    color: "green",
    fontSize: 16,
  },
  retirer: {
    left: "80%",
  },
  ajouter: {
    left: "80%",
  },
});

export default ChatOption;
