import React from 'react';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Content } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

export default class PDFExample extends React.Component {

    render() {
        const { fileName, fileType, url } = this.props.route.params
        let getFileType = { fileType }.fileType
        const source = { uri: url, cache: true };

        return (
            <View style={styles.container}>
                {getFileType == 'image/jpeg' && (
                    <Image
                        source={source}
                        style={{
                            flex: 1,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height
                        }}
                        resizeMode={'contain'}
                    />
                )}
                {getFileType == 'application/pdf' && (
                    <Pdf
                        source={source}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link presse: ${uri}`)
                        }}
                        style={styles.pdf} />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});