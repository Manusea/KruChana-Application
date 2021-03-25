import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Alert } from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const editSubject = () => {
    // subject = this.subject
    Alert.alert(subject)
}

class addSubject extends Component {

    constructor() {
        super();
    }
    
    render (){
      return (
        <ScrollView>
          <View style={styles.container}>
            <Image source={require("../img/math.png")} 
              style = {styles.picture}
              onPress={() => this.props.navigation.navigate('Make Name Exame')}
            />

            <Image source={require("../img/eng.png")} 
              style = {styles.picture}
              onPress={() => this.props.navigation.navigate('LinkToEng')}
            />

            <Image source={require("../img/sci.png")} 
              style = {styles.picture}
              onPress={() => this.props.navigation.navigate('LinkToScience')}
            />

            <Image source={require("../img/sw.png")} 
              style = {styles.picture}
              onPress={() => this.props.navigation.navigate('LinkToSoftwareProcess')}
            /> 

            <Image source={require("..//img/code.png")} 
              style = {styles.picture}
              onPress={() => this.props.navigation.navigate('LinkToCode')}
            />

          </View>
        </ScrollView>
      )
    }

}


const styles = StyleSheet.create({
    title: {
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      marginVertical: 10,
      marginBottom: 15,
    },
    loginButton: {
      marginVertical: 32,
    },
  
    container: {
      flex: 1,
      backgroundColor: '#E2FCFA', //color wallpaper
      alignItems: 'center',
      paddingHorizontal: 20, 
      paddingTop: 29
    },

    picture: {
      width: 300,
      height: 100,
      marginVertical: 15
    }
  });

  export default addSubject;