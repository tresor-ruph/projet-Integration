import React, { useEffect, useState } from "react";
import { Button, Overlay } from "react-native-elements";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";


const OverlayExample = (props) => {
  const [visible, setVisible] = useState(true);
  const [load, setLoad] = useState(true);

  useEffect(() => {
   
    async function verif() {
      let x = await AsyncStorage.getItem("servicesId");
      x = JSON.parse(x);
      let y = false;
      Array.from(x).forEach((elt) => {
        if (elt == props.idOffre) {
          y = true;
          console.log(elt)
          console.log("found")
        }
      });
      if (y === true) {
        setLoad(false);
        
      }
    }
    verif();
  });
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const setServId = async () => {
    let serv = await AsyncStorage.getItem("servicesId");
    if (serv === null) {
      console.log("hahaha")
      const arr = [props.idOffre];


      await AsyncStorage.setItem("servicesId", JSON.stringify(arr));
    } else {
     
      serv = JSON.parse(serv);
      let verif = false;
      Array.from(serv).forEach((elt) => {
        if (elt === props.idOffre) {
          verif = true;
        }
      });

      if (verif === false) {
        serv.push(props.idOffre);
      } else {
      }
      await AsyncStorage.setItem("servicesId", JSON.stringify(serv));
    }
  };

  const removeServ = async () => {
    await AsyncStorage.removeItem("servicesId");
  };

  const handleAccept = () => {
    setServId();

    
  const requestOptions = {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
    body: JSON.stringify({
      
      idDemandeur: props.idDem,
      idOffreur: props.userId,
      IdService:props.idOffre,
    }),
  };
  try {
    fetch("http://localhost:3000/service/addService", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
    setVisible(false);
  };
  const handleReject = () => {
   // removeServ();
   setServId();
    
  };
  const handleLater = () => {
    setVisible(false);
  }
  return (
    <View>
      {load ? (
      
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>Allez vous rendre service a cette personne ?</Text>
      <Text style= {{ color: "gray"}}>service :{props.descrip}</Text>
          <View style={styles.container}>
          <View>{console.log("found")}</View>
            <View style={styles.button1}>
              <Button
                title="Oui"
                buttonStyle={{ width: 80 }}
                onPress={handleAccept}
              />
            </View>
            <View style={styles.button2}>
              <Button
                title="Non"
                buttonStyle={{ width: 80 }}
                onPress={handleReject}
              />
            </View>
            <View style={styles.button3}>
              <Button
                title="Plus tard"
                buttonStyle={{ width: 100 }}
                onPress={handleLater}
              />
            </View>
          </View>
        </Overlay>
      ) : (
        
        <View>{console.log("caanot log")}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 50,
  },
  button1: {
    left: "2%",
  },
  button2: {
    left: "35%",
    position: "absolute",
  },
  button3: {
    left: "65%",
    position: "absolute",
  }
});
export default OverlayExample;
