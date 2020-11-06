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

function ConfirmGroup(props, route) {
    const [grpName, setName] = useState("");
    const [profPic, setProfPic] = useState("");

return(
    <View style={styles.container}>
     
      <View style={[styles.input1, props.style]}>
        <Icon name="group" style={styles.iconStyle}></Icon>
        <TextInput
          placeholder="Nom"
          style={styles.inputStyle}
         // onChange={handleEmail}
        ></TextInput>
      </View>
      <View style={styles.footer}>
        <View style={styles.btnWrapper1Row}>
          <TouchableOpacity style={styles.btnWrapper1}>
            <Button
              title="Annuler"
             // onPress={() => props.navigation.navigate("Discussion_Repo")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrapper4}>
            <Button title="create Account " 
            //onPress={() => enregistrer()}
             />
          </TouchableOpacity>
        </View>
      </View>
    </View>
)
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
export default ConfirmGroup;