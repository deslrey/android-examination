import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoxComponent from '../../components/boxs/BoxComponent';
import SignInButton from '../../components/sign/SignInButton';
import useHomePageLogic from '../../hooks/useHomePageLogic';

const image = require('../../static/images/lbl.png');

const HomePage = () => {

    const navigation = useNavigation();
    const { hasSignedIn, handleSignIn, toLearn, toReview } = useHomePageLogic(navigation);


    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <SignInButton hasSignedIn={hasSignedIn} onSignIn={handleSignIn} />
                <View style={styles.boxContainer}>
                    <BoxComponent title="Learn" onPress={toLearn} />
                    <BoxComponent title="Review" onPress={toReview} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
});

export default HomePage;
