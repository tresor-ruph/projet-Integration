/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Picker,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import OverlayExample from "./../Messenger/overlay";

let userId = " ";
class ListeDem extends React.Component {
  click_MesDem = () => {
    this.props.navigation.navigate("mesDemandes");
  };
  constructor(props) {
    super(props);
    this.state = {
      demande: [],
      filtre: "all",
      codeP: "",
      confOffre: false,
      idDem: " ",
      idOffre: " ",
      idNom: " "
    };
  }

  submit() {
    this.componentDidMount();
  }

  componentDidMount() {
    async function getUser() {
      userId = await AsyncStorage.getItem("user");
      userId = JSON.parse(userId).Id;
    }
    getUser();
    console.log(this.state.codeP);
    console.log(this.state.filtre);
    if (
      (this.state.filtre === "all") & (this.state.codeP === "") ||
      this.state.codeP == NaN
    ) {//mettre ici ip pc et puis localhost ou 192.168.1.55
      fetch("http://192.168.1.55:3000/demande/all")
        .then((response) => response.json())
        .then((json) => {
          this.setState({ demande: json });
        });
    } else if (this.state.codeP === "") {
      fetch(`http://192.168.1.55:3000/demandeCat/'${this.state.filtre}'/`)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ demande: json });
          console.log(json);
          console.log(this.state.demande);
        });
    } else if (this.state.filtre === "all") {
      fetch(`http://192.168.1.55:3000/demandeCode/'${this.state.codeP}'/`)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ demande: json });
          console.log(json);
          console.log(this.state.demande);
        });
    } else {
      fetch(
        `http://192.168.1.55:3000/demande/'${this.state.filtre}'/'${this.state.codeP}'/`
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({ demande: json });
          console.log(json);
          console.log(this.state.demande);
        });
    }
  }

  updateFiltre = (filtre) => {
    this.setState({ filtre });
    console.log(this.state.filtre);
  };

  modifietext(text) {
    const myCode = parseInt(text);
    this.setState({ codeP: myCode });
  }

  submitId(idRecu, idDem) {
    console.log(idRecu);
    console.log(idDem);
  }

  render() {
    return (
      <View>
        {this.state.confOffre && (
          <OverlayExample
            idDem={this.state.idDem}
            idOffre={this.state.idOffre}
            userId={userId}
            descrip={this.state.idNom}
          />
        )}
        <View style={{ flexDirection: "row" }}>
          <Picker
            style={styles.picks}
            selectedValue={this.state.filtre}
            onValueChange={this.updateFiltre}
          >
            <Picker.Item label="Aller faire des courses" value="Courses" />
            <Picker.Item label="Aller chercher un colis" value="Colis" />
            <Picker.Item
              label="Aller chercher les enfants"
              value="Récupérer une personne"
            />
            <Picker.Item label="Aller faire des lessives" value="Lessive" />
            <Picker.Item label="Autres" value="Autres" />
            <Picker.Item label="Tout" value="all" />
          </Picker>
          <TextInput
            onChangeText={(text) => {
              this.modifietext(text);
            }}
            style={styles.inputt}
          />
        </View>
        <View style={styles.boutonTri}>
          <Button
            title="Filtrer"
            onPress={() => {
              this.submit();
            }}
          ></Button>
        </View>
        <View style={styles.boutonDem}>
          <Button
            color="green"
            title="Mes demandes"
            onPress={this.click_MesDem}
          ></Button>
        </View>

        {this.state.demande.reverse().map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar
              onPress={() =>
                this.props.navigation.navigate("checkProfil", {
                  id: l.userId,
                  nom: l.Nom,
                  prenom: l.Prenom,
                })
              }
              size={70}
              source={{ uri: l.PhotoProfil }}
            />
            <ListItem.Content>
              <ListItem.Title>
                {l.Prenom} {l.Nom}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.descri}>
                {l.categorie}
              </ListItem.Subtitle>
              <ListItem.Subtitle>{l.descriptif}</ListItem.Subtitle>
              <View style={styles.boutsss}>
                <Button
                  title="Chat"
                  onPress={() =>{
                    AsyncStorage.setItem("serv", JSON.stringify(l.idDemande),(err,res)=>{
                      if(err){
                        console.log(error)
                      }else {
                        console.log("value set")
                      }
                    })
                    this.props.navigation.navigate("Chat", {
                      senderId: userId,
                      recieverId: l.userId,
                      iddem: l.idDemande,
                      check: "offre",
                      handleItem: (item) => {
                          this.setState({
                          confOffre: true,
                          idDem: l.userId,
                          idOffre: l.idDemande,
                          idNom: l.descriptif
                        });
                        console.log(item);
                      },
                    })
                  }
                  }
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picks: {
    width: "70%",
    marginTop: "1%",
    // float: 'left'
  },

  boutsss: {
    width: "100%",
  },

  boutonDem: {
    width: "100%",
    marginTop: "1%",
  },

  boutonTri: {
    marginTop: "1%",
    width: "100%",
  },

  inputt: {
    width: "29%",
    height: "83%",
    marginTop: "1%",
    marginLeft: "1%",
    borderWidth: 1,
    borderColor: "#20232a",
    textAlign: "center",
  },

  descri: {
    fontWeight: "bold",
  },

  mesde: {
    fontSize: 15,
    left: 25,
    width: 130,
    height: 20,
    backgroundColor: "rgba(128,255,255,1)",
    borderRadius: 20,
  },
});

export default ListeDem;
