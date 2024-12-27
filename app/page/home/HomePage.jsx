import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BoxComponent from '../../components/boxs/BoxComponent';
import SignInButton from '../../components/sign/SignInButton';
import useHomePageLogic from '../../hooks/useHomePageLogic';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        }, [])
    );

    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    const goToSearch = () => {
        navigation.navigate('Search'); // 假设搜索界面的路由名称是 "Search"
    };

    const toTest = () => {
        navigation.navigate('Test');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                {/* 右上角搜索按钮 */}
                <TouchableOpacity style={styles.searchButton} onPress={goToSearch}>
                    <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>

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
    searchButton: {
        position: 'absolute',
        top: 30, // 距离顶部的距离
        right: 15, // 距离右侧的距离
        zIndex: 1,
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
