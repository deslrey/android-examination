import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoxComponent from '../../components/boxs/BoxComponent';
import SignInButton from '../../components/sign/SignInButton';
import useHomePageLogic from '../../hooks/useHomePageLogic';
import Icon from 'react-native-vector-icons/FontAwesome6';  // 导入图标库

const image = require('../../static/images/lbl.png');

const HomePage = () => {

    const navigation = useNavigation();
    const { hasSignedIn, handleSignIn, toLearn, toReview } = useHomePageLogic(navigation);

    // 处理点击图标的事件
    const handleIconPress = (iconName) => {
        console.log(`Clicked ${iconName}`);
        // 可以根据 iconName 做不同的导航或操作
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <SignInButton hasSignedIn={hasSignedIn} onSignIn={handleSignIn} />
                <View style={styles.boxContainer}>
                    <BoxComponent title="Learn" onPress={toLearn} />
                    <BoxComponent title="Review" onPress={toReview} />
                </View>

                {/* 下面三个图标 */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleIconPress('home')}>
                        <Icon name="code" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleIconPress('search')}>
                        <Icon name="cubes-stacked" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleIconPress('user')}>
                        <Icon name="lines-leaning" size={30} color="black" />
                    </TouchableOpacity>
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
        paddingBottom: 50,  // 留出底部空间给图标
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',  // 确保图标显示在底部
        bottom: 30,  // 设置图标距离底部的距离
        width: '100%',  // 确保图标容器的宽度填满整个屏幕
    },
});

export default HomePage;
