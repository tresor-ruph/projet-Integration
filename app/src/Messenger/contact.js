/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

function Contact(props) {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(props.name);
  // eslint-disable-next-line no-unused-vars
  const [imgUrl, setImgUrl] = useState(props.imgUrl);
  const lastMess = props.lastMess;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `${imgUrl}`,
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 200 / 2,
          }}
        />
        <TouchableOpacity style={styles.mess} onPress = {props.onNav}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.Lastmessage}>{lastMess}</Text>
          <View style={{flexDirection: 'row', left: '335%'}}>
            <View style={styles.button2}>{props.component2}</View>
            <View style={styles.button1}>{props.component}</View>
          </View>
        </TouchableOpacity>
        <View />
      </View>
      <View style={styles.viewStyleForLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  textName: {
    marginTop: -30,
    marginBottom: 10,
    marginLeft: -20,
    fontSize: 16,
  },
  Lastmessage: {
    color: 'gray',
    marginLeft: -20,
  },
  mess: {
    width: '100%',
    marginLeft: '10%',
    marginTop: '10%',
  },
  viewStyleForLine: {
    borderBottomColor: 'rgba(177,175,184,0.3)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    width: '100%',
  },
  button1: {
    top: -22,
  },
  button2: {
    top: -22,
  },
});

export default Contact;
