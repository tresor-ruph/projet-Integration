import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";

function Addcontact(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");

  function enregistrer() {
    if (name == "" && email == "") {
      setMess("veuillez remplir tout les champs");
    } else if (name == "" && email != "") {
      setMess("veuillez entrer un nom ");
    } else if (name != "" && email == "") {
      setMess("veuillez entrer l'address");
    } else {
      async function getContact(x) {
        try {
          const value = await AsyncStorage.getItem("contact");
          let value2 = JSON.parse(value);
          if(value2.length === 0){
            value2.push(x[0]);
            await AsyncStorage.setItem("contact", JSON.stringify(value2));
            setMess("contact ajouté !");
          }else {
          if (value2[0].Id === x[0].Id) {
            setMess("le contact ci existe deja");
          } else {
            console.log("ahhahah")
            console.log(x);
            value2.push(x[0]);
            console.log(value2);
            await AsyncStorage.setItem("contact", JSON.stringify(value2));
            setMess("contact ajouté !");
          }
        }
        } catch (e) {
          console.log(e);
        }
      }


      try {
        console.log(email)

        fetch(`http://localhost:3000/contacts/${email}`)
          .then((response) => response.json())
          .then((json) => {
            if (json.length === 1) {
              console.log("hahha");
              console.log(json)
              json[0].Nom = name;
              console.log(json)
              getContact(json);
            } else {
              setMess("Ce contact n'existe pas !");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  let handleNom = (event) => {
    setName(event.target.value);
  };
  let handleEmail = (event) => {
    setEmail(event.target.value);
  };
  return (
    <View style={styles.container}>
      {mess === "contact ajouté !" ? (
        <View>
          <Text style={styles.mess1}>{mess}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.mess2}>{mess}</Text>
        </View>
      )}
      <View style={[styles.input1, props.style]}>
        <Icon name="email" style={styles.iconStyle}></Icon>
        <TextInput
          placeholder="Email"
          style={styles.inputStyle}
          onChange={handleEmail}

        ></TextInput>
      </View>
      <View style={[styles.input2, props.style]}>
        <Icon name="account" style={styles.iconStyle2}></Icon>
        <TextInput
          placeholder="Nom."
          style={styles.inputStyle2}
          onChange={handleNom}

        ></TextInput>
      </View>
      <View style={styles.footer}>
        <View style={styles.btnWrapper1Row}>
          <TouchableOpacity style={styles.btnWrapper1}>
            <Button
              title="Annuler"
              onPress={() => props.navigation.navigate("Discussion_Repo")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrapper4}>
            <Button title="Enregistrer" onPress={() => enregistrer()} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input1: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    width: 360,
    marginTop: 103,
  },
  mess2: {
    width: "100%",
    backgroundColor: "rgba(255,62,62,1)",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  mess1: {
    width: "100%",
    backgroundColor: "rgba(62,255,62,1)",

    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8,
  },
  inputStyle: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8,
  },

  cupertinoFooter1: {
    position: "fixed",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    height: 70,
    width: "100%",
    marginTop: 470,
  },
  input2: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    height: 43,
    width: 360,
    marginTop: 18,
  },
  iconStyle2: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8,
  },
  inputStyle2: {
    color: "#000",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    position: "fixed",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    height: 70,
    width: "100%",
    marginTop: 470,
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    height: 49,
    width: 188,
  },
  textInput2: {
    fontSize: 16,
    backgroundColor: "transparent",
    paddingTop: 4,
    width: 77,
    height: 23,
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: 188,
  },
  textInput: {
    fontSize: 16,
    color: "rgba(171,15,15,1)",
    backgroundColor: "transparent",
    paddingTop: 4,
    width: 143,
    height: 50,
  },
  btnWrapper1Row: {
    height: 49,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
  },
});

export default Addcontact;
