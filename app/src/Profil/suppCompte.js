/* eslint-disable eqeqeq */
import React from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';

class suppCompte extends React.Component {
  constructor() {
    super();
    this.state = {
      mail: '',
      motdepasse: '',
    };
  }
  submit() {
    var valeur = '';
    fetch(`https://help-recover-api.herokuapp.com/usersMM/${this.state.mail}`)
      .then((response) => response.json())
      .then((json) => {
        valeur = json;
      })
      .catch((error) => {
        console.log(error);
      });
    var bcrypt = require('bcryptjs');
    //bcrypt.compare(this.state.motdepasse, valeur[0].password)
    if (valeur[0].Mail == this.state.mail && bcrypt.compare(this.state.motdepasse, valeur[0].password)) {
      //valeur[0].password est à décodé
      const nodemailer = require('nodemailer');

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'HelpRecover2020@gmail.com',
          pass: 'gK6p2wm!d',
        },
      });

      var jwt = require('jsonwebtoken');
      var token = jwt.sign(
        {
          data: this.state.mail,
        },
        '8376806802b688bf4d8ab6dc2762d91e',
        {expiresIn: '1h'},
      );

      let mailOptions = {
        from: '"HelpRecover" <HelpRecover2020@gmail.com>',
        to: 'inconnu12345612@gmail.com',
        subject: 'Supprimer votre compte Help Recover',
        text: 'Supprimer votre compte Help Recover',
        html: `<p><b>Vous avez reçu cet email suite à votre volonté de supprimer votre compte Help Recover. Si vous souhaitez réellement supprimer votre compte, cliquez sur le lien suivant : <a href='http://localhost:3000/supp/${token}'>Cliquez ici pour supprimer complètement votre compte Help Recover.</a></b></p><p>Si ce n'est pas le cas, ignorez ce mail.</p>`,
      };

      try {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          //console.log("Message sent: %s", info.messageId);
          //console.log(req.body);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('erreur de supp de compte');
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>
          Afin de supprimer votre compte, veuillez introduire votre email et votre mot de passe. Vous recevrez un email
          de confirmation à l'adresse mail indiquée. L'email sera valide pendant 1h.
        </Text>
        <TextInput
          placeholder="Adresse mail"
          maxLength={50}
          onChangeText={(text) => {
            this.setState({mail: text});
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Mot de passe"
          maxLength={50}
          onChangeText={(text) => {
            this.setState({motdepasse: text});
          }}
          style={styles.textInput}
        />
        <Button
          title="Se désinscrire"
          onPress={() => {
            this.submit();
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {},
});
export default suppCompte;
