import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PrefixApi = 'http://192.168.31.10:808/deslre';

const url = {
    getPageData: '/codes/getPageData',
};

const BrushCodeComponent = ({ route }) => {
    const { id, chapterNumber, itemsPerChapter } = route.params;

    const [words, setWords] = useState([]); // 单词列表
    const [currentIndex, setCurrentIndex] = useState(0); // 当前单词索引
    const [showTranslation, setShowTranslation] = useState(false); // 是否显示翻译
    const [loading, setLoading] = useState(false); // 加载状态

    // 获取当前章节的单词数据
    const getPageData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                PrefixApi + url.getPageData,
                { bookId: id, page: chapterNumber, size: itemsPerChapter },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            const result = response.data;

            if (result.code === 200) {
                setWords(result.data); // 设置单词列表
            } else {
                console.error('Error fetching data:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // 初始化加载数据
    useEffect(() => {
        getPageData();
    }, []);

    // 切换到下一个单词
    const goToNextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowTranslation(false); // 重置显示状态
        }
    };

    // 切换到上一个单词
    const goToPreviousWord = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowTranslation(false); // 重置显示状态
        }
    };

    // 当前单词数据
    const currentWord = words[currentIndex];

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>加载中...</Text>
            ) : currentWord ? (
                <>
                    <Text style={styles.wordText}>{currentWord.word}</Text>
                    <TouchableOpacity
                        style={styles.translationContainer}
                        onPress={() => setShowTranslation(true)}
                    >
                        <Text style={styles.translationText}>
                            {showTranslation ? currentWord.trans : '点击查看释义'}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.navigationContainer}>
                        <TouchableOpacity
                            onPress={goToPreviousWord}
                            disabled={currentIndex === 0}
                            style={[
                                styles.navButton,
                                currentIndex === 0 && styles.disabledButton,
                            ]}
                        >
                            <Text style={styles.navButtonText}>上一个</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={goToNextWord}
                            disabled={currentIndex === words.length - 1}
                            style={[
                                styles.navButton,
                                currentIndex === words.length - 1 && styles.disabledButton,
                            ]}
                        >
                            <Text style={styles.navButtonText}>下一个</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text style={styles.noDataText}>没有更多单词了！</Text>
            )}
        </View>
    );
};

export default BrushCodeComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    loadingText: {
        fontSize: 18,
        color: '#888',
    },
    wordText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    translationContainer: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    translationText: {
        fontSize: 24,
        color: '#666',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    navButton: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    navButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    noDataText: {
        fontSize: 18,
        color: '#333',
    },
});
