import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const registerValidationSchema = Yup.object().shape({
    username: Yup.string().required('用户名是必填项'),
    password: Yup.string().min(6, '密码至少为6个字符').required('密码是必填项'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], '密码不一致')
        .required('确认密码是必填项'),
});

const PrefixApi = 'http://192.168.31.10:808/deslre'

const RegisterScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);

        axios.post(PrefixApi + '/userInfo/emailRegister', {
            'email': values.username,
            'passWord': values.password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
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
            <Text style={styles.title}>注册</Text>
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={registerValidationSchema}
                onSubmit={handleRegister}
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
                                <Text style={styles.buttonText}>
                                    已有账号？去登录
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

export default RegisterScreen;
