/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import {View} from 'react-native';
import {Header} from 'react-native-elements';

export default function HomeHeader() {
  return (
    <View>
      <Header
        containerStyle={{height: 65}}
        centerComponent={{
          text: 'Accueille', style: {fontSize: 19, padding: 10}
        }}
      />
    </View>
  );
}


