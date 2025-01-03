import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const PrefixApi = 'http://192.168.31.10:808/deslre';

const SignInButton = ({ hasSignedIn, onSignIn }) => {
    // 获取当前日期并格式化为 "YYYY-MM-DD" 格式
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const [word, setWord] = useState('deslre');


    const getRandomWord = async () => {
        try {
            // const response = await axios.get(`${PrefixApi}/words/getRandom`)
            console.log('result ======> ', response.data);
            setWord(response.data.message)

        } catch (error) {
        }
    }

    getRandomWord()

    useEffect(() => {
        const getRandomWord = async () => {
            try {
                const response = await axios.get(`${PrefixApi}/words/getRandom`)
                console.log('result ======> ', response.data);
                setWord(response.data.message)

            } catch (error) {
                setWord('desslre')
            }
        }
        getRandomWord()
    }, []);  // 组件加载时只执行一次

    return (
        <View style={styles.signInContainer}>
            {hasSignedIn ? (
                <Text style={styles.signedInText}>今日已签到</Text>
            ) : (
                <View style={styles.signInButtonContainer}>
                    <TouchableOpacity style={styles.signInButton}>
                        <Text style={styles.signInText}>{word}</Text>
                    </TouchableOpacity>
                    <Text style={styles.dateText}>今日: {currentDate}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '30%',
    },
    signInButtonContainer: {
        alignItems: 'center',
    },
    signInButton: {
        backgroundColor: 'rgba(98, 0, 238, 0.6)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    signInText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signedInText: {
        color: '#6200EE',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateText: {
        color: '#6200EE',
        fontSize: 16,
        marginTop: 10,
    },
});

export default SignInButton;
