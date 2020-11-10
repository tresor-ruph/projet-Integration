import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text,Button, Modal } from "react-native";



const Test = (props) => {
const navigation = useNavigation()
    return (
        <View>
           {console.log(props.id)}
            <Button
            title= 'test'
            onPress = {() => navigation.navigate('ChatOption')}
            ></Button>
        </View>
    )
}

export default Test;