import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

function MaterialButtonShare(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => navigation.navigate("addContact")}
    >
      <Icon name={props.icon || "share-variant"} style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center",
  },
});

export default MaterialButtonShare;
