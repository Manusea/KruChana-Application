import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {StudentChooseButton} from '../components/StudentChooseButton';

import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';

class exam extends Component {

    constructor() { 
        super();

        this.fireStoreData = firestore().collection('subject_Math').doc('Name').collection('Name')
    this.state = {
      userArr: [],
      buttonName: ''
    };
    }
    componentDidMount() {
      this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
    }
    
    inputValueUpdate = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
      const userArr = [];
      querySnapshot.forEach((res) => {
        const {name} = res.data();
        userArr.push({
          key: res.id,
          res,
          name,
        });
      });
      this.setState({
        userArr,
      });
    };

    render (){
      
      return (
        <ScrollView style={styles.bg}>
          <View style={styles.container}>
          {this.state.userArr.map((item, i) => {
          return (
                <StudentChooseButton
                  title={item.name}
                  onPress={() => {
                    this.props.navigation.navigate('Math Chat', {text: item.name});
                  }}
                />

          );
        })}

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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom: 100
  
    },
    bg: {
      backgroundColor: '#E2FCFA'
    }
  });

  export default exam;