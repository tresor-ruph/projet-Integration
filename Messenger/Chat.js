import React from 'react';
import { View , Text} from 'react-native';
// 1.
import { GiftedChat } from 'react-native-gifted-chat';
class Chat extends React.Component {
  state = {
    messages: [],
  };
  // 2.
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });
  // 3.
  
 
  render() {
    // 4.
    return (  
      <GiftedChat
        messages={this.state.messages}
      />
    
    );
  }
}

export default Chat;