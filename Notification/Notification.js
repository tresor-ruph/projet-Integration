import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, {useEffect} from 'react';
import { Text, View} from 'react-native';

export default function App() {
  
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  /*useEffect(() =>{
    const getPushToken = async() => {
      const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if(existingStatus !== 'granted'){
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if(finalStatus !== 'granted'){
        alert('Failed to get push token for push notification');
        return;
      }
      const {data: token} = await Notifications.getExpoPushTokenAsync();
      console.log(token) 
    }

    getPushToken()
  }, [])*/

  //ExponentPushToken[0vi9EnDE0XgD2W94b_xcld]

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Text>Notifications </Text>
    </View>
  );
}