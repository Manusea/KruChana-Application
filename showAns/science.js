
import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Content } from 'native-base';

let nameHw = "";
class ShowData extends Component {
    constructor() {
        super();
        this.state = {
            userArr: []
        }
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
            const { fileName, fileType, name, timestamp, url } = res.data();
            userArr.push({
                key: res.id,
                fileName,
                fileType,
                name,
                timestamp,
                url
            })
        })
        this.setState({
            userArr
        })
    }
    render() {
        const { text, timer } = this.props.route.params  
        nameHw = {text}.text;
        this.fireStoreData = firestore().collection("subject_Science").doc(nameHw).collection('ans');

        return (
            <Content>
                {
                    this.state.userArr.map((item, i) => {
                        return (
                            <View>
                            <Text>{item.name}</Text>
                            <TouchableOpacity style={styles.loginButton} onPress={() => {
                                this.props.navigation.navigate('filePreview', { fileName: item.fileName });
                                this.props.navigation.navigate('filePreview', { fileType: item.fileType });
                                this.props.navigation.navigate('filePreview', { url: item.url });
                            }
                            }>
                                <Text style={styles.loginButtonText}>
                                    {item.fileName}
                                </Text>
                            </TouchableOpacity>
                            </View>
                        );
                    })
                }
            </Content>
        )
    }
}


const styles = StyleSheet.create({
    textName: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        fontSize: 20,
    },
    textScore: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        fontSize: 20,
        padding: 20
    },

    box: {
        backgroundColor: '#00CABA',
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        margin: 50,
        width: 300,
        marginBottom: 5
    },

    container: {
        flex: 1,
        backgroundColor: '#E2FCFA',
    },
});


export default ShowData;