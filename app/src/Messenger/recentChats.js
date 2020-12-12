import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {ListItem, Avatar} from 'react-native-elements';

import Contact from './contact';
import OverlayExample from './overlay';

function RecentChat() {
  const [recentChat, setRecent] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [confOffre, setConfOffre] = useState(false);
  const [idDem, setIdDem] = useState('');
  const [idOffreur, setIdOffreur] = useState('');
  const [idServ, setIdServ] = useState('');
  const [idNom, setIdNom] = useState(' ');

  useEffect(() => {
    const getId = async () => {
      let id = await AsyncStorage.getItem('user');
      id = JSON.parse(id).Id;

      //setUserId(id);

      fetch(`https://help-recover-api.herokuapp.com/chatconv/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setRecent(json);
          console.log(json);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getId();
  }, [isFocused]);

  function renderScreen() {
    const arr = [];
    let i = 0;

    Array.from(recentChat).forEach((elt) => {
      arr.push(
        <ListItem
          key={elt.Id}
          bottomDivider
          onPress={() =>
            navigation.navigate('Chat', {
              recieverId: elt.recieverId,
              senderId: elt.senderId,
              check: 'offre',
              //servId : serviceId,
              handleItem: (item) => {
                if (item === 'confOffre') {
                  setConfOffre(true);
                  setIdDem(elt.recieverId);
                  setIdOffreur(elt.senderId);
                  setIdServ(elt.contact);
                  setIdNom(elt.descriptif);
                }
                console.log(item);
              },
              handleItem2: (item2) => {
                console.log(item2);
              },
            })
          }>
          <Avatar source={{uri: elt.PhotoProfil}} size="meduim" rounded />
          <ListItem.Content>
            <ListItem.Title>{elt.Nom}</ListItem.Title>
            <ListItem.Subtitle>{elt.descriptif}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>,
      );
      ++i;
    });

    return <View>{arr}</View>;
  }
  return (
    <View>
      {confOffre && <OverlayExample idDem={idDem} idOffre={idServ} userId={idOffreur} descrip={idNom} />}
      {renderScreen()}
    </View>
  );
}

export default RecentChat;
