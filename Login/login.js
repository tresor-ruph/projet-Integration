import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";

function Login(props) {
  return (
    <View style={styles.container}>
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
<MaterialRightIconTextbox
          inputStyle="Label"
          inputStyle="Mail"
          style={styles.materialRightIconTextbox}
        ></MaterialRightIconTextbox>
        <MaterialRightIconTextbox
          inputStyle="Label"
          inputStyle="Password"
          style={styles.materialRightIconTextbox}
        ></MaterialRightIconTextbox>
        <MaterialButtonSuccess
          style={styles.materialButtonSuccess}
        ></MaterialButtonSuccess>
        <View style={styles.rect5}>
          <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum} onPress={() => props.navigation.navigate("Form")}>Pas encore de compte ? Inscription</Text>
          </View>
        </View>
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
    marginLeft: 131
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 329,
    marginTop: 63,
    marginLeft: 8
  },
  materialRightIconTextbox: {
    height: 43,
    width: 320,
    marginTop: 21,
    marginLeft: 28
  },
  materialButtonSuccess: {
    height: 43,
    width: 108,
    borderRadius: 18,
    marginTop: 56,
    marginLeft: 130
  },
  rect5: {
    width: 328,
    height: 50,
    backgroundColor: "rgba(230,230,230,1)",
    flexDirection: "row",
    marginTop: 120,
    marginLeft: 16
  },
  loremIpsum: {
    color: "#121212",
    marginTop: 2
  },
  textInput: {
    color: "rgba(208,27,27,1)",
    textDecorationLine: "underline",
    width: 92,
    height: 17,
    marginLeft: 19
  },
  loremIpsumRow: {
    height: 30,
    flexDirection: "row",
    flex: 1,
    marginRight: 43,
    marginLeft: 25
  }
});

export default Login;
