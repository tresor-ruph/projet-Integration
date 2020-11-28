import React from 'react';
import { View, Button, Text, StyleSheet } from "react-native";

class Succes extends React.Component {

    submit() {
        window.location.reload(true);
    }

    render() {
        return ( 
            <View>
                <Text style={styles.text}>
                    Inscription reussie et en attente de validation ! Pour confirmer l'inscription, cliquez sur le lien dans l'email de confirmation que vous avez reçu de helprecover2020@gmail.com. Vous pourrez ensuite vous connecter via le bouton ci-dessous.
                </Text>
                <Button
                title="Se connecter"
                onPress={() => {this.submit()}}
                ></Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        margin: 10,
        fontSize: 20,
    },
})
export default Succes;
