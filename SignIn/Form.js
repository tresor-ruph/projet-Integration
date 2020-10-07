import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialButtonShare from "../components/MaterialButtonShare";
import MaterialIconTextbox2 from "../components/MaterialIconTextbox2";

function Form(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <Svg viewBox="0 0 114.08 123.01" style={styles.ellipse1}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(28,144,159,1)"
              cx={57}
              cy={62}
              rx={57}
              ry={62}
            ></Ellipse>
          </Svg>
          <View style={styles.materialFixedLabelTextbox3Row}>
            <MaterialFixedLabelTextbox
              label="FixedLabel"
              label="Nom"
              style={styles.materialFixedLabelTextbox3}
            ></MaterialFixedLabelTextbox>
            <MaterialFixedLabelTextbox
              label="Prenom"
              style={styles.materialFixedLabelTextbox4}
            ></MaterialFixedLabelTextbox>
          </View>
          <MaterialRightIconTextbox
            inputStyle="Label"
            inputStyle="Mot de passe"
            style={styles.materialRightIconTextbox}
          ></MaterialRightIconTextbox>
          <Text style={styles.loremIpsum5}></Text>
          <Text style={styles.loremIpsum4}></Text>
          <View style={styles.rect5StackStack}>
            <View style={styles.rect5Stack}>
              <View style={styles.rect5}></View>
              <MaterialButtonShare
                iconName="share-variant"
                icon="arrow-right-bold"
                style={styles.materialButtonShare}
              ></MaterialButtonShare>
            </View>
            <Text style={styles.loremIpsum3}></Text>
          </View>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>vous avez deja un compte ?</Text>
            <Text style={styles.connectezVous}>connectez-vous.</Text>
          </View>
        </View>
        <MaterialFixedLabelTextbox
          label="Email"
          style={styles.materialFixedLabelTextbox}
        ></MaterialFixedLabelTextbox>
        <MaterialIconTextbox2
          iconStyleName="calendar"
          inputStyle="Label"
          inputStyle="Date de Naissance"
          style={styles.materialIconTextbox2}
        ></MaterialIconTextbox2>
        <MaterialFixedLabelTextbox
          label="Address"
          style={styles.materialFixedLabelTextbox5}
        ></MaterialFixedLabelTextbox>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    marginTop: 0
  },
  ellipse1: {
    width: 114,
    height: 123,
    marginTop: 26,
    marginLeft: 130
  },
  materialFixedLabelTextbox3: {
    height: 43,
    width: 133
  },
  materialFixedLabelTextbox4: {
    height: 43,
    width: 133,
    marginLeft: 68
  },
  materialFixedLabelTextbox3Row: {
    height: 43,
    flexDirection: "row",
    marginTop: 62,
    marginLeft: 2,
    marginRight: 24
  },
  materialRightIconTextbox: {
    height: 43,
    width: 320,
    marginTop: 93,
    marginLeft: 16
  },
  loremIpsum5: {
    color: "#121212",
    marginTop: 37,
    marginLeft: 186
  },
  loremIpsum4: {
    color: "#121212",
    marginTop: 6,
    marginLeft: 180
  },
  rect5: {
    top: 0,
    left: 0,
    width: 328,
    height: 19,
    position: "absolute",
    backgroundColor: "rgba(230,230,230,1)"
  },
  materialButtonShare: {
    height: 37,
    width: 39,
    position: "absolute",
    left: 293,
    top: 10
  },
  rect5Stack: {
    top: 0,
    left: 0,
    width: 332,
    height: 47,
    position: "absolute"
  },
  loremIpsum3: {
    top: 46,
    left: 229,
    position: "absolute",
    color: "#121212"
  },
  rect5StackStack: {
    width: 332,
    height: 47,
    marginTop: 105,
    marginLeft: 15
  },
  loremIpsum: {
    color: "#121212"
  },
  connectezVous: {
    color: "rgba(208,27,27,1)",
    textDecorationLine: "underline",
    marginLeft: 5
  },
  loremIpsumRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 34,
    marginLeft: 26,
    marginRight: 55
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 329,
    position: "absolute",
    left: 0,
    top: 282
  },
  materialIconTextbox2: {
    height: 43,
    width: 375,
    position: "absolute",
    left: 3,
    top: 403
  },
  materialFixedLabelTextbox5: {
    height: 43,
    width: 360,
    position: "absolute",
    left: 0,
    top: 460
  },
  rectStack: {
    flex: 1
  }
});

export default Form;