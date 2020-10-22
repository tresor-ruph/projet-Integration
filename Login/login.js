import React, { Component } from "react";
import { StyleSheet, View, Text,TextInput, Button, ScrollView} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
/*import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";*/
/*import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialButtonSuccess from "../components/MaterialButtonSuccess";*/
import axios from 'axios';

class Login extends React.Component {
  constructor() {
  super();
  this.state={
    Mail: '',
    motdepasse:'',
    textValue: ''

  }
  }
  submit() {
    if(this.state.Mail == "" && this.state.motdepasse ==""){
      this.setState({
        textValue: 'Vous avez rentrer aucune information'
    })    
  }
    else if(this.state.Mail == "" || this.state.motdepasse ==""){
      this.setState({
        textValue: 'Il manque une information'
    }) 
    }
    else{
      console.log(this.state)
      this.setState({
        textValue: ''
    })

    this.props.navigation.navigate("HomeScreen")

    axios.get("",{
      email: this.state.Mail,
      password: this.state.motdepasse
    }).then(response => {
      console.log(response)
    }).catch(error =>{
      console.log(error)
    })
    }
  }
  render() {
  return (
    <ScrollView useNativeDriver= {true}>
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
          paddingRight: 1,fontSize: 16,alignSelf: "stretch",flex: 1,lineHeight: 1,paddingTop: 14,paddingBottom: 1}}>
        </TextInput>
      <TextInput
          inputStyle="Label"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text)=> { this.setState({ motdepasse: text }) }}
          style={{height: 43,width: 320,marginTop: 21, marginLeft: 28,color: "#000",
          paddingRight: 16,fontSize: 16,alignSelf: "stretch",flex: 1,lineHeight: 16,paddingTop: 14,paddingBottom: 8}}>
      </TextInput>
      <Text style={{color: "#121212",marginTop: 2, marginBottom: 10}} >{this.state.textValue}</Text>

        <Button
        style={{height: 43,width: 50,borderRadius: 18,marginTop: 56,marginLeft: 130,
          color: "#fff",fontSize: 14,backgroundColor: "#009688",justifyContent: "center",alignItems: "center",
          flexDirection: "row",borderRadius: 2,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.35,shadowRadius: 5,elevation: 2,minWidth: 88,paddingLeft: 16,paddingRight: 16}}
        onPress={()=>{this.submit()}}
        title="Connexion"
        color="#841584"
        accessibilityLabel="Connexion"
      />
        <View style={{width: 328,height: 50,backgroundColor: "rgba(230,230,230,1)",flexDirection: "row",marginTop: 120,marginLeft: 16}}>
          <View style={{height: 30,flexDirection: "row",flex: 1,marginRight: 43,marginLeft: 25}}>
            <Text style={{color: "#121212",marginTop: 2}} onPress={() => this.props.navigation.navigate("Form")}>Pas encore de compte ? Inscription</Text>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  )}
}

export default Login;
