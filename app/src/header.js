/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';

import {View} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDRItqqCOKaYRO3hMHpIc_m1V61oOQcfSY',
  authDomain: 'help-recover-3984c.firebaseapp.com',
  databaseURL: 'https://help-recover-3984c.firebaseio.com',
  projectId: 'help-recover-3984c',
  storageBucket: 'help-recover-3984c.appspot.com',
  messagingSenderId: '200817849391',
  appId: '1:200817849391:web:80c54f2a630d75ce5682da',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
let chatRoom;
const db = firebase.firestore().collection('video');

function MessHeader(props) {
  const navigation = useNavigation();

  const recieverId = props.id.scene.route.params.recieverId;
  const senderId = props.id.scene.route.params.senderId;
  const group = props.id.scene.route.params.group;
  const moreInfo = props.id.scene.route.params.moreInfo;
  const sendername = props.id.scene.route.params.sendername;
  useEffect(() => {
    fetch(`https://help-recover-api.herokuapp.com/chat/${senderId}/${recieverId}/${moreInfo}`)
      .then((reponse) => reponse.json())
      .then((json) => {
        chatRoom = json[0].roomId;
      });
  });

  return (
    <View>
      {group ? (
        <Header
          containerStyle={{height: 65}}
          rightComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => navigation.navigate('Parametres', {id: recieverId}),
          }}
          leftComponent={{
            icon: 'keyboard-return',
            color: '#fff',
            onPress: () => navigation.goBack(),
          }}
        />
      ) : (
        <Header
          containerStyle={{height: 65}}
          leftComponent={{
            icon: 'keyboard-return',
            color: '#fff',
            onPress: () => {
              console.log(props.id.scene.route.params);
              if (props.id.scene.route.params.check === 'offre') {
                // route.params.handleItem = "test";
                props.id.scene.route.params.handleItem('confOffre');
              }

              navigation.goBack();
            },
          }}
          rightComponent={
            <Icon
              name="video"
              style={{color: 'blue', fontSize: 28}}
              onPress={() => {
                console.log(chatRoom);
             
                 navigation.navigate('chatvideo', {
                  recieverId: recieverId,
                  senderId: senderId,
                  moreInfo: moreInfo,
                  sendername: sendername,
                });
              }}
            />
          }
        />
      )}
    </View>
  );
}

export default MessHeader;
