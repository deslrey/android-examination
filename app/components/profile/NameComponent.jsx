import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // 导入 navigation 钩子
import UserStorageService from '../../db/UserStorageService'; // 导入本地存储服务
import Ionicons from 'react-native-vector-icons/Ionicons';  // 导入图标库

const NameComponent = () => {
    const navigation = useNavigation();  // 获取 navigation 对象
    const [name, setName] = useState('');  // 存储昵称
    const [initialName, setInitialName] = useState('');  // 存储初始昵称，避免在更新时误操作

    // 在组件加载时获取用户信息
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const storedUser = await UserStorageService.getUserInfo();  // 从本地存储获取用户信息
                if (storedUser && storedUser.name) {
                    setName(storedUser.name);  // 如果有保存的昵称，就设置为当前昵称
                    setInitialName(storedUser.name);  // 保存初始昵称，避免误操作
                }
            } catch (error) {
                console.error('加载用户信息失败:', error);
            }
        };

        loadUserInfo();  // 组件挂载时调用
    }, []);  // 只在组件首次加载时执行一次

    // 更新昵称
    const updateName = async () => {
        if (!name.trim()) {
            Alert.alert('提示', '昵称不能为空');
            return;
        }

        try {
            // 调用 UserStorageService 更新昵称
            await UserStorageService.updateUserName(name);
            Alert.alert('成功', '昵称更新成功！');
            navigation.goBack();  // 返回到个人资料页
        } catch (error) {
            console.error('更新昵称失败:', error);
            Alert.alert('错误', '更新昵称失败，请重试');
        }
    };

    // 返回按钮处理
    const goBack = () => {
        navigation.goBack();  // 返回上一页
    };

    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>更新昵称</Text>
            </View>

            {/* 输入框 */}
            <TextInput
                style={styles.input}
                placeholder="请输入新的昵称"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#bbb"
            />

            {/* 保存按钮 */}
            <TouchableOpacity style={styles.saveButton} onPress={updateName}>
                <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>
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
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 20,
        marginTop: 40,
        backgroundColor: '#f8f8f8',
    },
    saveButton: {
        backgroundColor: '#2b4eff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NameComponent;
