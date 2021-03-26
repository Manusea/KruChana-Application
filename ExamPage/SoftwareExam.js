import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

let arrayDictStudents = [];
let score = [];
let outPutScore = 0;
let tempQuestion = [];
let time;


function FinishTest() {
  score = score.filter(function (item) {
    return item == 'Correct';
  });
  outPutScore = score.length;
  console.log(outPutScore);
  alert("Your Score : " + outPutScore);
  score = [];
  tempQuestion = [];
}


function ScoreSystem(eachStudent, awnser) {

  if (!(tempQuestion.includes(eachStudent["question"]))) {
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
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleEachChoice(array) {
  var arrayChoiceIndex = ["choice1", "choice2", "choice3", "choice4"];
  shuffle(arrayChoiceIndex);

  for (var i = 0; i < array.length; i++){
    var temp1 = array[i][arrayChoiceIndex.pop()], temp2 = array[i][arrayChoiceIndex.pop()], temp3 = array[i][arrayChoiceIndex.pop()], temp4 = array[i][arrayChoiceIndex.pop()];

    arrayChoiceIndex = ["choice1", "choice2", "choice3", "choice4"]
    shuffle(arrayChoiceIndex);

    array[i][arrayChoiceIndex.pop()] = temp1;
    array[i][arrayChoiceIndex.pop()] = temp2;
    array[i][arrayChoiceIndex.pop()] = temp3;
    array[i][arrayChoiceIndex.pop()] = temp4;

    arrayChoiceIndex = ["choice1", "choice2", "choice3", "choice4"]
    shuffle(arrayChoiceIndex);
  }
  
  return array;
}

class StudentTakeTest extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      students: arrayDictStudents,
      userArr: [],

    }
    this.onPressButton = this.onPressButton.bind(this);
  }

  onSelect(index, value, eachStudent) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
    ScoreSystem(eachStudent, value)
  }

  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { ans, choice1, choice2, choice3, choice4, question, timer } = res.data();
      const { chat, name } = res.data();
      userArr.push({
        key: res.id,
        res,
        ans,
        choice1,
        choice2,
        choice3,
        choice4,
        question,
        chat,
        name,
        timer
      })
    })
    this.setState({
      userArr
    })
  }

  storeUser() {
    this.usersCollectionRef.add({
      chat: this.state.chat,
      name: this.context.user.email,
      score: outPutScore,
      timestamp: firestore.FieldValue.serverTimestamp()
    }).then((res) => {
      this.setState({
        chat: '',
        name: ''
      })
    })
      .catch((err) => {
        console.log('Error found: ', err);
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    if (arrayDictStudents.length != 0) {
      arrayDictStudents = [];
    }
    const { text, timer } = this.props.route.params
    console.log({ text }.text)
    time = { timer }.timer
    this.fireStoreData = firestore().collection("subject_Software").doc({ text }.text).collection('Exam');
    this.usersCollectionRef = firestore().collection("subject_Software").doc({ text }.text).collection('score');

    {
      this.state.userArr.map((item, i) => {
        arrayDictStudents.push({
          ans: item.ans,
          choice1: item.choice1,
          choice2: item.choice2,
          choice3: item.choice3,
          choice4: item.choice4,
          question: item.question,
          timer: item.timer
        }
        )

      })


      shuffle(arrayDictStudents); // random choice
      shuffleEachChoice(arrayDictStudents); // random each choice

    }

    return (
      <View>
        {/*Timer*/}
        <CountDown
          size={30}
          until={Number(time)*60}
          onFinish={this.onPressButton}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: '#0E6655',
          }}
          digitTxtStyle={{ color: '#0E6655' }}
          timeLabelStyle={{ color: 'black', fontWeight: 'bold' }}
          separatorStyle={{ color: '#0E6655' }}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{ h: "Hr", m: "Min", s: "Sec" }}
          showSeparator
        />
        <Button
          title="chat"
          onPress={() => {
            this.props.navigation.navigate('Chat Software', { text: { text }.text });
          }}
        />


        <ScrollView>
          <View style={styles.container}>
            {this.state.students.map(eachStudent => (
              <>
                <Text style={styles.text_head}>
          
                  {eachStudent.question}
                </Text>

                <RadioGroup
                  size={40}
                  thickness={4}
                  color='#00CABA'
                  highlightColor='#97FFDA'
                  onSelect={(index, value) => this.onSelect(index, value, eachStudent)}
                >

                  <RadioButton value={eachStudent.choice1}>
                    <Text style={styles.text_choice}>{eachStudent.choice1}</Text>
                  </RadioButton>
                  <RadioButton value={eachStudent.choice2}>
                    <Text style={styles.text_choice}>{eachStudent.choice2}</Text>
                  </RadioButton>
                  <RadioButton value={eachStudent.choice3}>
                    <Text style={styles.text_choice}>{eachStudent.choice3}</Text>
                  </RadioButton>
                  <RadioButton value={eachStudent.choice4}>
                    <Text style={styles.text_choice}>{eachStudent.choice4}</Text>
                  </RadioButton>
                </RadioGroup>

                <Text>
                  {"\n"}
                </Text>

              </>

            ))}

            <TouchableOpacity style={styles.button_sub} onPress={this.onPressButton} >
              <Text style={styles.text_sub}>
                Summit
                </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>

    );
  }
  onPressButton() {
    const { navigate } = this.props.navigation;
    FinishTest();
    this.storeUser();
    navigate('Home Student');
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

  text: {
    fontWeight: 'bold',
    padding: 20,
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
    justifyContent: 'center',
    paddingBottom: 200,

  },

  button_sub: {

    alignItems: "center",
    backgroundColor: "#0E6655",
    padding: 20,
  },
  text_head: {
    fontWeight: 'bold',
    padding: 20,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#00CABA',

  },
  text_choice: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  text_sub: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',

  }
});


export default StudentTakeTest;