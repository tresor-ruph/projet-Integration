import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialHeader1 from "../components/MaterialHeader1";
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialFixedLabelTextbox2 from "../components/MaterialFixedLabelTextbox2";
import MaterialButtonPrimary from "../components/MaterialButtonPrimary";
import Svg, { Ellipse } from "react-native-svg";
import MaterialFixedLabelTextbox1 from "../components/MaterialFixedLabelTextbox1";
import MaterialFixedLabelTextbox3 from "../components/MaterialFixedLabelTextbox3";

function UpdateData(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <MaterialHeader1
            leftIconName="menu"
            rightIconName="dots-vertical"
            textInput="Title"
            rightIconButton="Go Back"
            leftIconButton="Go Back"
            leftIcon="keyboard-backspace"
            textInput="Infos"
            style={styles.materialHeader1}
          ></MaterialHeader1>
          <MaterialFixedLabelTextbox
            label="FixedLabel"
            label="Nom"
            style={styles.materialFixedLabelTextbox}
          ></MaterialFixedLabelTextbox>
          <MaterialFixedLabelTextbox2
            label="FixedLabel"
            label="Adresse"
            style={styles.materialFixedLabelTextbox2}
          ></MaterialFixedLabelTextbox2>
          <MaterialButtonPrimary
            style={styles.materialButtonPrimary}
          ></MaterialButtonPrimary>
        </View>
        <View style={styles.rect2}>
          <View style={styles.ellipseRow}>
            <Svg viewBox="0 0 57.19 53.04" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(250,248,248,1)"
                strokeWidth={0}
                fill="rgba(93,44,44,1)"
                cx={29}
                cy={27}
                rx={29}
                ry={27}
              ></Ellipse>
            </Svg>
            <Text style={styles.loremIpsum}>Modifiez vos informations</Text>
          </View>
        </View>
        <MaterialFixedLabelTextbox1
          label="FixedLabel"
          label="Prenom"
          style={styles.materialFixedLabelTextbox1}
        ></MaterialFixedLabelTextbox1>
        <MaterialFixedLabelTextbox3
          label="Code postal"
          style={styles.materialFixedLabelTextbox3}
        ></MaterialFixedLabelTextbox3>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
  },
  rect: {
    top: 0,
    left: 1,
    width: 360,
    height: 717,
    position: "absolute",
    backgroundColor: "rgba(148,237,153,1)",
  },
  materialHeader1: {
    height: 56,
    width: 360,
    backgroundColor: "rgba(148,237,153,1)",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 1,
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 226,
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    marginTop: 66,
  },
  materialFixedLabelTextbox2: {
    height: 43,
    width: 226,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 43,
  },
  materialButtonPrimary: {
    height: 33,
    width: 100,
    borderRadius: 15,
    marginTop: 252,
  },
  rect2: {
    top: 57,
    width: 360,
    height: 67,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    left: 0,
    flexDirection: "row",
  },
  ellipse: {
    width: 57,
    height: 53,
  },
  loremIpsum: {
    color: "#121212",
    marginLeft: 63,
    marginTop: 10,
  },
  ellipseRow: {
    height: 53,
    flexDirection: "row",
    flex: 1,
    marginRight: 66,
    marginLeft: 12,
    marginTop: 6,
  },
  materialFixedLabelTextbox1: {
    height: 43,
    width: 227,
    position: "absolute",
    left: 0,
    top: 166,
    borderWidth: 1,
    borderColor: "#000000",
  },
  materialFixedLabelTextbox3: {
    height: 43,
    width: 227,
    position: "absolute",
    left: 0,
    top: 252,
    borderWidth: 1,
    borderColor: "#000000",
  },
  rectStack: {
    width: 361,
    height: 717,
    marginTop: 22,
    marginLeft: -1,
  },
});

export default UpdateData;
