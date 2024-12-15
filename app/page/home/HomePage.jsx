import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MessageProvider, MessageContext } from '../../utils/Message';  // 确保路径正确

// 引入本地图片
const image = require('../../static/images/lbl.png');

const HomePage = () => {
    const [hasSignedIn, setHasSignedIn] = useState(false);

    // 从 MessageContext 获取 showMessage 方法
    const { showMessage } = useContext(MessageContext);

    // 点击签到按钮时触发的函数
    const handleSignIn = () => {
        setHasSignedIn(true); // 设置为已签到
        showMessage('签到成功！'); // 调用 showMessage 显示提示
    };

    return (
        <MessageProvider>
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <View style={styles.signInContainer}>
                        {hasSignedIn ? (
                            <Text style={styles.signedInText}>今日已签到</Text>
                        ) : (
                            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                                <Text style={styles.signInText}>签到</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ImageBackground>
            </View>
        </MessageProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    signInContainer: {
        flex: 1,
        justifyContent: 'flex-start', // 垂直靠上
        alignItems: 'center', // 水平居中
        marginTop: '30%', // 向上移动
    },
    signInButton: {
        backgroundColor: 'rgba(98, 0, 238, 0.6)', // 半透明背景色（紫色，透明度为0.6）
        paddingVertical: 20, // 垂直内边距
        paddingHorizontal: 40, // 水平内边距
        borderRadius: 30, // 圆角
        shadowColor: '#000', // 阴影颜色
        shadowOffset: { width: 0, height: 2 }, // 阴影偏移
        shadowOpacity: 0.25, // 阴影透明度
        shadowRadius: 4, // 阴影半径
        elevation: 5, // Android 阴影
    },
    signInText: {
        color: '#fff', // 按钮文字颜色
        fontSize: 20, // 字体大小
        fontWeight: 'bold', // 字体加粗
    },
    signedInText: {
        color: '#6200EE', // 已签到文本颜色
        fontSize: 20, // 字体大小
        fontWeight: 'bold', // 字体加粗
    },
});

export default HomePage;
