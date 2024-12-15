import React, { createContext, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 创建消息上下文
const MessageContext = createContext();

// 消息组件，负责展示消息
const Message = () => {
    const { message, setMessage } = useContext(MessageContext);

    if (!message) return null; // 如果没有消息，则不显示

    // 2秒后自动清除消息
    setTimeout(() => {
        setMessage('');
    }, 2000);

    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
};

// 提供显示消息的组件
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');

    // 显示消息的函数，类似 Element UI 的 Message
    const showMessage = (msg) => {
        setMessage(msg);
    };

    return (
        <MessageContext.Provider value={{ message, setMessage, showMessage }}>
            <Message />
            {children}
        </MessageContext.Provider>
    );
};

// 样式
const styles = StyleSheet.create({
    messageContainer: {
        position: 'absolute',
        top: 50, // 距离顶部的位置
        left: '10%',
        right: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // 半透明黑色背景
        padding: 10,
        borderRadius: 5,
        zIndex: 1000, // 确保显示在其他组件之上
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

// 导出 MessageProvider 和 MessageContext
export { MessageProvider, MessageContext };
