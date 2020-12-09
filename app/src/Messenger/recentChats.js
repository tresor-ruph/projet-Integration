import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

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

    Array.from(recentChat).forEach((element) => {
      arr.push(
        <Contact
          key={i}
          name={element.Nom}
          imgUrl={element.PhotoProfil}
          repert={false}
          lastMess={element.descriptif}
          onNav={() =>
            navigation.navigate('Chat', {
              recieverId: element.recieverId,
              senderId: element.senderId,
              check: 'offre',
              //servId : serviceId,
              handleItem: (item) => {
                if (item === 'confOffre') {
                  setConfOffre(true);
                  setIdDem(element.recieverId);
                  setIdOffreur(element.senderId);
                  setIdServ(element.contact);
                  setIdNom(element.descriptif);
                }
                console.log(item);
              },
              handleItem2: (item2) => {
                console.log(item2);
              },
            })
          }
        />,
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
