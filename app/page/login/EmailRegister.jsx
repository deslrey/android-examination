import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import UserStorageService from '../../db/UserStorageService';


// 表单验证规则
const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '请输入有效的邮箱地址'
    )
    .required('邮箱是必填项'),
  passWord: Yup.string()
    .min(6, '密码至少为6个字符')
    .required('密码是必填项'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('passWord'), null], '密码不一致')
    .required('确认密码是必填项'),
  code: Yup.string()
    .length(6, '验证码必须是6位数字')
    .required('验证码是必填项'),
});

const PrefixApi = 'http://192.168.31.10:808/deslre';

const EmailRegister = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const handleGetCode = async (email) => {
    console.log('email ======> ', email);

    if (email === '' | email === null) {
      Alert.alert('请输入邮箱后获取验证码');
      return;
    }

    setSendingCode(true);

    try {
      const response = await axios.post(`${PrefixApi}/userInfo/getEmailCode`,
        { email: email },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      console.log('response =======> ', response.data);

      if (response.data.code === 200) {
        Alert.alert('验证码已发送', '请检查您的邮箱获取验证码');
      } else {
        Alert.alert('获取验证码失败', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('获取验证码失败', '请稍后重试');
    }

    setSendingCode(false);
  };

  const handleRegister = async (values) => {
    setLoading(true);

    const hashedPassword = CryptoJS.SHA256(values.passWord).toString();

    try {
      const response = await axios.post(`${PrefixApi}/userInfo/emailRegister`,
        {
          email: values.email,
          passWord: hashedPassword,
          code: values.code,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      console.log('data ======> ', response.data);

      if (response.data.code === 200) {
        const result = response.data.data


        await UserStorageService.deleteUserInfo()
        const user = {
          accountId: result.userId,
          name: result.nickName,
          gender: '',
          phone: '',
          email: result.email
        }
        await UserStorageService.saveUserInfo(user)
        Alert.alert('注册成功', '跳转到主界面');
        // 跳转到 HomePage 页面
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }] // 跳转到 HomePage 页面，并重置栈
        });
      } else {
        Alert.alert('注册失败', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('注册失败', '请稍后重试');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>邮箱注册</Text>
      <Formik
        initialValues={{ email: '', passWord: '', confirmPassword: '', code: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Input
              placeholder="邮箱账号"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
              containerStyle={styles.inputContainer}
            />
            <Input
              placeholder="密码"
              secureTextEntry
              onChangeText={handleChange('passWord')}
              onBlur={handleBlur('passWord')}
              value={values.passWord}
              errorMessage={touched.passWord && errors.passWord}
              containerStyle={styles.inputContainer}
            />
            <Input
              placeholder="确认密码"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              errorMessage={touched.confirmPassword && errors.confirmPassword}
              containerStyle={styles.inputContainer}
            />
            <View style={styles.codeInputContainer}>
              <Input
                placeholder="验证码"
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                value={values.code}
                errorMessage={touched.code && errors.code}
                containerStyle={styles.codeInput}
              />
              <Button
                title={sendingCode ? '发送中...' : '获取验证码'}
                onPress={() => handleGetCode(values.email)}
                disabled={sendingCode}
                buttonStyle={styles.codeButton}
              />
            </View>
            <Button
              title={loading ? '注册中...' : '注册'}
              onPress={handleSubmit}
              loading={loading}
              buttonStyle={styles.button}
            />
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
              <View style={styles.customButton}>
                <Text style={styles.buttonText}>已有账号？去登录</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  codeInput: {
    flex: 2,
  },
  codeButton: {
    flex: 1,
    borderRadius: 8, // 圆角按钮
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2, // 添加阴影效果
  },
  codeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 25,
  },
  customButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmailRegister;
