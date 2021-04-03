import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Button,
  Right,
  Icon,
  ListItem,
  Text,
  View
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import firebaseStorage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigaiton/AuthProvider';

// Collect data from firestrore
let arrayDictStudents = [];

// Get url for file
let urlUser = "";
let nameHw = "";
class Hw extends React.Component {
    
  static contextType = AuthContext;
    
  constructor(props) {
    super(props);
    this.state = {
      students: arrayDictStudents,
      userArr: [],
    }
  }

  //]]////////////////////////////////////use for read data/////////////////////////
  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, question } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        question
      })
    })
    this.setState({
      userArr
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////


  //////////////////// Upload file ///////////////////////////////////////////////////
  FileUpload = (props) => {
    const storage = firebaseStorage();
    async function chooseFile() {
      // Pick a single file
      try {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        const path = await normalizationPath(file.uri);
        const result = await RNFetchBlob.fs.readFile(path, 'base64');
        uploadFileToFirebaseStorage(result, file);

      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }

    async function normalizationPath(path) {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        const filePrefix = 'file://';
        if (path.startsWith(filePrefix)) {
          path = path.substring(filePrefix.length);
          try {
            path = decodeURI(path);
          } catch (e) { }
        }
      }

      return path;
    }

    async function uploadFileToFirebaseStorage(result, file) {
      const name = 'allFiles/subject_Science/'+nameHw+"/"+ file.name;
      const uploadTask = firebaseStorage()
        .ref(name)
        .putString(result, 'base64', { contentType: file.type });

      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          alert("Progress Upload  :  " + Math.ceil(progress) + " %")
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              //console.log('Upload is paused');
              break;
            case storage.TaskState.RUNNING: // or 'running'
              //console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //console.log('File available at', downloadURL);
            urlUser = downloadURL;
            alert("Finish")
          });
        }
      );
    }
  ////////////////////////////////////////////////////////////////////////////////////

    return (
      <ScrollView>
        <Container>
          <Header>
            <Body>
              <Title>Upload</Title>
            </Body>
            <Right>
              <Button transparent onPress={chooseFile}>
                <Icon name="cloud-upload" type="MaterialIcons" />
              </Button>
            </Right>
          </Header>
          <Content>
            {this.state.students.map(eachStudent => (
              <>
                <Text>{eachStudent.name} </Text>
                <Text>{eachStudent.question} </Text>
              </>
            ))}
            <Button onPress={() => {
              this.usersCollectionRef.add({
                name: this.context.user.email,
                url: urlUser,
                timestamp: firestore.FieldValue.serverTimestamp()
              }).then((res) => {
                this.setState({
                  url: '',
                  name: ''
                })
                urlUser = ""
                arrayDictStudents = []
              })
                .catch((err) => {
                  console.log('Error found: ', err);
                  this.setState({
                    isLoading: false
                  })
                })
              this.props.navigation.navigate('Home Student');
            }}
            >
              <Text>Done</Text>
            </Button>
          </Content>
        </Container>
      </ScrollView>
    )
  }

  render() {
    // get col name form firestore //
    const { text, timer } = this.props.route.params  
    nameHw = {text}.text;
    // put data
    this.usersCollectionRef = firestore().collection("subject_Science").doc(nameHw).collection("ans");
    //show data
    this.fireStoreData = firestore().collection("subject_Science").doc(nameHw).collection("homeWorkDetail");
    console.log(nameHw);
    /////////////////////////////////

    ////// loop data in local array /////
    {
      this.state.userArr.map((item, i) => {
        arrayDictStudents.push({
          name: item.name,
          question: item.question
        })
      })
    }
    /////////////////////////////////////
    return (
      <ScrollView>
        <View>
          {this.FileUpload()}
        </View>
      </ScrollView>
    )
  }
}

export default Hw;