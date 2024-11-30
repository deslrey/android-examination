import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('用户名是必填项'),
    password: Yup.string().min(6, '密码至少为6个字符').required('密码是必填项'),
});

const PrefixApi = 'http://192.168.31.10:808/deslre'

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);

        const response = await axios.post(PrefixApi + '/userInfo/login', {
            'userName': values.username,
            'passWord': values.password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        console.error('LoginScreen === 30 ===> ', response.data);

        setLoading(false);
        if (response === null) {
            Alert.alert('登录失败,服务器异常');
        } else if (response.data.code === 200) {
            setLoading(false);
            navigation.navigate('BottonNavigator'); // 登录成功后跳转到 BottonNavigator
        } else {
            Alert.alert(response.data.message);
        }

        // setTimeout(() => {
        //     setLoading(false);
        //     if (values.username === 'test' && values.password === '123456') {
        //         Alert.alert('登录成功');
        //         navigation.navigate('BottonNavigator'); // 登录成功后跳转到 BottonNavigator
        //     } else {
        //         Alert.alert('登录失败', '用户名或密码错误');
        //     }
        // }, 1500);
    };

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
                            placeholder="邮箱账号/手机号"
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

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                            <View style={styles.customButton}>
                                <Text style={styles.buttonText}>
                                    没有账户？去注册
                                </Text>
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
        // backgroundColor: '#0066cc',
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

export default LoginScreen;
