import React from 'react';

import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function MessHeader(props) {
  const navigation = useNavigation();
  const recieverId = props.id.scene.route.params.recieverId;
  const group = props.id.scene.route.params.group

  return (
    <View>
      {
        group ? (  <Header
     
          containerStyle ={{height: 65}}

          rightComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => navigation.navigate('ChatOption', { id: recieverId }),
          }}
         
          leftComponent={{
            icon: 'keyboard-return',
            color: '#fff',
            onPress: () => navigation.goBack()

          }}
        />) :
<Header 
  containerStyle ={{height: 65}}

 leftComponent={{
  icon: 'keyboard-return',
  color: '#fff',
  onPress: () => navigation.goBack()
  
}}
/>

      }
    
    </View>
  );
}

export default MessHeader;
