import React, { Component, useState } from "react";
import { StyleSheet, View ,TextInput} from "react-native";
import { event } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import CupertinoFooter1 from "./components/CupertinoFooter1";

function Addcontact(props) {

    const [name, setName] = useState("");
    const [Tel, setTel] = useState("");

    let handleNom = event => {
        setName(event.target.value);
    }
    let handleTel = event => {
      setTel(event.target.value);
    }
  return (
    <View style={styles.container}>

       <View style={[styles.input1, props.style]}>
      <Icon
        name="account"
        style={styles.iconStyle}
      ></Icon>
      <TextInput
        placeholder= "Nom"
        style={styles.inputStyle}
        onChange = {handleNom}
      ></TextInput>
    </View>
    <View style={[styles.input2, props.style]}>
      <Icon
        name="phone"
        style={styles.iconStyle2}
      ></Icon>
      <TextInput
        placeholder="Teleph."
        style={styles.inputStyle2}
        onChange = {handleTel}

      ></TextInput>
    </View>
      <CupertinoFooter1 style={styles.cupertinoFooter1} name = {name} tel = {Tel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input1: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    width: 360,
    marginTop: 103
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8
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
    paddingBottom: 8
  },

 
  cupertinoFooter1: {
    position: 'fixed',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    height: 70,
    width: "100%",
    marginTop: 470
  },
  input2: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    height: 43,
    width: 360,
    marginTop: 18
  },
  iconStyle2: {
    color: "#616161",
    fontSize: 24,
    paddingLeft: 8
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
    paddingBottom: 8
  }
});

export default Addcontact;
