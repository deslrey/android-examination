import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { MessageProvider } from '../../utils/Message';
import BoxComponent from '../../components/boxs/BoxComponent';
import SignInButton from '../../components/sign/SignInButton';
import useHomePageLogic from '../../hooks/useHomePageLogic';

const image = require('../../static/images/lbl.png');

const HomePage = ({ navigation }) => {
    const { hasSignedIn, handleSignIn, toLearn, toReview } = useHomePageLogic(navigation); // 使用自定义 hook

    return (
        <MessageProvider>
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    {/* 签到按钮 */}
                    <SignInButton hasSignedIn={hasSignedIn} onSignIn={handleSignIn} />

                    {/* 两个盒子 */}
                    <View style={styles.boxContainer}>
                        <BoxComponent title="Learn" onPress={toLearn} />
                        <BoxComponent title="Review" onPress={toReview} />
                    </View>
                </ImageBackground>
            </View>
        </MessageProvider>
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
