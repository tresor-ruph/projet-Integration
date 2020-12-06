/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Button, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
//import FirebaseVideo from './firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';

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

const db = firebase.firestore().collection('video');

const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
const localPC = new RTCPeerConnection(configuration);
const remotePC = new RTCPeerConnection(configuration);
let userId;
export default function VideoWeb(props) {
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [cachedRemotePC, setCachedRemotePC] = React.useState();
  const [sdpDescription, setSdpDescription] = useState('');
  const [dispText, setDispText] = useState('tic tack');
  const [isMuted, setIsMuted] = React.useState(false);
  const [disp, setdisp] = useState(false);
  const [corrName, setCorrName] = useState('tresor');
  const [mess, setMess] = useState('')
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const result = JSON.parse(value);

        userId = result;
      }
    } catch (error) {
      console.log('an error occured with retrieving data');
    }
  };

  async function setOffer(x) {
    await localPC.setRemoteDescription(x);
    console.log('i recieved the offer and i am user :', userId);
  }

  async function setAnswer() {
    console.log(`i am user ${userId} and this is my response`);
    genCandidate(1, 'no');
    localPC.addStream(localStream);
    genAnswer();
    setCachedLocalPC(localPC);
    setdisp(false);
  }

  useEffect(() => {
    retrieveData();
    startLocalStream();
    console.log(userId);
    let i = 0;
    let verif = false;
    const unsubscribe = db.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          //console.log(message.offer);
          if (message.user == userId) {
            if (message.again == 'yes') {
              setdisp(true);
            }
            if (message.cdt != undefined) {
              let res = JSON.parse(message.cdt);
              localPC.addIceCandidate(res);
              console.log('i recieved the candidates and i am user', userId);
            }

            if (message.offer != undefined) {
              let res = JSON.parse(message.offer);
              setOffer(res);
            }
            try {
              localPC.onaddstream = (e) => {
                setRemoteStream(e.stream);
                setMess('appel termine')
              };
            } catch (err) {
              console.log('cannot set remote stream');
            }
          

        
          }
          if (message.cancel === 'true') {
            closeStreams();
          }

          

          return {
            message,
          };
        });
    });

    return () => unsubscribe();
  }, []);
  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find((device) => device.kind === 'videoinput' && device.facing === facing);
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const genCandidate = (x, y) => {
    localPC.onicecandidate = (e) => {
      try {
        if (e.candidate) {
          db.add({cdt: JSON.stringify(e.candidate), user: x, again: y});
          console.log(`user ${userId} is sending to the other`);
        }
      } catch (err) {
        console.log('an error occured with genCandidate');
      }
    };
  };
  const genOffer = async () => {
    try {
      const offer = await localPC.createOffer();
      await localPC.setLocalDescription(offer);
      db.add({offer: JSON.stringify(offer), user: 2, again: 'yes'});
      console.log(`user ${userId} is sending offer to the other`);
      // await remotePC.setRemoteDescription(localPC.localDescription);
      //

      //
      //await localPC.setRemoteDescription(remotePC.localDescription);
    } catch (err) {
      console.error('an error occured with genOffer method');
    }
  };
  const genAnswer = async () => {
    const answer = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);
    db.add({offer: JSON.stringify(answer), user: 1, again: 'no'});
  };

  const startCall = async () => {
    console.log(`i am user ${userId} and this is my call`);

    genCandidate(2, 'yes');
    localPC.addStream(localStream);
    genOffer();
    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  const closeStreams = () => {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }

    setLocalStream();
    setRemoteStream();
    setCachedRemotePC();
    setCachedLocalPC();
    db.add({cancel: 'true'});
    props.navigation.navigate('login');
  };
  const renderPhoneCall = () => {
    return (
      <View>
        <View style={{padding: 15, marginTop: '30%'}}>
          <Text style={{fontSize: 22, textAlign: 'center', color: 'white'}}>{corrName} souhaite vous joindre par video</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: '30%'}}>
          <View style={{marginRight: '50%'}}>
            <Button title="Accepter" color="green" onPress={() => setAnswer()} />
          </View>
          <View>
            <Button title="refuser" color="red" onPress={() => closeStreams()} />
          </View>
        </View>
      </View>
    );
  };
  const renderCallScreen = () => {
    return (
      <View>
        <View>{localStream && <Button title="call" onPress={() => (userId === 1 ? startCall() : setAnswer())} />}</View>
        <View>
          {localStream && (
            <View style={styles.toggleButtons}>
              <Button title="flip camera" onPress={switchCamera} />
              <Button title={`${isMuted ? 'Unmute' : 'Mute'}`} onPress={toggleMute} disabled={!remoteStream} />
            </View>
          )}
        </View>
        <View style={{...styles.videosContainer}}>
          <View style={{flex: 1, position: 'relative'}}>
            {remoteStream ? (
              <RTCView
                //key={1}
                mirror={true}
                style={{...styles.rtcViewRemote}}
                // objectFit="contain"
                streamURL={remoteStream && remoteStream.toURL()}
              />
            ) : (
              <View style={{padding: 15}}>
                <Text style={{fontSize: 22, textAlign: 'center', color: 'white'}}>En attente de connexion ...</Text>
              </View>
            )}

            {localStream && (
              <RTCView objectFit="cover" style={{...styles.rtcView}} streamURL={localStream && localStream.toURL()} />
            )}
          </View>
        </View>
            <Text>{mess}</Text>
        <Button title="Click to stop call" onPress={closeStreams} disabled={!remoteStream} />
        

      </View>
    );
  };

  return <SafeAreaView style={styles.container}>{disp ? renderPhoneCall() : renderCallScreen()}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131',
    //justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 30,
  },

  rtcView: {
    position: 'absolute',

    width: '100%',
    height: '45%',
    top: '47%',
    //   position: 'absolute',
    // zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  rtcViewRemote: {
    width: '100%',
    height: '47%',
    backgroundColor: 'black',
  },

  videosContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  toggleButtons: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
