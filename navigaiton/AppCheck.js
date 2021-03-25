import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore'; 

import HomeTeacher from '../screens/homeScreenTeacher';
import MakeQuestion from '../screens/makeQuestionScreen';
import HomeStudent from '../screens/homeScreenStudent';
import MakeSubject from '../screens/makeSubjectScreen';
import studentScore from '../screens/studentScore';
import NameExame from '../screens/nameExam';
import Subject from '../screens/nameSubject';


import subject_Code from '../SubjectStudentChoose/Code';
import subject_Eng from '../SubjectStudentChoose/Eng';
import subject_Science from '../SubjectStudentChoose/Science';
import subject_SoftWare from '../SubjectStudentChoose/SoftwareProcess'

import MathExam from '../ExamPage/MathExam';
import CodeExam from '../ExamPage/CodeExam';
import EngExam from '../ExamPage/EngExam';
import ScienceExam from '../ExamPage/ScienceExam';
import SoftwareExam from '../ExamPage/SoftwareExam';


import LinkToMath from '../NavToExame/LinkToMath';
import LinkToCode from '../NavToExame/LinkToCode';
import LinkToEng from '../NavToExame/LinkToEng';
import LinkToScience from '../NavToExame/LinkToScience';
import LinkToSoftware from '../NavToExame/LinkToSoftware';

import Math from '../Subject/Math';
import Code from '../Subject/Code'; 
import Science from '../Subject/Science';
import Eng from '../Subject/English';
import Software from '../Subject/SoftwareProcess'

import ChatTeacher from '../screens/chatTeacher'
import ChatStudent from '../screens/chatStudent'

import ChatMath from '../StudentExamChat/mathChat'
import ChatEnglish from '../StudentExamChat/englishChat'
import ChatScience from '../StudentExamChat/scienceChat'
import ChatSoftware from '../StudentExamChat/softwareChat'
import ChatCode from '../StudentExamChat/codeChat'

import NameExamChat from '../TeacherExamChat/NameExamChat';
import NameMathChat from '../TeacherExamChat/NameMathChat';
import NameEnglishChat from '../TeacherExamChat/NameEnglishChat';
import NameScienceChat from '../TeacherExamChat/NameScienceChat';
import NameSoftwareChat from '../TeacherExamChat/NameSoftwareChat';
import NameCodeChat from '../TeacherExamChat/NameCodeChat';

import MathChat from '../TeacherExamChat/MathChat';
import EnglishChat from '../TeacherExamChat/EnglishChat';
import ScienceChat from '../TeacherExamChat/ScienceChat';
import SoftwareChat from '../TeacherExamChat/SoftwareChat';
import CodeChat from '../TeacherExamChat/CodeChat';

import toScoreEng from '../scoreSubject/eng';
import toScoreMath from '../scoreSubject/math';
import toScoreSoftWare from '../scoreSubject/software';
import toScoreCode from '../scoreSubject/code';
import toScorescience from '../scoreSubject/science';

import scoreCode from '../showScorePage/code';
import scoreEng from '../showScorePage/eng';
import scoreMath from '../showScorePage/math';
import scoreScience from '../showScorePage/science';
import scoreSoftware from '../showScorePage/software';


const Stack = createStackNavigator();
var teacher = null;
const list = [];
const loopdata = (user) => {
  list.map((each) => {
    if (each.Email == user.email && each.Teacher) {
      teacher = true;
    } else if (each.Email == user.email && !each.Teacher) {
      teacher = false;
    }
  });
};

