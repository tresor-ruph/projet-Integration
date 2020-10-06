import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function Home(props) {
    return (
        <View style={styles.container}>
        <View style={styles.rect}>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.button}
            >
            <Text style={styles.connectezVous}>Connectez-vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("Form")}
            style={styles.button2}
            >
            <Text style={styles.inscrivezVous}>Inscrivez vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("HomeScreen")}
            style={styles.button3}
            >
            <Text style={styles.inscrivezVous}>Page Home</Text>
            </TouchableOpacity>
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
    backgroundColor: "rgba(231,225,225,1)",
    marginTop: 24
  },
  button: {
    width: 241,
    height: 71,
    backgroundColor: "rgba(222,72,72,1)",
    borderRadius: 20,
    marginTop: 247,
    marginLeft: 59
  },
  connectezVous: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 23,

    marginLeft: 40
  },
  button2: {
    width: 241,
    height: 72,
    backgroundColor: "rgba(6,194,23,1)",
    borderRadius: 20,
    marginTop: 28,
    marginLeft: 59
  },
  button3: {
    width: 241,
    height: 72,
    backgroundColor: "rgba(6,194,23,1)",
    borderRadius: 20,
    marginTop: 28,
    marginLeft: 59
  },
  inscrivezVous: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 23,
    marginTop: 18,
    marginLeft: 48
  }
});

export default Home;