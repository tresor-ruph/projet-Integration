import { StyleSheet, View, Text, TextInput,TouchableOpacity } from "react-native";
import React from 'react';






class Reinit extends React.Component{

    constructor(props){
        super(props);
        this.state={
            mail:"",
            emails:[],
        }
    }  

    submit() {

        this.componentDidMount();

        //envoie msg d'erreur si un champ est encore vide
        if(this.state.mail == '') {
          let simpleAlertHandler = () => {
            alert("Entrez votre e-mail");
          };
          simpleAlertHandler();
          return;
        }

        

        if(this.state.mail.includes('@') == false || this.state.mail.includes('.') == false) {
            let simpleAlertHandler = () => {
              alert("Adresse mail incorrecte !");
            };
            simpleAlertHandler();
            return;
          } 
          
        for(let i=0; i<this.state.emails.length;i++){
            
            if (this.state.mail != this.state.emails[i].Mail){
                console.log("mail inconnu")
            }
            else{
                this.props.navigation.navigate("ReinitMdpP2",{email: this.state.mail})
                console.log(this.state.mail)
            }
        }
       
    }

    componentDidMount(){
        

      fetch(`http://localhost:3000/reinitmdpAll/`)
          .then(response => response.json())
          .then(json => {
            this.setState({emails: json})
            
          })
    }

            
    render() {
        return(
        
            <View style={styles.container}>
                <Text style={styles.Text1}>Completez les champs suivants afin de réinitialiser votre mot de passe</Text>
                <Text style={styles.Text2}>E-mail</Text>
                <TextInput
                    onChangeText={(text)=>{this.setState({mail:text})}}
                    icon='mail'
                    autoCompleteType='email'
                    placeholder='Entrez votre adresse e-mail'
                    inputStyle="Mail"
                    maxLength={50}
                    style={styles.Input}>
                </TextInput>
                
                <TouchableOpacity style={styles.Bout} onPress={()=>{this.submit()}}>

                    <Text style={styles.TextBout}> Reinitialiser mot de passe  </Text>

                </TouchableOpacity>
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


export default Reinit;