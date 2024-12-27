import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // 导入 useFocusEffect
import BoxComponent from '../../components/boxs/BoxComponent';
import SignInButton from '../../components/sign/SignInButton';
import useHomePageLogic from '../../hooks/useHomePageLogic';
import Icon from 'react-native-vector-icons/FontAwesome6';
import UserStorageService from '../../db/UserStorageService';

const image = require('../../static/images/lbl.png');

const HomePage = () => {
    const navigation = useNavigation();
    const { hasSignedIn, handleSignIn, toLearn, toReview, toCode, toCubesStack, toLeaning } = useHomePageLogic(navigation);

    const [avatarUri, setAvatarUri] = useState(require('../../static/avatars/avatar.jpg'));

    // 使用 useFocusEffect 确保每次页面获得焦点时重新加载头像
    useFocusEffect(
        React.useCallback(() => {
            const loadUserAvatar = async () => {
                try {
                    const storedAvatar = await UserStorageService.getUserAvatar();
                    if (storedAvatar) {
                        setAvatarUri({ uri: storedAvatar.startsWith('data:image') ? storedAvatar : storedAvatar });
                    }
                } catch (error) {
                    console.error('加载头像时出错:', error);
                }
            };

            loadUserAvatar();
        }, []) // 确保依赖为空，避免重复绑定
    );

    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    const toTest = () => {
        navigation.navigate('Test');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <TouchableOpacity style={styles.avatarContainer} onPress={goToProfile}>
                    <Image source={avatarUri} style={styles.avatar} />
                </TouchableOpacity>

                <SignInButton hasSignedIn={hasSignedIn} onSignIn={handleSignIn} />
                <View style={styles.boxContainer}>
                    <BoxComponent title="Learn" onPress={toLearn} />
                    <BoxComponent title="Review" onPress={toReview} />
                </View>

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
                    <TouchableOpacity onPress={toTest}>
                        <Icon name="java" size={30} color="black" />
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
        paddingBottom: 50,
    },
    avatarContainer: {
        position: 'absolute',
        top: 30,
        left: 15,
        zIndex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
});

export default HomePage;
