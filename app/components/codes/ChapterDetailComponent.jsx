import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // 引入图标组件
import axios from 'axios';
import Sound from 'react-native-sound'; // 引入 react-native-sound

const PrefixApi = 'http://192.168.31.10:808/deslre';

const url = {
    getPageData: '/codes/getPageData',
};

const ChapterDetailComponent = ({ route, navigation }) => {
    const { id, chapterNumber, itemsPerChapter } = route.params;

    const [words, setWords] = useState([]); // 单词列表
    const [currentIndex, setCurrentIndex] = useState(0); // 当前单词索引
    const [showTranslation, setShowTranslation] = useState(false); // 是否显示翻译
    const [loading, setLoading] = useState(false); // 加载状态
    const [sound, setSound] = useState(); // 音频播放

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

    // 播放音频
    const playSound = (url) => {
        const sound = new Sound(url, null, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                return;
            }
            sound.play(() => {
                console.log('Sound finished playing');
            });
        });

        setSound(sound);
    };

    // 当前单词数据
    const currentWord = words[currentIndex];

    return (
        <View style={styles.container}>
            {/* 顶部导航 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>第 {chapterNumber} 章单词刷题</Text>
            </View>

            {/* 内容区域 */}
            <View style={styles.content}>
                {loading ? (
                    <Text style={styles.loadingText}>加载中...</Text>
                ) : currentWord ? (
                    <>
                        {/* 单词 */}
                        <Text style={styles.wordText}>{currentWord.word}</Text>

                        {/* 释义 */}
                        <TouchableOpacity
                            style={styles.translationContainer}
                            onPress={() => setShowTranslation(!showTranslation)}
                        >
                            <Text style={styles.translationText}>
                                {showTranslation ? currentWord.trans : '点击查看释义'}
                            </Text>
                        </TouchableOpacity>

                        {/* 发音按钮 */}
                        <View style={styles.audioContainer}>
                            <TouchableOpacity
                                onPress={() => playSound(currentWord.amerPronoun)}
                                style={styles.audioButton}
                            >
                                <Icon name="volume-up" size={24} color="#fff" />
                                <Text style={styles.audioText}>美式</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => playSound(currentWord.britishPronoun)}
                                style={styles.audioButton}
                            >
                                <Icon name="volume-up" size={24} color="#fff" />
                                <Text style={styles.audioText}>英式</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 导航按钮 */}
                        <View style={styles.navigationContainer}>
                            <TouchableOpacity
                                onPress={goToPreviousWord}
                                disabled={currentIndex === 0}
                                style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                            >
                                <Text style={styles.navButtonText}>上一个</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={goToNextWord}
                                disabled={currentIndex === words.length - 1}
                                style={[styles.navButton, currentIndex === words.length - 1 && styles.disabledButton]}
                            >
                                <Text style={styles.navButtonText}>下一个</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={styles.noDataText}>没有更多单词了！</Text>
                )}
            </View>
        </View>
    );
};

export default ChapterDetailComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b4eff',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        position: 'absolute',
        left: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    audioContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        width: '60%',
    },
    audioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        width: '48%',
    },
    audioText: {
        color: '#fff',
        marginLeft: 5,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    navButton: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#4caf50',
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
