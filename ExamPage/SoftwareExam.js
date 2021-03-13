import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

let arrayDictStudents = [];
let score = [];
let outPutScore = 0;
let tempQuestion = [];


function FinishTest(){
  score = score.filter(function (item) {
    return item == 'Correct';
  });
  outPutScore = score.length;
  console.log(outPutScore);
  alert("Your Score : " + outPutScore);
  score = [];
  outPutScore = 0;
  tempQuestion = [];
}


function ScoreSystem(eachStudent, awnser){
  if (!(tempQuestion.includes(eachStudent["question"]))){
    tempQuestion.push(eachStudent["question"]);
    score.push("None");

    if (awnser == eachStudent["ans"]) {
      score.splice(tempQuestion.indexOf(eachStudent["question"]), 1, 'Correct');
    } else {
      score.splice(tempQuestion.indexOf(eachStudent["question"]), 1, 'Uncorrect');
    }
  } else {
    if (awnser == eachStudent["ans"]) {
      score.splice(tempQuestion.indexOf(eachStudent["question"]), 1, 'Correct');
    } else {
      score.splice(tempQuestion.indexOf(eachStudent["question"]), 1, 'Uncorrect');
    }
  }
  console.log(score);
}

class StudentTakeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students : arrayDictStudents,
      userArr: []
    }
  }

  onSelect(index, value){
    this.setState({
    text: `Selected index: ${index} , value: ${value}`})
  }
  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const {ans, choice1, choice2, choice3, choice4, question} = res.data();
      userArr.push({
        key: res.id,
        res,
        ans,
        choice1,
        choice2,
        choice3,
        choice4,
        question
      })
    })
    this.setState({
      userArr
    })
  }

  render() {
    if (arrayDictStudents.length != 0){
      arrayDictStudents = [];
    }
    const {text} = this.props.route.params
    console.log({text}.text)
    this.fireStoreData = firestore().collection("subject_SoftWare").doc({text}.text).collection('Exam');
    
    {
      this.state.userArr.map((item, i) => {
        arrayDictStudents.push({
              ans: item.ans,
              choice1: item.choice1,
              choice2: item.choice2,
              choice3: item.choice3,
              choice4: item.choice4,
              question: item.question
            }
            )

      })
      console.log(arrayDictStudents);
    }

    return (
      <ScrollView>
      <View style={styles.container}>
        {this.state.students.map(eachStudent => (
            <>
          <Text style={styles.text_head}>
            {console.log(eachStudent)           /*console log this*/} 
            {eachStudent.question}
          </Text> 

          <RadioGroup 
          size={40}
          thickness={4}
          color='#00CABA'
          highlightColor='#97FFDA'
          onSelect = {(index, value) => this.onSelect(index, value, eachStudent)}
          >

              <RadioButton value={1}>
                  <Text style={styles.text_choice}>{eachStudent.choice1}</Text>
              </RadioButton>
              <RadioButton value={2}>
                  <Text style={styles.text_choice}>{eachStudent.choice2}</Text>
              </RadioButton>
              <RadioButton value={3}>
                  <Text style={styles.text_choice}>{eachStudent.choice3}</Text>
              </RadioButton>
              <RadioButton value={4}>
                  <Text style={styles.text_choice}>{eachStudent.choice4}</Text>
              </RadioButton>
          </RadioGroup>

          <Text>
            {"\n"}
          </Text>

          </>
          
        ))}

      <TouchableOpacity style={styles.button_sub} onPress={()=>{FinishTest()}}>
            <Text style={styles.text_sub}>
              Summit
            </Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    );
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
      backgroundColor: '#E2FCFA',
      justifyContent: 'center',
      paddingBottom:200,
  
    },

    button_sub: {
      
      alignItems: "center",
      backgroundColor: "#0E6655",
      padding: 20,
    },
    text_head:{
      fontWeight: 'bold',
      padding: 20,
      fontSize: 25,
      textAlign: 'center',
      backgroundColor: '#00CABA',
      
    },
    text_choice:{
      fontSize: 20,
      paddingHorizontal: 20,
    },
    text_sub:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFF',

    }
  });


  export default StudentTakeTest;