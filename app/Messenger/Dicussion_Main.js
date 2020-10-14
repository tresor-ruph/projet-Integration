import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FooterDisc from './Discussion_Screen';

function DiscussionMain() {
  const [disp, setDisp] = useState(' ');
  function handleChange(newValue) {
    console.log(newValue);
    setDisp(newValue);
    console.log({ disp });
  }

  return (
    <View style={styles.container}>
        
      < FooterDisc
        icon1Name="timer"
        activeIconName="heart"
        icon2Name="map-marker-radius"
        buttonWrapper1="Untitled1"
        icon1="wechat"
        activeButtonWrapper="Untitled1"
        activeIcon="account-group"
        buttonWrapper2="Untitled1"
        icon2="contacts"
        onChange={handleChange}
        
        style={styles.materialIconTextButtonsFooter1}
      / >
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialIconTextButtonsFooter1: {
    height: 62,
    width: '100%',
    marginTop: 678
  },
 
  cupertinoHeaderWithActionButton1: {
    height: 44,
    width: 375,
    marginTop: -602,
    marginLeft: -7
  }
});

export default DiscussionMain;
