import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";


class Succes extends React.Component {

    submit() {
        window.location.reload(true);
    }

    render() {
        return( 
            <View>
                <Text>
                   {/*Email envoyé ! Cliquer sur le lien contenu dans le mail pour finaliser votre inscription !*/}
                    Inscription Réussie !
                </Text>
                <Button
                title="Se connecter" //Envoyer
                onPress={()=>{this.submit()}}
                ></Button>
            </View>
        )
    }
}
export default Succes;