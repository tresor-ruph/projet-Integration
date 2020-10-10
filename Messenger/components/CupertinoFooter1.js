import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";

function CupertinoFooter1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.btnWrapper1Row}>
        <TouchableOpacity style={styles.btnWrapper1}>
          <TextInput
            placeholder="Annuler"
            placeholderTextColor="rgba(211,15,15,1)"
            style={[
              styles.textInput2,
              {
                color: props.active ? "#007AFF" : "#9E9E9E"
              }
            ]}
          ></TextInput>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper4}>
          <TextInput
            placeholder="Enregistrer"
            placeholderTextColor="rgba(244,11,11,1)"
            style={styles.textInput}
          ></TextInput>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row"
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    height: 49,
    width: 188
  },
  textInput2: {
    fontSize: 16,
    backgroundColor: "transparent",
    paddingTop: 4,
    width: 77,
    height: 23
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 49,
    width: 188
  },
  textInput: {
    fontSize: 16,
    color: "rgba(171,15,15,1)",
    backgroundColor: "transparent",
    paddingTop: 4,
    width: 143,
    height: 50
  },
  btnWrapper1Row: {
    height: 49,
    flexDirection: "row",
    flex: 1,
    marginRight: -1
  }
});

export default CupertinoFooter1;
