import React from 'react';

import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function MessHeader(props) {
  const navigation = useNavigation();
  const recieverId = props.id.scene.route.params.recieverId;

  return (
    <View>
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => navigation.navigate('ChatOption', { id: recieverId }),
        }}
        centerComponent={{
          text: 'MY TITLE',
          style: { color: '#fff', onPress: () => console.log('test2') },
        }}
        rightComponent={{
          icon: 'home',
          color: '#fff',
          onPress: () => console.log('test3'),
        }}
      />
    </View>
  );
}

export default MessHeader;
