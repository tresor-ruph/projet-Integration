import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';


class catalogue extends Component {
    state = { users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Claire' },
        { id: 4, name: 'David' },
      ] }
      render() {
        return (
          <Text>Bonjour, {this.state.users[0].id}</Text>
        );
      }
}
export default catalogue;
