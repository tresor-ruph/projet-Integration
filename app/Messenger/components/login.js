import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;
    const requestOptions = {
      method: 'POST',
      headers: new Headers( {
          Accept: 'application/json',
           'content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*'
        }
        ),
      body: JSON.stringify(this.state)
  };

  try {
    fetch('http://localhost:3000/addUser', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
      console.log(this.state);
  } catch (error) {
    console.error(error);
  }  
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
