/* eslint-disable no-undef */
/* eslint-disable max-len */
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      textValue: ''
    };
  }
 
    onLogin = () => {
    // eslint-disable-next-line no-undef
    /*
    fetch(`http://localhost:3000/contacts/${username}`)
    .then(reponse => reponse.json())
    .then( json => {
      try{
        console.log(json);
        const name = json[0].Nom;
        const Id = json[0].Id
        const avatar = json[0].PhotoProfil
        setUserId(json[0].Id)
      
        const user = { Id, name, avatar };
        AsyncStorage.setItem('user', JSON.stringify(user));
        //props.navigation.navigate('HomeScreen', { userid: json[0].Id });
      }catch{
        handleTextValue('email non valide'); 
      }
      
    });*/
    

    //var t = this;
// eslint-disable-next-line no-undef
console.log(this.state.username);
console.log(this.state.password);
// eslint-disable-next-line no-undef
fetch('https://help-recover-api.herokuapp.com/login/', {
        method: 'POST',
        body: JSON.stringify({
          Mail: this.state.username,
          password: this.state.password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then(json => {
        // eslint-disable-next-line eqeqeq
        if (json.message == "entrée dans l'appli") {
            const Id = json.id;
            const user = { Id };

            AsyncStorage.setItem('id', JSON.stringify(json.id));
            AsyncStorage.setItem('user', JSON.stringify(user));
            this.setState({ password: '' });
            this.setState({ username: '' });
            this.props.navigation.navigate('HomeScreen', { userid: json.Id });
        // eslint-disable-next-line eqeqeq
        } else if (json.message == 'erreur de mot de passe') {
          this.setState({ textValue: 'mot de passe non valide' });
        } else {
          this.setState({ textValue: 'email non valide' });
        }
    });
  
   /* const { username, password } = this.state;
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
  }  */
  };
 handlePassword = (event) => {
  this.setState({ password: event.nativeEvent.text });
};
 handleUsername = (event) => {
  this.setState({ username: event.nativeEvent.text });
};

 test = () => {
// eslint-disable-next-line eqeqeq
if (this.state.textValue === '') {
  return <View />;
} 
  return <View style={styles.containerr}><View style={styles.rect}><Text style={styles.erreur}>{this.state.textValue}</Text></View></View>;
};
  render() {
    return (
      <View style={styles.container}>
        <TextInput
                  placeholder={'Username'}
                  
          onChange={this.handleUsername}
          style={styles.input}
          value={this.state.username}
        />
        <TextInput
           placeholder={'Password'}
         secureTextEntry
         value={this.state.password}
          onChange={this.handlePassword}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin}
        />
        <View style={styles.rect6}>
          <View style={styles.loremIpsumRow}> 
            <Text style={styles.loremIpsum} onPress={() => this.props.navigation.navigate('ReinitMdp')}>Mot de passe oublié ? Cliquez ici</Text>
          </View>
        </View>
        
        {this.test()}
    
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
  containerr: {
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: 161,
    height: 31
  },
  rect: {
    width: 161,
    height: 31,
    backgroundColor: 'rgba(255,0,0,1)'
  },
  erreur: {
    color: '#121212',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 7,
    marginLeft: 5

  },
  rect6: {
    marginTop: '15%',
    width: 328,
    height: 50,
    textAlign: 'center',
    flexDirection: 'row',
    marginLeft: '25%',
  },

  }
);
export default Login;
