import React from 'react';

import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function OtherHeader(props) {
  const navigation = useNavigation();

  return (
    <View>
      
<Header 
  containerStyle ={{height: 65}}
  
 leftComponent={{
  icon: 'keyboard-return',
  color: '#fff',
  onPress: () => navigation.navigate('Discussion_Repo', { screen: props.screen })
  ,
}}
/> 
    
    </View>
  );
}

export default OtherHeader;
