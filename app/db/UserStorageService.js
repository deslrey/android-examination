import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user_info';
const AVATAR_KEY = 'user_avatar';

// 保存用户信息
const saveUserInfo = async (userInfo) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    } catch (error) {
        console.error('保存用户信息失败:', error);
    }
};

// 获取用户信息
const getUserInfo = async () => {
    try {
        const userInfo = await AsyncStorage.getItem(USER_KEY);
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error('获取用户信息失败:', error);
        return null;
    }
};

// 保存用户头像
const saveUserAvatar = async (avatarBase64) => {
    try {
        await AsyncStorage.setItem(AVATAR_KEY, avatarBase64);
    } catch (error) {
        console.error('保存用户头像失败:', error);
    }
};

// 获取用户头像
const getUserAvatar = async () => {
    try {
        const avatarBase64 = await AsyncStorage.getItem(AVATAR_KEY);
        return avatarBase64;
    } catch (error) {
        console.error('获取用户头像失败:', error);
        return null;
    }
};

// 删除所有用户信息
const deleteUserInfo = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
        await AsyncStorage.removeItem(AVATAR_KEY);
    } catch (error) {
        console.error('删除用户信息失败:', error);
    }
};

export default {
    saveUserInfo,
    getUserInfo,
    saveUserAvatar,
    getUserAvatar,
    deleteUserInfo,
};
