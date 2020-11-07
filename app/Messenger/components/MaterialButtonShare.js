/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function MaterialButtonShare(props) {
  const [navTo, setNavTo] = useState(props.nav);
  const [navOpt, setNavOpt] = useState(props.opt)
  const navigation = useNavigation();
  {console.log("test")}
  {console.log(navOpt)}
  return (
    <TouchableOpacity
   
      style={[styles.container, props.style]}
      onPress={() => navigation.navigate(`${navTo}`, navOpt)}
    >
    <Icon name={props.icon || 'share-variant'} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40,
  },
  icon: {
    color: '#fff',
    fontSize: 24,
    alignSelf: 'center',
  },
});

export default MaterialButtonShare;
