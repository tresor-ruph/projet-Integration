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
                    Inscription rÃ©ussie !
                </Text>
                <Button
                title="Se connecter"
                onPress={()=>{this.submit()}}
                ></Button>
            </View>
        )
    }
}
export default Succes;