export default function checkRoleScreen() {
  const {user} = useContext(AuthContext);
  const [Email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await firestore()
          .collection('Users')
          .get()
          .then((querySnapshot) => {
            // console.log('Total Users: ',querySnapshot.size)
            querySnapshot.forEach((doc) => {
              const {Email, Teacher} = doc.data();
              list.push({
                id: doc.id,
                Email,
                Teacher,
              });
            });
          });

        setEmail(list);
        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  

  loopdata(user);

  return teacher ? (
    <>
      <Stack.Navigator initialRouteName="HomeTeacher">
        <Stack.Screen name="HomeTeacher" component={HomeTeacher} />
        <Stack.Screen name="MakeSubject" component={MakeSubject} />
        <Stack.Screen name="MakeQuestion" component={MakeQuestion}/>
        <Stack.Screen name="studentScore" component={studentScore}/>


        <Stack.Screen name="Make Name Exame" component={LinkToMath}/>
        <Stack.Screen name="LinkToCode" component={LinkToCode}/>
        <Stack.Screen name="LinkToEng" component={LinkToEng}/>
        <Stack.Screen name="LinkToScience" component={LinkToScience}/>
        <Stack.Screen name="LinkToSoftwareProcess" component={LinkToSoftware}/>

        <Stack.Screen name="Math" component={Math}/>
        <Stack.Screen name="Code" component={Code}/>
        <Stack.Screen name="Science" component={Science}/>
        <Stack.Screen name="Eng" component={Eng}/>
        <Stack.Screen name="Software" component={Software}/>

        <Stack.Screen name="Chat Teacher" component={ChatTeacher}/>
        <Stack.Screen name="Name Exam Chat" component={NameExamChat}/>

        <Stack.Screen name="toScoreEng" component={toScoreEng}/>
        <Stack.Screen name="toScoreMath" component={toScoreMath}/>
        <Stack.Screen name="toScoreSoftWare" component={toScoreSoftWare}/>
        <Stack.Screen name="toScoreCode" component={toScoreCode}/>
        <Stack.Screen name="toScorescience" component={toScorescience}/>


        <Stack.Screen name="scoreCode" component={scoreCode}/>
        <Stack.Screen name="scoreEng" component={scoreEng}/>
        <Stack.Screen name="scoreMath" component={scoreMath}/>
        <Stack.Screen name="scoreScience" component={scoreScience}/>
        <Stack.Screen name="scoreSoftware" component={scoreSoftware}/>

        <Stack.Screen name="Name Math Chat" component={NameMathChat}/>
        <Stack.Screen name="Name English Chat" component={NameEnglishChat}/>
        <Stack.Screen name="Name Science Chat" component={NameScienceChat}/>
        <Stack.Screen name="Name Software Chat" component={NameSoftwareChat}/>
        <Stack.Screen name="Name Code Chat" component={NameCodeChat}/>

        <Stack.Screen name="Math Chat" component={MathChat}/>
        <Stack.Screen name="English Chat" component={EnglishChat}/>
        <Stack.Screen name="Science Chat" component={ScienceChat}/>
        <Stack.Screen name="Software Chat" component={SoftwareChat}/>
        <Stack.Screen name="Code Chat" component={CodeChat}/>

      </Stack.Navigator>
    </>
  ) : (
    <>
      <Stack.Navigator initialRouteName="HomeStudent">
        <Stack.Screen name="Home Student" component={HomeStudent}/>
        <Stack.Screen name="Name Subject" component={Subject} />
        <Stack.Screen name="Name Exame" component={NameExame} />

        <Stack.Screen name="subject_Code" component={subject_Code}/>
        <Stack.Screen name="subject_Eng" component={subject_Eng}/>
        <Stack.Screen name="subject_Science" component={subject_Science}/>
        <Stack.Screen name="subject_SoftWare" component={subject_SoftWare}/>

        <Stack.Screen name="MathExam" component={MathExam} />
        <Stack.Screen name="CodeExam" component={CodeExam}/>
        <Stack.Screen name="EngExam" component={EngExam}/>
        <Stack.Screen name="ScienceExam" component={ScienceExam}/>
        <Stack.Screen name="SoftwareExam" component={SoftwareExam}/>

        <Stack.Screen name="Chat Student" component={ChatStudent}/>
        <Stack.Screen name="Chat Math" component={ChatMath}/>
        <Stack.Screen name="Chat English" component={ChatEnglish}/>
        <Stack.Screen name="Chat Science" component={ChatScience}/>
        <Stack.Screen name="Chat Software" component={ChatSoftware}/>
        <Stack.Screen name="Chat Code" component={ChatCode}/>

      </Stack.Navigator>
    </>
   );
}
