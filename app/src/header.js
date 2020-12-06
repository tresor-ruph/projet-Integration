/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {View} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

function MessHeader(props) {
  const navigation = useNavigation();
  const recieverId = props.id.scene.route.params.recieverId;
  const group = props.id.scene.route.params.group;

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
        />
      )}
    </View>
  );
}

export default MessHeader;
