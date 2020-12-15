/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {View} from 'react-native';
import {Header} from 'react-native-elements';

export default function HomeHeader() {
  return (
    <View>
      <Header
        containerStyle={{color: '#0077b6'}}
        centerComponent={{
          text: 'Accueil',
          style: {fontSize: 21, padding: 10},
        }}
      />
    </View>
  );
}
