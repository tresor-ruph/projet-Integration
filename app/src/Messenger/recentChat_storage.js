import AsyncStorage from '@react-native-community/async-storage';

const RecentChatStorage = async () => {
  const recentChats = await AsyncStorage.getItem('recentChats');
  return recentChats;
};

export default RecentChatStorage;
