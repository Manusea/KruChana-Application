
import React from 'react';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

const DisplayAnImage = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/lgin-5579f.appspot.com/o/allFiles%2Fsubject_Eng%2Ft2%2Fclement-m-F_-0BxGuVvo-unsplash.jpg?alt=media&token=d758c409-0e39-44df-bfcb-43ee3fdcc69b',
                    }}
                />
            </View>
        </ScrollView>
    );
}

export default DisplayAnImage;