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

// 更新用户昵称
const updateUserName = async (newName) => {
    try {
        const userInfo = await getUserInfo();  // 获取当前保存的用户信息
        if (userInfo) {
            userInfo.name = newName;  // 更新昵称
            await saveUserInfo(userInfo);  // 保存更新后的用户信息
        }
    } catch (error) {
        console.error('更新用户昵称失败:', error);
    }
};

// 更新用户性别
const updateUserGender = async (newGender) => {
    try {
        const userInfo = await getUserInfo();  // 获取当前保存的用户信息
        if (userInfo) {
            userInfo.gender = newGender;  // 更新性别
            await saveUserInfo(userInfo);  // 保存更新后的用户信息
        }
    } catch (error) {
        console.error('更新用户性别失败:', error);
    }
};

// 更新用户手机号
const updateUserPhone = async (newPhone) => {
    try {
        const userInfo = await getUserInfo();  // 获取当前保存的用户信息
        if (userInfo) {
            userInfo.phone = newPhone;  // 更新手机号
            await saveUserInfo(userInfo);  // 保存更新后的用户信息
        }
    } catch (error) {
        console.error('更新用户手机号失败:', error);
    }
};

// 更新用户邮箱
const updateUserEmail = async (newEmail) => {
    try {
        const userInfo = await getUserInfo();  // 获取当前保存的用户信息
        if (userInfo) {
            userInfo.email = newEmail;  // 更新邮箱
            await saveUserInfo(userInfo);  // 保存更新后的用户信息
        }
    } catch (error) {
        console.error('更新用户邮箱失败:', error);
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
    updateUserName,  // 导出更新昵称的方法
    deleteUserInfo,
    updateUserGender,
    updateUserPhone,
    updateUserEmail
};
