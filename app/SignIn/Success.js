import React from 'react';
import { View, Button, Text } from "react-native";

class Succes extends React.Component {

    submit() {
        window.location.reload(true);
    }

    render() {
        return ( 
            <View>
                <Text>
                    Inscription reussie !
                </Text>
                <Button
                title="Se connecter"
                onPress={() => {this.submit()}}
                ></Button>
            </View>
        )
    }
}
export default Succes;
