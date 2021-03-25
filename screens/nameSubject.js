import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Alert, ToutchableOpacity } from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class sub extends Component {

    constructor() {
        super();

    }

    render (){
      return (
        <ScrollView>
          <View style={styles.container}>
            
            <Image source={require("../img/math.png")} 
                    style = {styles.picture}
                    onPress={() => this.props.navigation.navigate('subject_Math')}
            />

            <Image source={require("../img/eng.png")} 
                    style = {styles.picture}
                    onPress={() => this.props.navigation.navigate('subject_Eng')}
            />

            <Image source={require("../img/sci.png")} 
                    style = {styles.picture}
                    onPress={() => this.props.navigation.navigate('subject_Science')}
            />

            <Image source={require("../img/sw.png")} 
                    style = {styles.picture}
                    onPress={() => this.props.navigation.navigate('subject_SoftWare')}
            />

            <Image source={require("../img/code.png")} 
                    style = {styles.picture}
                    onPress={() => this.props.navigation.navigate('subject_Code')}
            />
            
          </View>
        </ScrollView>
      )
    }

}


const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#E2FCFA',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 29,
     
    },

    picture: {
      width: 300 ,
      height: 100,
      marginVertical: 15
      
    }


  });

  export default sub;