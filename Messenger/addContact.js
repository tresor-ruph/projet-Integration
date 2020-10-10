import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialIconTextbox from "./components/MaterialIconTextbox";
import MaterialIconTextbox1 from "./components/MaterialIconTextbox1";
import CupertinoFooter1 from "./components/CupertinoFooter1";

function Addcontact(props) {
  return (
    <View style={styles.container}>
      <MaterialIconTextbox
        iconStyleName="calendar"
        inputStyle="Label"
        iconStyle="account"
        inputStyle="Nom"
        style={styles.materialIconTextbox}
      ></MaterialIconTextbox>
      <MaterialIconTextbox1
        iconStyleName="calendar"
        inputStyle="Label"
        iconStyle="phone"
        inputStyle="Teleph."
        style={styles.materialIconTextbox1}
      ></MaterialIconTextbox1>
      <CupertinoFooter1 style={styles.cupertinoFooter1}></CupertinoFooter1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialIconTextbox: {
    height: 75,
    width: 360,
    marginTop: 103
  },
  materialIconTextbox1: {
    height: 43,
    width: 360,
    marginTop: 18
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
  }
});

export default Addcontact;
