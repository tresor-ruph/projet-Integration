/* eslint-disable quotes */
import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";

export default function Login(props) {
  const [username, setusername] = useState(" ");
  //const [user, setUserId] = useState("")

  const onLogin = async () => {
    // eslint-disable-next-line no-undef
    //mettre ici ip pc et puis localhost
    fetch(`http://192.168.1.55:3000/contacts/${username}`)
      .then((reponse) => reponse.json())
      .then((json) => {
        console.log(json);
        const name = json[0].Nom;
        const Id = json[0].Id;
        const avatar = json[0].PhotoProfil;
        // setUserId(json[0].Id);

        const user = { Id, name, avatar };
        AsyncStorage.setItem("user", JSON.stringify(user));
        props.navigation.navigate("HomeScreen", { userid: json[0].Id });
      });
  };
 

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Username"}
        onChangeText={(text) => setusername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder={"Password"}
      
        style={styles.input}
      />

      <Button title={"Login"} style={styles.input} onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});