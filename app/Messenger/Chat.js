// @refresh reset

import React, { useState, useEffect, useCallback, useRef } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, Text } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const firebaseConfig = {
  apiKey: "AIzaSyDRItqqCOKaYRO3hMHpIc_m1V61oOQcfSY",
  authDomain: "help-recover-3984c.firebaseapp.com",
  databaseURL: "https://help-recover-3984c.firebaseio.com",
  projectId: "help-recover-3984c",
  storageBucket: "help-recover-3984c.appspot.com",
  messagingSenderId: "200817849391",
  appId: "1:200817849391:web:80c54f2a630d75ce5682da",
};

//prevent us from initialising the app every time we refresh screen
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
let chatRoom = "";
let lastMessage = " ";
let moreInfo = "true";
//let setErrorMess = true

export default function Chat(route, navigation) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [errorMess, setErrorMess] = useState(false);
  const [groups, setGroups] = useState(route.route.params.group);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
  

  const chatId = () => {
    const chatterId = route.route.params.senderId;
    //id de l'envoyeur
    const chateeId = route.route.params.recieverId;
    //id qui recois
    const chatIdPre = [];
    chatIdPre.push(chatterId);
    chatIdPre.push(chateeId);

    if (groups) {
      return `${chateeId}`;
    } else {
      return chatIdPre.join("_");
    }
  };

  let chatsRef = db.collection("chats");

  const setServ = async () => {
    console.log("test")
    console.log(route.route.params)
    await  AsyncStorage.setItem("serv", JSON.stringify(route.route.params.idDem))
    console.log(route.route.params.idDem)
  }
  useEffect(() => {
  
    if (!groups) {
      if(route.route.params.check === "offre"){
    setServ()
    console.log("test")
        moreInfo = "false";
       
      }
    }

    if (groups) {
      chatRoom = chatId();
      readUser();

      //onSnapshot serves as an observer so it is called any time we have an update on our collection(table)
      try {
        const unsubscribe = chatsRef
          .doc(chatRoom)
          .collection("message")
          .onSnapshot((querySnapshot) => {
            //we listen to the doc changes
            const messagesFirestore = querySnapshot
              .docChanges()
              .filter(({ type }) => type === "added")
              .map(({ doc }) => {
                const message = doc.data();
                //createdAt is firebase.firestore.Timestamp instance
                //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                return { ...message, createdAt: message.createdAt.toDate() };
              })
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            appendMessages(messagesFirestore);
            //the 2 lines above sort the message by creation time so that recent messages are sent first
            try {
              return () => unsubscribe();
            } catch (error) {
              //setErrorMess(true);
            }
          });
      } catch (error) {
        console.log(error);
        //setErrorMess(true);
      }
    } else {
      console.log("test request 2")
      fetch(
        `http://localhost:3000/chat/${route.route.params.senderId}/${route.route.params.recieverId}/${moreInfo}`
      )
        .then((reponse) => reponse.json())
        .then((json) => {
          
          if (json.length === 0) {
            chatRoom = chatId();
            if(route.route.params.check ==="offre"){
              moreInfo =route.route.params.idDem;
            }else {
              moreInfo = -1
            }
           
            //chatsRef = db.collection('chats').doc(chatId()).collection('message');
            const requestOptions = {
              method: "POST",
              headers: new Headers({
                Accept: "application/json",
                "content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              }),
              body: JSON.stringify({
                
                senderId: route.route.params.senderId,
                recieverId: route.route.params.recieverId,
                chatId: chatId(),
                contact: moreInfo,
              }),
            };
            try {
              console.log("try request");
              //mettre ici ip pc et puis localhost
              fetch("http://192.168.1.52:3000/chat/addroom", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                  console.log("hello");
                  console.log(data);
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              chatRoom = json[0].roomId;
            } catch (error) {
              console.log(error);
              //  setErrorMess = true;
            }

            // chatsRef = db.collection('chats').doc(json[0].roomId).collection('message');
          }
        })
        .then(() => {
          readUser();

          //onSnapshot serves as an observer so it is called any time we have an update on our collection(table)
          try {
            const unsubscribe = chatsRef
              .doc(chatRoom)
              .collection("message")
              .onSnapshot((querySnapshot) => {
                //we listen to the doc changes
                const messagesFirestore = querySnapshot
                  .docChanges()
                  .filter(({ type }) => type === "added")
                  .map(({ doc }) => {
                    const message = doc.data();
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return {
                      ...message,
                      createdAt: message.createdAt.toDate(),
                    };
                  })
                  .sort(
                    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                  );
                appendMessages(messagesFirestore);
                //the 2 lines above sort the message by creation time so that recent messages are sent first
              });
          } catch (error) {
            console.log(error);
            setErrorMess(true);
          }
          try {
            return () => unsubscribe();
          } catch (error) {
            console.log(error);

            //setErrorMess(true);
          }
        })
        .catch(function () {
          console.log("an error occured");
          setErrorMess(true);
        });
    }
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    const tokenNotif = "293" //route.route.params.recieverId //"293"
    fetch(`http://localhost:3000/recupToken/${tokenNotif}`)
    .then(response => response.json())
    .then(json => {
      token_notif = json[0]["tokenNotif"];
      //console.log(token_notif)
    })


    return async function cleanup() {
      if(moreInfo === "false"){
        console.log("hzhz")
     
      }else {
        console.log("bye bye");
      }    
    };
  }, []);

  async function sendPushNotification(text,user,expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Vous avez reçus un message de "+ user,
      body: text,
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        token = token_notif
        console.log("token "+token);
        return;
      }
      token = "ExponentPushToken[oqoweINbgum4lW8nv-dfo8]" //modifier pour récupérer le token de l'autre personnes
      //token = token_notif
    } else {
      alert("Must use physical device for Push Notifications");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    return token;
  }

  const appendMessages = useCallback(
    //prevent recent message from replacing previouse one
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function readUser() {
    //we get the user from async storage
    const user = await AsyncStorage.getItem("user");
    if (user) {
      //  const _id = Math.random().toString(36).substring(7);
      const _id = JSON.parse(user).Id;
      let name = JSON.parse(user).name;
      //sender name
      const avatar = JSON.parse(user).avatar;
      setUser({ _id, name, avatar });
    }
  }
  function saveLastMess() {
    recentChats.push(lastMessage);
    console.log(recentChats);
  }
  async function handleSend(messages) {
    lastMessage = messages[0];
    sendPushNotification(lastMessage.text,user.name,expoPushToken)
    const writes = messages.map((m) =>
      chatsRef.doc(chatRoom).collection("message").add(m)
    );
    await Promise.all(writes);
    //cette fonction envoie le message
  }

  return errorMess ? (
    <Text style={styles.erroMess}>Service non disponible</Text>
  ) : (
    <GiftedChat
      messages={messages}
      user={user}
      isTyping={true}
      maxInputLength={200}
      onSend={handleSend}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
  erroMess: {
    color: "red",
    textAlign: "center",
  },
});
