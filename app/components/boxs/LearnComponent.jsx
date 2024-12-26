import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import WordStorageService from '../../db/WordStorageService';
import Icon from 'react-native-vector-icons/FontAwesome5'; // 引入FontAwesome5的图标组件
import Sound from 'react-native-sound'; // 引入音频库

const LearnComponent = () => {
    const [words, setWords] = useState([]); // 存储单词列表
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // 当前显示的单词索引
    const [showDefinition, setShowDefinition] = useState(false); // 控制是否显示释义

    // 获取10个没有学习过的单词
    useEffect(() => {
        loadWords();
    }, []);

    const loadWords = async () => {
        const words = await WordStorageService.getWords();
        const notLearnedWords = words.filter(word => word.learningCount === 0);
        setWords(notLearnedWords.slice(0, 10)); // 获取前10个未学习的单词
    };

    // 播放发音
    const playSound = (url) => {
        const sound = new Sound(url, null, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                return;
            }
            sound.play((success) => {
                if (!success) {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        });
    };

    // 显示下一个单词
    const nextWord = () => {
        if (currentWordIndex + 1 < words.length) {
            setCurrentWordIndex(currentWordIndex + 1); // 下一个单词
            setShowDefinition(false); // 重置是否显示释义
        } else {
            Alert.alert('学习完成！', '你已完成所有单词的学习！');
        }
    };

    const currentWord = words[currentWordIndex];

    return (
        <View style={styles.container}>
            {/* 显示notation, word, trans */}
            {currentWord?.notation && (
                <Text style={styles.notation}>{currentWord?.notation}</Text>
            )}
            <Text style={styles.word}>{currentWord?.word}</Text>

            {/* 音频播放的喇叭 */}
            <View style={styles.audioContainer}>
                {/* 如果pronounce不为null，则播放pronounce */}
                {currentWord?.pronounce ? (
                    <TouchableOpacity onPress={() => playSound(currentWord?.pronounce)}>
                        <Icon name="volume-up" size={24} color="#2b4eff" />
                    </TouchableOpacity>
                ) : (
                    // 如果pronounce为null，显示amerPronoun和britishPronoun的两个喇叭
                    <>
                        {currentWord?.amerPronoun && (
                            <TouchableOpacity onPress={() => playSound(currentWord?.amerPronoun)}>
                                <Icon name="volume-up" size={24} color="#2b4eff" style={styles.iconSpacing} />
                            </TouchableOpacity>
                        )}
                        {currentWord?.britishPronoun && (
                            <TouchableOpacity onPress={() => playSound(currentWord?.britishPronoun)}>
                                <Icon name="volume-up" size={24} color="#2b4eff" style={styles.iconSpacing} />
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>

            {/* 释义区域 */}
            <View style={styles.definitionContainer}>
                <ScrollView contentContainerStyle={styles.definitionScrollView}>
                    {/* 显示被模糊的释义，点击后显示完整释义 */}
                    {!showDefinition ? (
                        <TouchableOpacity onPress={() => setShowDefinition(true)} style={styles.definitionToggle}>
                            <Text style={styles.definition}>点击查看释义</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.definition}>{currentWord?.trans}</Text>
                    )}
                </ScrollView>
            </View>

            {/* 下一个单词按钮 */}
            <TouchableOpacity onPress={nextWord} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>下一个单词</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    notation: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 15,
    },
    word: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    audioContainer: {
        flexDirection: 'row', // 将音频图标横向排列
        marginBottom: 30,
    },
    iconSpacing: {
        marginLeft: 15, // 设置图标之间的间距
    },
    definitionContainer: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 8,
        marginBottom: 40,
        width: '85%',
        alignItems: 'center',
        height: 150, // 增加释义区域的高度
        justifyContent: 'center',
    },
    definitionScrollView: {
        flexGrow: 1, // 使内容在ScrollView中充满区域
        justifyContent: 'center',
    },
    definitionToggle: {
        // backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    definition: {
        fontSize: 20,
        color: '#777',
        textAlign: 'center',
        paddingHorizontal: 20, // 给释义增加左右内边距，让文字不显得紧凑
    },
    nextButton: {
        backgroundColor: '#2b4eff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 30,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default LearnComponent;
