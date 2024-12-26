import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import WordStorageService from '../../db/WordStorageService';
import Icon from 'react-native-vector-icons/FontAwesome5'; // 引入FontAwesome5的图标组件
import Sound from 'react-native-sound'; // 引入音频库

const LearnComponent = ({ navigation }) => {
    const [words, setWords] = useState([]); // 存储单词列表
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // 当前显示的单词索引
    const [showDefinition, setShowDefinition] = useState(false); // 控制是否显示释义
    const [learnedWords, setLearnedWords] = useState([]); // 存储已学习的单词
    const [unlearnedWords, setUnlearnedWords] = useState([]); // 存储未学习的单词

    // 获取10个没有学习过的单词
    useEffect(() => {
        loadWords();
    }, []);

    const loadWords = async () => {
        const words = await WordStorageService.getWords();
        const notLearnedWords = words.filter(word => word.learningCount === 0);
        setUnlearnedWords(notLearnedWords.slice(0, 10)); // 获取前10个未学习的单词
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

    // 处理“认识”按钮点击事件
    const handleRecognize = () => {
        setLearnedWords([...learnedWords, unlearnedWords[currentWordIndex]]); // 将当前单词添加到已学习的列表
        setShowDefinition(true); // 隐藏释义
    };

    // 处理“不认识”按钮点击事件
    const handleNotRecognize = () => {
        setShowDefinition(true); // 显示释义
    };

    // 轮完一遍后，重新学习未认识的单词
    useEffect(() => {
        if (currentWordIndex >= 10) {
            if (unlearnedWords.length > 0) {
                setUnlearnedWords(unlearnedWords.filter(word => !learnedWords.includes(word))); // 重新显示未认识的单词
                setCurrentWordIndex(0); // 重置索引
                Alert.alert('一轮学习结束', '未认识的单词将重新学习');
            }
        }

        // 判断是否所有单词都学习完成
        if (learnedWords.length === unlearnedWords.length && unlearnedWords.length > 0) {
            Alert.alert('学习完成', '你已完成所有单词的学习！', [
                {
                    text: '确定',
                    onPress: () => {
                        // 重置导航栈，防止用户通过返回键回到学习页面
                        navigation.reset({
                            index: 0,
                            routes: [{
                                name: 'Finish', params: { words: unlearnedWords }  // 将单词列表传递到 Finish 页面
                            }] // 跳转到主页
                        });
                    },
                },
            ]);
        }
    }, [currentWordIndex, learnedWords]);

    const currentWord = unlearnedWords[currentWordIndex];

    // 点击"下一个单词"按钮时切换到下一个单词
    const handleNextWord = () => {
        setCurrentWordIndex(currentWordIndex + 1);
        setShowDefinition(false); // 重置为不显示释义
    };

    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>刷单词</Text>
                {/* 添加进度信息 */}
                <Text style={styles.progressText}>{learnedWords.length}/{unlearnedWords.length}</Text>
            </View>

            {/* 显示notation, word, trans */}
            {currentWord?.notation && (
                <Text style={styles.notation}>{currentWord?.notation}</Text>
            )}
            <Text style={styles.word}>{currentWord?.word}</Text>

            {/* 音频播放的点击文本 */}
            <View style={styles.audioContainer}>
                {/* 如果amer不为null，则点击"美式"文本来播放音标 */}
                {currentWord?.amer && (
                    <TouchableOpacity onPress={() => playSound(currentWord?.amerPronoun)}>
                        <Text style={styles.pronounceText}>美式音标</Text>
                    </TouchableOpacity>
                )}
                {/* 如果british不为null，则点击"英式"文本来播放音标 */}
                {currentWord?.british && (
                    <TouchableOpacity onPress={() => playSound(currentWord?.britishPronoun)}>
                        <Text style={styles.pronounceText}>英式音标: {currentWord.british}</Text>
                    </TouchableOpacity>
                )}
                {currentWord?.pronounce && (
                    <TouchableOpacity onPress={() => playSound(currentWord?.pronounce)}>
                        <Text style={styles.pronounceText}><Icon name='volume-up' size={20} /></Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* 释义区域 */}
            <View style={styles.definitionContainer}>
                <ScrollView contentContainerStyle={styles.definitionScrollView}>
                    {/* 显示被模糊的释义，点击后显示完整释义 */}
                    {!showDefinition ? (
                        <TouchableOpacity onPress={handleNotRecognize} style={styles.definitionToggle}>
                            <Text style={styles.definition}>点击查看释义</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.definition}>{currentWord?.trans}</Text>
                    )}
                </ScrollView>
            </View>

            {/* 判断当前按钮显示 */}
            {showDefinition ? (
                <TouchableOpacity onPress={handleNextWord} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>下一个单词</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleRecognize} style={styles.button}>
                        <Text style={styles.buttonText}>认识</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNotRecognize} style={styles.button}>
                        <Text style={styles.buttonText}>不认识</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        flex: 1, // 使标题居中
    },
    progressText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        position: 'absolute', // 绝对定位
        right: 16, // 距离右侧一定距离
    },
    word: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: "2%"
        // marginBottom: 30,
        // lineHeight: 36,
    },
    notation: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: "10%"
        // marginBottom: 30,
        // lineHeight: 36,
    },
    audioContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'center',
    },
    pronounceText: {
        fontSize: 16,
        color: '#2b4eff',
        marginHorizontal: 15,
        textDecorationLine: 'underline',
    },
    definitionContainer: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 8,
        marginBottom: 40,
        width: '80%',
        alignItems: 'center',
        height: 150,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    definitionScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    definitionToggle: {
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    definition: {
        fontSize: 16,
        color: '#333',
    },
    nextButton: {
        backgroundColor: '#2b4eff',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 30,
        width: '50%', // 给下一按钮添加宽度，确保按钮一致
        alignSelf: 'center', // 居中对齐
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 20,
        alignSelf: 'center', // 居中对齐
        marginTop: 20,

    },
    button: {
        backgroundColor: '#2b4eff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        flex: 1, // 让按钮占满父容器的剩余空间
        marginHorizontal: 5, // 两个按钮之间有空隙
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LearnComponent;
