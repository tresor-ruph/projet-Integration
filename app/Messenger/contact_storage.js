import AsyncStorage from '@react-native-community/async-storage';

const contactStorage = async (x) => {
  let cont = await AsyncStorage.getItem('contact');
  cont = JSON.parse(cont);
const cont2 = Array.from(cont).filter((elt) => elt.Id !== x)
AsyncStorage.setItem('contact', JSON.stringify(cont2));


};

export default contactStorage;
