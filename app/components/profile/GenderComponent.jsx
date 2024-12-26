import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import UserStorageService from '../../db/UserStorageService'; // 导入本地存储服务
import Ionicons from 'react-native-vector-icons/Ionicons'; // 导入图标库

const GenderComponent = ({ navigation }) => {
  const [gender, setGender] = useState('');  // 存储当前选中的性别

  // 获取当前用户信息并设置性别
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUser = await UserStorageService.getUserInfo();  // 从本地存储获取用户信息
        if (storedUser && storedUser.gender) {
          setGender(storedUser.gender);  // 如果有保存的性别，就设置为当前性别
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
      }
    };

    loadUserInfo();  // 组件挂载时调用
  }, []);  // 只在组件首次加载时执行一次

  // 更新性别
  const updateGender = async (selectedGender) => {
    try {
      // 调用 UserStorageService 更新性别
      await UserStorageService.updateUserGender(selectedGender);
      setGender(selectedGender);  // 更新本地状态中的性别

      Alert.alert('成功', `性别已更新为 ${selectedGender}`);
      navigation.goBack();  // 返回到个人资料页
    } catch (error) {
      console.error('更新性别失败:', error);
      Alert.alert('错误', '更新性别失败，请重试');
    }
  };

  return (
    <View style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>选择性别</Text>
      </View>

      {/* 性别选择按钮 */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === '男' && styles.selectedButton]}  // 如果选中男，则改变按钮样式
          onPress={() => updateGender('男')}
        >
          <Text style={styles.genderButtonText}>男</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, gender === '女' && styles.selectedButton]}  // 如果选中女，则改变按钮样式
          onPress={() => updateGender('女')}
        >
          <Text style={styles.genderButtonText}>女</Text>
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
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  genderButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: '#2b4eff',
    borderColor: '#2b4eff',
  },
  genderButtonText: {
    fontSize: 18,
    color: '#333',
  },
});

export default GenderComponent;
