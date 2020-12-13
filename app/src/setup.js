/* eslint-disable prettier/prettier */
import * as react from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDRItqqCOKaYRO3hMHpIc_m1V61oOQcfSY',
  authDomain: 'help-recover-3984c.firebaseapp.com',
  databaseURL: 'https://help-recover-3984c.firebaseio.com',
  projectId: 'help-recover-3984c',
  storageBucket: 'help-recover-3984c.appspot.com',
  messagingSenderId: '200817849391',
  appId: '1:200817849391:web:80c54f2a630d75ce5682da',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default () => {
  return {firebase, auth};
};
