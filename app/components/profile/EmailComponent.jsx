import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import UserStorageService from '../../db/UserStorageService'; // 导入本地存储服务
import Ionicons from 'react-native-vector-icons/Ionicons'; // 导入图标库

const EmailComponent = ({ navigation }) => {
    const [email, setEmail] = useState('');  // 存储用户输入的邮箱
    const [initialEmail, setInitialEmail] = useState('');  // 存储初始邮箱，避免误操作

    // 获取当前用户信息并设置邮箱
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUser = await UserStorageService.getUserInfo();  // 从本地存储获取用户信息
                if (storedUser && storedUser.email) {
                    setEmail(storedUser.email);  // 如果有保存的邮箱，就设置为当前邮箱
                    setInitialEmail(storedUser.email);  // 保存初始邮箱，避免误操作
                }
            } catch (error) {
                console.error('加载用户信息失败:', error);
            }
        };

        loadUserInfo();  // 组件挂载时调用
    }, []);  // 只在组件首次加载时执行一次

    // 验证邮箱格式
    const isValidEmail = (email) => {
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // 简单的邮箱格式校验
        return emailRegEx.test(email);
    };

    // 更新邮箱
    const updateEmail = async () => {
        if (!email.trim()) {
            Alert.alert('提示', '邮箱不能为空');
            return;
        }
        if (!isValidEmail(email)) {
            Alert.alert('提示', '请输入有效的邮箱地址');
            return;
        }

        try {
            // 调用 UserStorageService 更新邮箱
            await UserStorageService.updateUserEmail(email);
            Alert.alert('成功', '邮箱更新成功！');
            navigation.goBack();  // 返回到个人资料页
        } catch (error) {
            console.error('更新邮箱失败:', error);
            Alert.alert('错误', '更新邮箱失败，请重试');
        }
    };

    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>更换邮箱</Text>
            </View>

            {/* 输入框和按钮 */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="请输入新邮箱"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"  // 设置键盘类型为邮箱
                />
                <TouchableOpacity style={styles.button} onPress={updateEmail}>
                    <Text style={styles.buttonText}>保存</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 主轴方向居中
        backgroundColor: '#2b4eff',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        position: 'absolute', // 绝对定位
        left: 16, // 距离左侧一定距离
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    inputContainer: {
        padding: 20,
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2b4eff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EmailComponent;
