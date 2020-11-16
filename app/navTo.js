import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function NavTo(props) {
  const [dest, setDest] = useState(props.dest);
  const [opt, setOpt] = useState(props.opt);
  const navigation = useNavigation();

  const test = () => {
    console.log("heheh");
    navigation.navigate(dest, opt);
  };

  return test();
}



export default NavTo;
