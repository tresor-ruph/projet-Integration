import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, CheckBox } from 'react-native';

const App = () => {
  const [isSelectedEmail, setSelectionEmail] = useState(false);
  const [isSelectedNotif, setSelectionNotif] = useState(false);

  return(
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.box1}>
        <Text style={styles.titleText}>Email/Notifiaction</Text>
        <TextInput style={styles.textinput} placeholder='Votre message'/>
        </View>

        <View style={styles.box2}>
        <CheckBox
          value={isSelectedEmail}
          onValueChange={setSelectionEmail}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Email</Text>
        <Text>Envoyé un email: {isSelectedEmail ? "Oui" : "Non"}</Text>
        <CheckBox
          value={isSelectedNotif}
          onValueChange={setSelectionNotif}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Notification</Text>
        <Text>Envoyé une notifiaction: {isSelectedNotif ? "Oui" : "Non"}</Text>
        </View>

        <View style={styles.box3}>
        <Button style={styles.button} title='Envoyer' onPress={() => {}}/>
        <Text style={styles.labelcheck}>{isSelectedEmail && isSelectedNotif ? "Vous allez envoyé un email et une notfication" : "Vous allez rien envoyé"}</Text>

        </View>

      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  box1: {
    flex: 4,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  box2: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
  },
  box3: {
    flex: 1.5,
    backgroundColor: 'yellow',
    alignItems: 'center',
    paddingTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textinput: {
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
    height: 150,
    width: 350,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    backgroundColor: 'rgb(211,211,211)',
  },
  checkboxInput: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
    color: 'black',
  },
  labelcheck: {
    margin: 20,
    color: 'black',
  },
  button: {
    marginBottom: 200,
  }
});

export default App;