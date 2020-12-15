/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

function DiscHeader(props) {
  const [name, setName] = useState('TITLE');
  const navigation = useNavigation();
  const screenName = props.id.scene.route.params;

  useEffect(() => {
    if (screenName.screen === 'disc') {
      setName('Discussion');
    } else if (screenName.screen === 'groups') {
      setName('Groupes');
    } else if (screenName.screen === 'contacts') {
      setName('Répertoire');
    }
  });

  return (
    <View>
      <Header
        containerStyle={{height: 65}}
        leftComponent={{
          icon: 'home',
          color: '#fff',

          onPress: () => navigation.navigate('HomeScreen'),
        }}
        centerComponent={{
          text: name,
          style: {color: '#fff', fontSize: 22, onPress: () => console.log('test2')},
        }}
      />
    </View>
  );
}

export default DiscHeader;
