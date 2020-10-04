import React, { Component ,Text,useState} from "react";
import { StyleSheet, View } from "react-native";
import FooterDisc from "./footer_discuss";
import Svg, { Ellipse } from "react-native-svg";
import Chat from "./Chat";

function DiscussionMain(props) {
   
  return (
    <View style={styles.container}>
        
      <FooterDisc
        icon1Name="timer"
        activeIconName="heart"
        icon2Name="map-marker-radius"
        buttonWrapper1="Untitled1"
        icon1="wechat"
        activeButtonWrapper="Untitled1"
        activeIcon="account-group"
        buttonWrapper2="Untitled1"
        icon2="contacts"
        
        style={styles.materialIconTextButtonsFooter1}
      ></FooterDisc> 
      <View>
    
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialIconTextButtonsFooter1: {
    height: 62,
    width: "100%",
    marginTop: 678
  },
  ellipse1: {
    width: 66,
    height: 83,
    marginTop: -651,
    marginLeft: 16
  },
  ellipse2: {
    width: 66,
    height: 83,
    marginTop: 27,
    marginLeft: 16
  },
  ellipse3: {
    width: 66,
    height: 83,
    marginTop: 21,
    marginLeft: 16
  },
  ellipse4: {
    width: 66,
    height: 83,
    marginTop: 31,
    marginLeft: 16
  },
  ellipse5: {
    width: 66,
    height: 83,
    marginTop: 42,
    marginLeft: 10
  },
  cupertinoHeaderWithActionButton1: {
    height: 44,
    width: 375,
    marginTop: -602,
    marginLeft: -7
  }
});

export default DiscussionMain;
