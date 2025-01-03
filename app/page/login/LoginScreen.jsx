import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import UserStorageService from '../../db/UserStorageService';


const loginValidationSchema = Yup.object().shape({
    userName: Yup.string().required('用户名是必填项'),
    passWord: Yup.string().min(6, '密码至少为6个字符').required('密码是必填项'),
});

const PrefixApi = 'http://192.168.31.10:808/deslre'

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    // 检查是否已有用户登录
    useEffect(() => {
        const checkLogin = async () => {
            const userInfo = await UserStorageService.getUserInfo();
            if (userInfo) {
                console.log('用户已登录:', userInfo);
                // 跳转到 HomePage 页面
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomePage' }] // 跳转到 HomePage 页面，并重置栈
                });
            }
        };
        checkLogin();
    }, []);


    const handleLogin = async (values) => {
        setLoading(true);
        const hashedPassword = CryptoJS.SHA256(values.passWord).toString();
        const response = await axios.post(PrefixApi + '/userInfo/login', {
            'userName': values.userName,
            'passWord': hashedPassword
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('LoginScreen === 30 ===> ', response.data);
        const result = response.data.data

        await UserStorageService.deleteUserInfo()
        await UserStorageService.deleteUserInfo()
        const user = {
            accountId: result.userId,
            name: result.nickName,
            gender: '',
            phone: result.phone,
            email: result.email
        }
        await UserStorageService.saveUserInfo(user)
        setLoading(false);
        if (response === null) {
            Alert.alert('登录失败,服务器异常');
        } else if (response.data.code === 200) {
            setLoading(false);
            Alert.alert('跳转到主界面');
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }] // 跳转到 HomePage 页面，并重置栈
            });
        } else {
            Alert.alert(response.data.message);
        }
    };


    const phoneRegister = () => {
        navigation.navigate('PhoneRegister');
    }
    const envelopeRegister = () => {
        navigation.navigate('EmailRegiste');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>登录</Text>
            <Formik
                initialValues={{ userName: '', passWord: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <Input
                            placeholder="邮箱账号/手机号"
                            onChangeText={handleChange('userName')}
                            onBlur={handleBlur('userName')}
                            value={values.useruserNamename}
                            errorMessage={touched.userName && errors.userName}
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
                        <Button
                            title={loading ? '登录中...' : '登录'}
                            onPress={handleSubmit}
                            loading={loading}
                            buttonStyle={styles.button}
                        />
                        {/* 
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                            <View style={styles.customButton}>
                                <Text style={styles.buttonText}>
                                    没有账户？去注册
                                </Text>
                            </View>
                        </TouchableWithoutFeedback> */}

                        {/* 添加两个注册按钮 */}
                        <View style={styles.registerButtonsContainer}>
                            <TouchableOpacity style={styles.registerButton} onPress={phoneRegister}>
                                <FontAwesomeIcon name="phone" size={20} color="#fff" />
                                <Text style={styles.registerButtonText}>手机号注册</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.registerButton} onPress={envelopeRegister}>
                                <FontAwesomeIcon name="envelope" size={20} color="#fff" />
                                <Text style={styles.registerButtonText}>邮箱注册</Text>
                            </TouchableOpacity>
                        </View>
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
    registerButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    registerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0066cc',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 25,
        width: '35%',
        justifyContent: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 8,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
