import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const image = require('../../static/images/lbl.png');

const HomePage = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>

            </ImageBackground>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});

export default HomePage;
