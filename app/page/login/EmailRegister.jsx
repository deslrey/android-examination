import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CryptoJS from 'crypto-js';

// 更新后的邮箱验证正则
const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '请输入有效的邮箱地址'
    ) // 邮箱格式验证
    .required('邮箱是必填项'),
  passWord: Yup.string()
    .min(6, '密码至少为6个字符')
    .required('密码是必填项'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('passWord'), null], '密码不一致')
    .required('确认密码是必填项'),
});

const PrefixApi = 'http://192.168.31.10:808/deslre';

const EmailRegister = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);

    // 对密码进行哈希加密
    const hashedPassword = CryptoJS.SHA256(values.passWord).toString();

    axios
      .post(PrefixApi + '/userInfo/emailRegister', {
        email: values.email,
        passWord: hashedPassword, // 发送哈希后的密码
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(response => {
        console.log(response.data);
        Alert.alert(response.data.message);
        if (response.data.code === 200) {
          navigation.navigate('BottonNavigator'); // 注册成功后跳转主界面
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('注册失败', error.message);
      });

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>邮箱注册</Text>
      <Formik
        initialValues={{ email: '', passWord: '', confirmPassword: '' }}
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
