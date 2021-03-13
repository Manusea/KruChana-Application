import * as React from 'react';
import {useContext, Component} from 'react';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import {AuthContext} from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function homeScreenStudent({navigation}) {
  const {user, logout} = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Welcome Student </Text>
      <Text style={styles.head}>"{user.email}"</Text>

    
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Name Subject')}>
        <Text style={styles.loginButtonText}>
        TakeTest
        </Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.loginButtonText}>
        Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  welcome:{
    fontWeight: 'bold',
    fontSize:25,
    color: '#00B3B2',
  },
  head:{
    fontWeight: 'bold',
    fontSize:20,
    color: '#00B3B2',
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    marginBottom: 15,
  },
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#00CABA',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },
  logoutButton: {
    marginVertical: 10,
    backgroundColor: '#b53531',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize:20,
    padding: 15
  },


  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
});
