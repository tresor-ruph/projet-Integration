/* eslint-disable no-undef */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

function ConfGroup(route, props) {
  const [image, setImage] = useState(null);
  const [isPicked, setIsPicked] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [url, setUrl] = useState(null);
  const navigation = useNavigation();

  let imageName = 'group';
  const grpMem = route.route.params.grp;

  Array.from(grpMem).forEach((elt) => {
    imageName += elt;
  });

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setIsPicked(true);
    }
  };

  const handleGroup = (event) => {
    setGroupName(event.target.value);
  };
  const handleSent = async () => {
    const chatGroup = {
      groupId: Math.round(Math.random() * 10000000000000),
      ownerId: route.route.params.grpowner,
      Name: groupName,
      groupImage: url,
      members: route.route.params.grp,
    };

    let asyncGroup = await AsyncStorage.getItem('group');
    asyncGroup = JSON.parse(asyncGroup);
    asyncGroup.push(chatGroup);
    await AsyncStorage.setItem('group', JSON.stringify(asyncGroup));
    console.log(chatGroup);

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      body: JSON.stringify({
        groupId: Math.round(Math.random() * 10000000000000),
        ownerId: route.route.params.grpowner,
        Name: groupName,
        groupImage: url,
        members: route.route.params.grp,
      }),
    };
    try {
      fetch('http://192.168.1.52:3000/group/addGroup', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('Discussion_Repo', { screen: 'groups' });
  };

  const uploadImage = async (uri, imgName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(imgName);
    ref.put(blob);

    const test = await firebase.storage().ref(`/${imgName}`).getDownloadURL();
    setUrl(test);
    return test;
  };

  const handleUpload = async () => {
    const test1 = isPicked ? await uploadImage(image, imageName) : image;
    console.log(test1);
    setIsPicked(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ellipseRow}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: image || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png',
            }}
            style={{
              width: 75,
              height: 75,
              borderRadius: 200 / 2,
            }}
          />
        </TouchableOpacity>
        <View style={[styles.input1, props.style]}>
          <TextInput
            placeholder="Donnez un nom au groupe"
            style={styles.inputStyle}
            onChangeText={(text) => setGroupName(text)}
          />
        </View>
      </TouchableOpacity>
      {isPicked ? (
        <TouchableOpacity style={styles.violet} onPress={handleUpload}>
          <Text style={styles.caption}>Valider</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.imageText}>
          Appuyez sur le cercle pour changer l'image de profil
        </Text>
      )}
      <View style={styles.materialButtonViolet12Row}>
        <TouchableOpacity
          style={[styles.violet1, styles.materialButtonViolet12]}
          onPress={() => {
            navigation.navigate('Discussion_Repo', { screen: 'groups' });
          }}
        >
          <Text style={styles.caption}>{props.caption || 'Annuler'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.violet1, styles.materialButtonViolet1]}
          onPress={handleSent}
        >
          <Text style={styles.caption}>{props.caption || 'Creer'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 40,
    marginTop: 39,
    marginLeft: -262,
  },
  ellipse: {
    width: 98,
    height: 107,
  },
  input1: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    width: 300,
  },
  inputStyle: {
    color: '#000',
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: 'stretch',
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    paddingTop: 14,
    paddingBottom: 8,
  },
  violet: {
    height: 36,
    width: 100,
    marginTop: 26,
    marginLeft: 18,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
  },

  materialFixedLabelTextbox: {
    height: 43,
    width: 208,
    marginLeft: 15,
    marginTop: 54,
  },
  ellipseRow: {
    height: 107,
    flexDirection: 'row',
    marginTop: 45,
    marginLeft: 22,
    marginRight: 32,
  },
  violet1: {
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },

  materialButtonViolet12: {
    height: 48,
    width: 122,
  },
  materialButtonViolet1: {
    height: 48,
    width: 122,
    marginLeft: 49,
  },
  materialButtonViolet12Row: {
    height: 48,
    flexDirection: 'row',
    marginTop: 361,
    marginLeft: 39,
    marginRight: 43,
  },
  imageText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'rgba(255,0,0,0.5)',
  },
});

export default ConfGroup;
