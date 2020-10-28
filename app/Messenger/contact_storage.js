import AsyncStorage from '@react-native-community/async-storage';

const contactStorage = async (x) => {
    await AsyncStorage.getItem('contact').then((res) => {
        const contact = JSON.parse(res);
        for (let i = 0; i < contact.length; i++) {
          if (contact[i].Nom === x) {
            contact.splice(i, 1);
          }
        }
        AsyncStorage.setItem('contact', JSON.stringify(contact));
      }); 
};

export default contactStorage;
