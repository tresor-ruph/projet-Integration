import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Chat from './Chat'
function FooterDisc(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => console.log("Navigate to Discussion")}
        style={styles.buttonWrapper1}
      >
        <MaterialCommunityIconsIcon
          name={props.icon1 || "timer"}
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn1Text}>Recent</Text>
      </TouchableOpacity>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        onPress={() => console.log("Navigate to Groups")}
        style={styles.activeButtonWrapper}
      >
        <MaterialCommunityIconsIcon
          name={props.activeIcon || "heart"}
          style={styles.activeIcon}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.activeContent}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity /* Conditional navigation not supported at the moment */
        onPress={() => console.log("Navigate to Contacts")}
        style={styles.buttonWrapper2}
      >
        <MaterialCommunityIconsIcon
          name={props.icon2 || "map-marker-radius"}
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn2Text}>Nearby</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFF",
      flexDirection: "row",
      shadowColor: "#111",
      shadowOffset: {
        width: 0,
        height: -2
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.2,
      elevation: 3
    },
    buttonWrapper1: {
      flex: 1,
      paddingTop: 8,
      paddingBottom: 10,
      paddingHorizontal: 12,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    icon1: {
      backgroundColor: "transparent",
      color: "#616161",
      fontSize: 24,
      opacity: 0.8
    },
    btn1Text: {
      fontSize: 12,
      color: "#9E9E9E",
      backgroundColor: "transparent",
      paddingTop: 4
    },
    activeButtonWrapper: {
      flex: 1,
      paddingTop: 6,
      paddingBottom: 10,
      paddingHorizontal: 12,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    activeIcon: {
      backgroundColor: "transparent",
      color: "#9E9E9E",
      fontSize: 24,
      opacity: 0.8
    },
    activeContent: {
      fontSize: 14,
      color: "#9E9E9E",
      backgroundColor: "transparent",
      paddingTop: 4
    },
    buttonWrapper2: {
      flex: 1,
      paddingTop: 8,
      paddingBottom: 10,
      paddingHorizontal: 12,
      minWidth: 80,
      maxWidth: 168,
      alignItems: "center"
    },
    icon2: {
      backgroundColor: "transparent",
      color: "#616161",
      fontSize: 24,
      opacity: 0.8
    },
    btn2Text: {
      fontSize: 12,
      color: "#9E9E9E",
      backgroundColor: "transparent",
      paddingTop: 4
    }
  });
export default FooterDisc;
