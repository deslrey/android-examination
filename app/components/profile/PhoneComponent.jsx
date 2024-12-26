import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import UserStorageService from '../../db/UserStorageService'; // 导入本地存储服务
import Ionicons from 'react-native-vector-icons/Ionicons'; // 导入图标库

const PhoneComponent = ({ navigation }) => {
  const [phone, setPhone] = useState('');  // 存储用户输入的手机号
  const [initialPhone, setInitialPhone] = useState('');  // 存储初始手机号，避免误操作

  // 获取当前用户信息并设置手机号
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUser = await UserStorageService.getUserInfo();  // 从本地存储获取用户信息
        if (storedUser && storedUser.phone) {
          setPhone(storedUser.phone);  // 如果有保存的手机号，就设置为当前手机号
          setInitialPhone(storedUser.phone);  // 保存初始手机号，避免误操作
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
      }
    };

    loadUserInfo();  // 组件挂载时调用
  }, []);  // 只在组件首次加载时执行一次

  // 验证手机号格式
  const isValidPhone = (phone) => {
    const phoneRegEx = /^[1]([3-9])[0-9]{9}$/;  // 简单的手机号格式校验
    return phoneRegEx.test(phone);
  };

  // 更新手机号
  const updatePhone = async () => {
    if (!phone.trim()) {
      Alert.alert('提示', '手机号不能为空');
      return;
    }
    if (!isValidPhone(phone)) {
      Alert.alert('提示', '请输入有效的手机号');
      return;
    }

    try {
      // 调用 UserStorageService 更新手机号
      await UserStorageService.updateUserPhone(phone);
      Alert.alert('成功', '手机号更新成功！');
      navigation.goBack();  // 返回到个人资料页
    } catch (error) {
      console.error('更新手机号失败:', error);
      Alert.alert('错误', '更新手机号失败，请重试');
    }
  };

  return (
    <View style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>更换手机号</Text>
      </View>

      {/* 输入框和按钮 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="请输入新手机号"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"  // 设置键盘类型为手机号
        />
        <TouchableOpacity style={styles.button} onPress={updatePhone}>
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
