import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('用户名是必填项'),
    password: Yup.string().min(6, '密码至少为6个字符').required('密码是必填项'),
});

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (values.username === 'test' && values.password === '123456') {
                Alert.alert('登录成功');
                navigation.navigate('BottonNavigator'); // 登录成功后跳转到 BottonNavigator
            } else {
                Alert.alert('登录失败', '用户名或密码错误');
            }
        }, 1500);
    };

    // 从服务器获取验证码
    const getVerificationCode = () => { }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>登录</Text>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <Input
                            placeholder="用户名"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            errorMessage={touched.username && errors.username}
                            containerStyle={styles.inputContainer}
                        />
                        <Input
                            placeholder="密码"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            errorMessage={touched.password && errors.password}
                            containerStyle={styles.inputContainer}
                        />
                        <Button
                            title={loading ? '登录中...' : '登录'}
                            onPress={handleSubmit}
                            loading={loading}
                            buttonStyle={styles.button}
                        />
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
});

export default LoginScreen;
