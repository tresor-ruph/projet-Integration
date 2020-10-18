import React, { Component } from "react";
import { StyleSheet, View, Text,TextInput, Button} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
/*import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";*/
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";
import axios from 'axios';

class Login extends React.Component {
  constructor() {
  super();
  this.state={
    Mail: '',
    motdepasse:'',
  }
  }
  submit() {
    console.log(this.state)
  }
  render() {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1,backgroundColor: "#E6E6E6",marginTop: 0}}>
        <Svg viewBox="0 0 114.08 123.01" style={{width: 114,height: 123,marginTop: 26,marginLeft: 131}}>
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
        <TextInput
          inputStyle="Label"
          placeholder="Mail"
          onChangeText={(text)=> { this.setState({ Mail: text }) }}
          style={{height: 43,width: 320,marginTop: 21, marginLeft: 28,color: "#000",
          paddingRight: 1,fontSize: 16,alignSelf: "stretch",flex: 1,lineHeight: 1,paddingTop: 1,
          paddingBottom: 1}}>
        </TextInput>
      <TextInput
          inputStyle="Label"
          placeholder="Password"
          onChangeText={(text)=> { this.setState({ motdepasse: text }) }}
          style={{height: 43,width: 320,marginTop: 21, marginLeft: 28,color: "#000",
          paddingRight: 16,fontSize: 16,alignSelf: "stretch",flex: 1,lineHeight: 16,paddingTop: 14,
          paddingBottom: 8}}>
      </TextInput>
      <Icon name="eye" style={{color: "#616161",fontSize: 24,paddingRight: 8}}></Icon>
        <Button
        onPress={()=>{this.submit()}}
        title="Test de Récupération"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
        <MaterialButtonSuccess
          style={{height: 43,width: 108,borderRadius: 18,marginTop: 56,marginLeft: 130}}
        ></MaterialButtonSuccess>
        <View style={{width: 328,height: 50,backgroundColor: "rgba(230,230,230,1)",flexDirection: "row",marginTop: 120,marginLeft: 16}}>
          <View style={{height: 30,flexDirection: "row",flex: 1,marginRight: 43,marginLeft: 25}}>
            <Text style={{color: "#121212",marginTop: 2}} onPress={() => props.navigation.navigate("Form")}>Pas encore de compte ? Inscription</Text>
          </View>
        </View>
      </View>
    </View>
  )}
}

export default Login;
