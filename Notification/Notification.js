import React from "react";
import {View,Button} from 'react-native';

class Notif extends React.Component {
  submitNotif(){
    console.log('Test Notif')
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Button
        style={{height: 43,width: 50,borderRadius: 18,marginTop: 56,marginLeft: 130,
          color: "#fff",fontSize: 14,backgroundColor: "#009688",justifyContent: "center",alignItems: "center",
          flexDirection: "row",borderRadius: 2,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.35,shadowRadius: 5,elevation: 2,minWidth: 88,paddingLeft: 16,paddingRight: 16}}
        onPress={() => this.submitNotif()}
        title="Notif1"
        color="#841584"
        accessibilityLabel="Connexion"
      />
              <Button
        style={{height: 43,width: 50,borderRadius: 18,marginTop: 56,marginLeft: 130,
          color: "#fff",fontSize: 14,backgroundColor: "#009688",justifyContent: "center",alignItems: "center",
          flexDirection: "row",borderRadius: 2,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.35,shadowRadius: 5,elevation: 2,minWidth: 88,paddingLeft: 16,paddingRight: 16}}
        onPress={() => console.log("test")}
        title="Notif2"
        color="#841749"
        accessibilityLabel="Connexion"
      />
      </View>
    )}
  }


export default Notif;