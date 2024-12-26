import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import UserStorageService from '../../db/UserStorageService';
import ImagePicker from 'react-native-image-crop-picker';  // 导入image crop picker

const Test = () => {
    const [avatarUri, setAvatarUri] = useState(require('../../static/avatars/avatar.jpg')); // 初始头像

    // 保存用户信息和头像
    const testSaveUserInfo = async () => {
        const testUser = {
            name: 'Deslre',
            gender: '男',
            accountId: '1234567890',
            phone: '13812345678',
            email: 'zhangsan@example.com',
        };

        try {
            // 保存用户信息
            await UserStorageService.saveUserInfo(testUser);

            // 选择头像并保存
            ImagePicker.openPicker({
                cropping: true,
                width: 300,
                height: 300,
                compressImageMaxWidth: 300,
                compressImageMaxHeight: 300,
                compressImageQuality: 0.7,
            }).then(image => {
                const avatarBase64 = `data:image/jpeg;base64,${image.data}`;
                // 保存头像的 base64 字符串
                UserStorageService.saveUserAvatar(avatarBase64);
                Alert.alert('成功', '用户信息和头像已保存');
            }).catch(error => {
                console.log('图片选择错误: ', error);
            });
        } catch (error) {
            Alert.alert('错误', '保存用户信息时发生错误');
        }
    };

    // 获取用户信息和头像
    const testGetUserInfo = async () => {
        try {
            const userInfo = await UserStorageService.getUserInfo();
            const avatarBase64 = await UserStorageService.getUserAvatar();
            if (userInfo) {
                Alert.alert('用户信息', `姓名: ${userInfo.name}\n性别: ${userInfo.gender}`);
                if (avatarBase64) {
                    Alert.alert('头像', '头像已成功存储（Base64格式）');
                } else {
                    Alert.alert('无头像', '没有保存头像');
                }
            } else {
                Alert.alert('无用户信息', '没有找到保存的用户信息');
            }
        } catch (error) {
            Alert.alert('错误', '获取用户信息时发生错误');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: 20 }}>测试 UserStorageService</Text>

            <Button title="保存测试信息" onPress={testSaveUserInfo} />
            <Button title="获取用户信息" onPress={testGetUserInfo} style={{ marginTop: 20 }} />
        </View>
    );
};

export default Test;
