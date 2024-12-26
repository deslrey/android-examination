import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import WordStorageService from '../../db/WordStorageService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReviewComponent = ({ navigation }) => {
    const [wordsToReview, setWordsToReview] = useState([]); // 用来存储今天需要复习的单词列表

    useEffect(() => {
        // 获取所有单词并筛选出需要复习的单词
        const fetchWordsToReview = async () => {
            try {
                // 获取所有存储的单词
                const allWords = await WordStorageService.getWords();

                // 获取今天的日期（格式：YYYY-MM-DD）
                const today = new Date().toISOString().split('T')[0];

                // 筛选出 nextReviewDate 等于今天的单词
                const wordsToReviewToday = allWords.filter(word => word.nextReviewDate === today);

                setWordsToReview(wordsToReviewToday);  // 更新状态
            } catch (error) {
                console.error('Error fetching words to review:', error);
            }
        };

        fetchWordsToReview();  // 调用函数获取需要复习的单词
    }, []);

    // 处理单词复习按钮点击事件
    const handleReviewWord = async (word) => {
        try {
            const updatedLearningCount = word.learningCount + 1;  // 增加学习次数
            const nextReviewDate = getNextReviewDate(updatedLearningCount);  // 获取新的复习日期

            // 更新单词数据
            await WordStorageService.updateLearningCount(word.id, updatedLearningCount);
            await WordStorageService.updateNextReviewDate(word.id, nextReviewDate);

            console.log(`Word ${word.word} reviewed. Learning count: ${updatedLearningCount}, Next review date: ${nextReviewDate}`);
            // 更新状态，重新获取需要复习的单词
            const updatedWords = await WordStorageService.getWords();
            const wordsToReviewToday = updatedWords.filter(word => word.nextReviewDate === today);
            setWordsToReview(wordsToReviewToday);
        } catch (error) {
            console.error('Error reviewing word:', error);
        }
    };

    // 计算下次复习日期
    const getNextReviewDate = (learningCount) => {
        const daysToAdd = learningCount === 1 ? 1 : (learningCount === 2 ? 3 : (learningCount === 3 ? 6 : 10));  // 每次增加的天数
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);  // 更新复习日期
        return nextReviewDate.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD
    };

    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>今天的复习</Text>
            </View>

            {/* 内容区域 */}
            {wordsToReview.length > 0 ? (
                <ScrollView style={styles.scrollContainer}>
                    {wordsToReview.map((word, index) => (
                        <View key={index} style={styles.wordContainer}>
                            <Text style={styles.word}>{word.word}</Text>
                            <Text style={styles.translation}>{word.trans}</Text>

                            {/* 点击按钮进行复习 */}
                            <TouchableOpacity
                                onPress={() => handleReviewWord(word)}  // 复习该单词
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>标记为复习</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                // 没有单词需要复习时居中显示
                <View style={styles.centeredContainer}>
                    <Text style={styles.noWordsText}>今天没有需要复习的单词</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 主轴方向居中
        backgroundColor: '#2b4eff',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        position: 'absolute', // 绝对定位
        left: 16, // 距离左侧一定距离
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    scrollContainer: {
        padding: 16,
    },
    wordContainer: {
        marginBottom: 16,
        backgroundColor: '#eef2ff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    button: {
        backgroundColor: '#2b4eff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    noWordsText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',  // 使文字居中
        fontWeight: 'bold',  // 设置文字加粗
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',  // 垂直居中
        alignItems: 'center',  // 水平居中
    },
});

export default ReviewComponent;
