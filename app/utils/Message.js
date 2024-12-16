import React, { createContext, useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

// 创建消息上下文
const MessageContext = createContext();

// 消息组件
const Message = () => {
    const { message, type, setMessage, duration } = useContext(MessageContext);
    const [fadeAnim] = useState(new Animated.Value(0)); // 初始透明度为 0

    useEffect(() => {
        if (message) {
            // 渐入动画
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // 消息显示一段时间后隐藏
            const timer = setTimeout(() => {
                // 渐出动画
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => setMessage(''));
            }, duration || 3000); // 默认 3 秒后消失

            return () => clearTimeout(timer); // 清除定时器
        }
    }, [message, duration, fadeAnim]);

    if (!message) return null;

    // 根据类型动态设置样式
    const getStyles = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#f0f9eb', // 浅绿色
                    textColor: '#67c23a', // 深绿色
                };
            case 'error':
                return {
                    backgroundColor: '#fef0f0', // 浅红色
                    textColor: '#f56c6c', // 深红色
                };
            case 'warning':
                return {
                    backgroundColor: '#fdf6ec',
                    textColor: '#e6a23c'
                }
            default:
                return {
                    backgroundColor: '#d1ecf1', // 浅蓝色
                    textColor: '#0c5460', // 深蓝色
                };
        }
    };

    const { backgroundColor, textColor } = getStyles();

    return (
        <Animated.View
            style={[
                styles.messageContainer,
                { opacity: fadeAnim, backgroundColor: backgroundColor },
            ]}
        >
            <Text style={[styles.messageText, { color: textColor }]}>{message}</Text>
        </Animated.View>
    );
};

// 提供消息上下文的组件
const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // 默认类型
    const [duration, setDuration] = useState(3000); // 默认 3 秒

    const showMessage = (msg, time = 3000, msgType = 'success') => {
        setMessage(msg);
        setType(msgType);
        setDuration(time);
    };

    return (
        <MessageContext.Provider value={{ message, type, setMessage, showMessage, duration }}>
            <Message />
            {children}
        </MessageContext.Provider>
    );
};

// 样式
const styles = StyleSheet.create({
    messageContainer: {
        position: 'absolute',
        top: 30,
        left: '10%',
        right: '10%',
        padding: 15,
        borderRadius: 10, // 圆角
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
        zIndex: 1000,
    },
    messageText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

// 导出 MessageProvider 和 MessageContext
export { MessageProvider, MessageContext };
