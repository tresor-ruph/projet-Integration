/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

//import all the components we are going to use
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
//Since we cannot access navigation props directly when called in a child component ,
//we will use navigation hooks

function Contact(props) {
  const navigation = useNavigation();

  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(props.name);
  // eslint-disable-next-line no-unused-vars
  const [imgUrl, setImgUrl] = useState(props.imgUrl);
  const [id, setId] = useState(props.id);
  const [del, setDel] = useState(false);
  const senderid = props.userId;
  const handleDel = async () => {
    await AsyncStorage.getItem('contact').then((res) => {
      const contact = JSON.parse(res);
      for (let i = 0; i < contact.length; i++) {
        if (contact[i].Nom === name) {
          contact.splice(i, 1);
        }
      }
      AsyncStorage.setItem('contact', JSON.stringify(contact));
    }); 
  };
  const handleCancel = () => {
    setDel(false);
  };
  const handlerLongClick = () => {
    setDel(true);
  };
  return (
    <View style={{ flex: 1 }}>
     
      <View style={styles.container}>
        <Image
          source={{
            uri: `${imgUrl}`,
          }}
          //borderRadius style will help us make the Round Shape Image

          style={{
            width: 75,
            height: 75,
            borderRadius: 200 / 2,
          }}
        />
        <TouchableOpacity
          style={styles.mess}
          onPress={() => navigation.navigate('Chat', { recieverId: id, senderId: senderid })}
          delayLongPress={1000}
          onLongPress={handlerLongClick}
        >
          <Text>{name}</Text>
        </TouchableOpacity>
        <View />
      </View>
      {del ? (
        <View style={styles.del}>
          <TouchableOpacity style={styles.buttonWrapper1} onPress={handleDel}>
            <MaterialCommunityIconsIcon name='delete' style={styles.icon1} />
            <Text style={styles.textInput}>Suprimer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper2}
            onPress={handleCancel}
          >
            <MaterialCommunityIconsIcon name='cancel' style={styles.icon2} />
            <Text
              style={styles.textInput2}
            >
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
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
  mess: {
    width: '100%',
    marginLeft: '10%',
    marginTop: '10%',
  },
  viewStyleForLine: {
    marginTop: 8,
    borderBottomColor: 'rgba(177,175,184,0.3)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    width: '100%',
  },
  del: {
    marginTop: 10,
    flexDirection: 'row',
    height: 56,
    width: 395,
  },

  annuler: {
    backgroundColor: 'green',
  },
  buttonWrapper1: {
    flex: 0.04,
    // paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
    padding: 0,
    margin: 0,
    left: 40,
    overflow: 'visible',
  },
  icon1: {
    backgroundColor: 'transparent',
    color: 'rgba(250,19,19,1)',
    fontSize: 24,
    opacity: 1,
    margin: 0,
  },
  textInput: {
    fontSize: 12,
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    paddingTop: 4,
    margin: 0,
    width: 50,
    height: 18,
  },
  buttonWrapper2: {
    flex: 1.17,
    // paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
    left: 40,
    width: 279,
    top: 0,
    height: 56,
  },
  icon2: {
    backgroundColor: 'transparent',
    color: 'rgba(100,176,11,1)',
    fontSize: 24,
    opacity: 0.8,
  },
  textInput2: {
    fontSize: 12,
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    paddingTop: 4,
    width: 49,
    height: 18,
  },
});

export default Contact;
