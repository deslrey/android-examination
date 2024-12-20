import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BoxComponent from '../../components/boxs/BoxComponent';
import SignInButton from '../../components/sign/SignInButton';
import useHomePageLogic from '../../hooks/useHomePageLogic';
import Icon from 'react-native-vector-icons/FontAwesome6';  // 导入图标库

const image = require('../../static/images/lbl.png');
const userAvatar = require('../../static/avatars/avatar.jpg'); // 用户头像图片路径

const HomePage = () => {
    const navigation = useNavigation();
    const { hasSignedIn, handleSignIn, toLearn, toReview, toCode, toCubesStack, toLeaning } = useHomePageLogic(navigation);

    // 跳转到个人中心
    const goToProfile = () => {
        navigation.navigate('Profile');  // 假设个人中心页面名称是 "Profile"
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                {/* 用户头像 */}
                <TouchableOpacity style={styles.avatarContainer} onPress={goToProfile}>
                    <Image source={userAvatar} style={styles.avatar} />
                </TouchableOpacity>

                <SignInButton hasSignedIn={hasSignedIn} onSignIn={handleSignIn} />
                <View style={styles.boxContainer}>
                    <BoxComponent title="Learn" onPress={toLearn} />
                    <BoxComponent title="Review" onPress={toReview} />
                </View>

                {/* 下面三个图标 */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={toCode}>
                        <Icon name="code" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toCubesStack}>
                        <Icon name="cubes-stacked" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toLeaning}>
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
    avatarContainer: {
        position: 'absolute',
        top: 30,  // 头像离顶部的距离
        left: 15,  // 头像离左边的距离
        zIndex: 1,  // 确保头像位于其他元素之上
    },
    avatar: {
        width: 40,  // 头像的宽度
        height: 40,  // 头像的高度
        borderRadius: 20,  // 使头像成为圆形
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
