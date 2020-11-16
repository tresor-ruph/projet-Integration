import { StyleSheet, View, Text, TextInput,TouchableOpacity, Button } from "react-native";
import React from 'react';






let quest = 0
class ReinitMdp2 extends React.Component{

    constructor(route,props){
        super(route,props);
        this.state={
            donnees:[],
            mail:route.route.params.email,
            questionSec:"",
            reponseSec:"",
            motdepasse:"",
            motdepasseVerif:'',
        };

     
          
    }  

    
    submit() {

        this.componentDidMount();
        
        if( this.state.reponseSec == '' || this.state.motdepasse == '' || this.state.motdepasseVerif == '' ) {
          let simpleAlertHandler = () => {
            alert("Tous les champs ne sont pas remplis !");
          };
          simpleAlertHandler();
          return;
        }

        if(this.state.motdepasse != this.state.motdepasseVerif) {
            let simpleAlertHandler = () => {
              alert("Les mots de passes ne correspondent pas !");
            };
            simpleAlertHandler();
            return;
          }
          //envoie msg d'erreur si le mdp est < 8 OU ne contient pas de chiffre OU ne contient pas de majuscule
        if(this.state.motdepasse.length < 8 || this.state.motdepasse.match(/\d+/) == null || this.state.motdepasse == this.state.motdepasse.toLowerCase()) {
            let simpleAlertHandler = () => {
              alert("Le mot de passe n'est pas suffisament compliqué !");
            };
            simpleAlertHandler();
            return;
          }    
          
    }

    submit22(){
      this.forceUpdate()
    }

    submit23(){
      if(quest = 0){
        this.forceUpdate()
      }
      quest += 1
    }

    componentDidMount(){
        fetch(`http://localhost:3000/reinitmdpR/${this.state.mail}`)
          .then(response => response.json())
          .then(json => {
            this.setState({donnees: json})
            this.state.questionSec=json[0].QuestionValue
            quest = json[0].QuestionValue
            console.log(this.state.donnees)
            console.log(this.state.questionSec)
            
          })
          this.forceUpdate()
        }
  
    render() {
        return(
            <View style={styles.container}>
              <Button color='green' title='verif' onPress={() => {this.submit22()}}></Button>
                <Text style={styles.Text1}>Completez les champs suivants afin de réinitialiser votre mot de passe</Text>
                <Text style={styles.Text2}>Votre question secrète</Text>
                <Text>{this.state.questionSec}</Text>
                <Text style={styles.Text2}>Réponse secrète</Text>
                <TextInput
                    onChangeText={(text)=>{this.setState({reponseSec:text})}}
                    placeholder='Entrez votre reponse secrete'
                    maxLength={50}
                    style={styles.Input}>
                </TextInput>
                <Text style={styles.Text2}>Nouveau mot de passe</Text>
                <TextInput
                    onChangeText={(text)=>{this.setState({motdepasse:text})}}
                    placeholder='Entrez votre nouveau mot de passe'
                    maxLength={50}
                    secureTextEntry={true}
                    style={styles.Input}>
                </TextInput>
                <Text style={styles.Text2}>Confirmez votre mot de passe</Text>
                <TextInput
                    onChangeText={(text)=>{this.setState({motdepasseVerif:text})}}
                    placeholder='Vérifiez votre nouveau mot de passe'
                    maxLength={50}
                    secureTextEntry={true}
                    style={styles.Input}>
                </TextInput>
                <TouchableOpacity style={styles.Bout} onPress={()=>{this.submit()}}>

                    <Text style={styles.TextBout}> Reinitialiser mot de passe  </Text>

                </TouchableOpacity>
                {this.submit23()}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    Text1: {
        fontSize: '130%',
        marginLeft:'7%',
        marginTop:'5%',
        marginBottom:'3%',
        width:'90%'
    },
    Text2: {
        fontSize: '120%',
        marginLeft:'7%',
        marginTop:'2%',
        width:'90%',
        textAlign:'center'
    },

    Input: {
        marginLeft:'5%',
        width:'90%',
        marginTop:'5%',
        marginBottom:'5%',
        height:'10%',
        fontSize:'120%',
        borderWidth:1,
        borderColor: "#20232a",
        borderRadius:10
    },

    Bout: {
        width: '80%',
        height : '16%',
        backgroundColor:'rgb(0, 150, 136)',
        borderRadius:20,
        marginLeft: '10%', 
        marginTop:'3%'
      },

    TextBout: {
        color: '#FFF',
        fontSize: 30,
        textAlign: 'center',
        marginTop: '10%',
    }

});


export default ReinitMdp2;