import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import UserStorageService from '../../db/UserStorageService'; // 导入本地存储服务
import Ionicons from 'react-native-vector-icons/Ionicons'; // 导入图标库

const PhoneComponent = ({ navigation }) => {
    const [name, setName] = useState('');  // 存储用户输入的昵称
    const [initialName, setInitialName] = useState('');  // 存储初始昵称，避免误操作

    // 获取当前用户信息并设置昵称
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUser = await UserStorageService.getUserInfo();  // 从本地存储获取用户信息
                if (storedUser && storedUser.name) {
                    setName(storedUser.name);
                    setInitialName(storedUser.name);
                }
            } catch (error) {
                console.error('加载用户信息失败:', error);
            }
        };

        loadUserInfo();  // 组件挂载时调用
    }, []);  // 只在组件首次加载时执行一次



    // 更新手机号
    const updateName = async () => {
        if (!name.trim()) {
            Alert.alert('提示', '昵称不能为空');
            return;
        }
        try {

            await UserStorageService.updateUserName(name);
            Alert.alert('成功', '昵称更新成功！');
            navigation.goBack();  // 返回到个人资料页
        } catch (error) {
            console.error('更新昵称失败:', error);
            Alert.alert('错误', '更新昵称失败，请重试');
        }
    };

    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>更换昵称</Text>
            </View>

            {/* 输入框和按钮 */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="请输入新昵称"
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity style={styles.button} onPress={updateName}>
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

export default PhoneComponent;
