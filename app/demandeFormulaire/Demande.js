import React from 'react';
import { Button } from 'react-native';

function Demande(props) {
  return (<Button
title="test" 
   onPress={() => props.navigation.navigate('Chat', { senderId: 1, recieverId: 4 })}
  />);
}

export default Demande;

