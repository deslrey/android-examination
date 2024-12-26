import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import WordStorageService from '../../db/WordStorageService';

const FinishComponent = ({ route, navigation }) => {
    // 从 route.params 中解构出传递过来的单词列表
    const { words } = route.params || [];

    useEffect(() => {
        if (words) {
            console.log("Received words:", words);  // 输出传递的单词列表
        }
    }, [words]);

    // 计算下次复习日期
    const getNextReviewDate = (learningCount) => {
        const daysToAdd = learningCount === 1 ? 1 : (learningCount === 2 ? 3 : (learningCount === 3 ? 6 : 10));  // 每次增加的天数
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);  // 更新复习日期
        return nextReviewDate.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD
    };

    // 更新学习次数并设置下一次复习日期
    const updateWordData = async (word) => {
        try {
            // 获取当前的学习次数
            const learningCount = word.learningCount || 0;
            const updatedLearningCount = learningCount + 1; // 增加学习次数

            // 计算新的复习日期
            const nextReviewDate = getNextReviewDate(updatedLearningCount);

            // 更新单词数据
            await WordStorageService.updateLearningCount(word.id, updatedLearningCount);
            await WordStorageService.updateNextReviewDate(word.id, nextReviewDate);

            console.log(`Word ${word.word} updated. Learning count: ${updatedLearningCount}, Next review date: ${nextReviewDate}`);
        } catch (error) {
            console.error('Error updating word data:', error);
        }
    };

    // 处理“学习更多”按钮点击事件，跳转到 Learn 页面并更新所有单词的学习数据
    const handleLearnMore = async () => {
        try {
            // 对每个单词更新学习次数和复习日期
            for (const word of words) {
                await updateWordData(word);
            }

            // 跳转到 Learn 页面
            navigation.reset({
                index: 0,
                routes: [{ name: 'Learn' }] // 跳转到 Learn 页面，并重置栈
            });
        } catch (error) {
            console.error('Error updating words and navigating:', error);
        }
    };

    // 处理“回到主页”按钮点击事件，跳转到 HomePage 页面
    const handleGoHome = async () => {
        try {
            // 对每个单词更新学习次数和复习日期
            for (const word of words) {
                await updateWordData(word);
            }

            // 跳转到 HomePage 页面
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }] // 跳转到 HomePage 页面，并重置栈
            });
        } catch (error) {
            console.error('Error updating words and navigating:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>学习完成！</Text>

            {/* 如果传递了单词，显示每个单词 */}
            <ScrollView style={styles.scrollContainer}>
                {words && words.map((word, index) => (
                    <View key={index} style={styles.wordContainer}>
                        {/* 判断如果 notation 不为 null 就显示 notation，否则显示 word */}
                        <Text style={styles.word}>
                            {word.notation ? word.notation : word.word}
                        </Text>
                        <Text style={styles.translation}>{word.trans}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* 显示两个按钮 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLearnMore} style={styles.button}>
                    <Text style={styles.buttonText}>学习更多</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGoHome} style={styles.button}>
                    <Text style={styles.buttonText}>回到主页</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollContainer: {
        width: '100%',
    },
    wordContainer: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    word: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    translation: {
        fontSize: 16,
        color: '#777',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#2b4eff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default FinishComponent;
