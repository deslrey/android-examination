import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import WordStorageService from '../../db/WordStorageService';

const Test = () => {
    const [words, setWords] = useState([]); // 用于存储获取到的单词列表
    const [loading, setLoading] = useState(true);

    // 获取保存的单词列表
    const loadWords = async () => {
        setLoading(true);
        const savedWords = await WordStorageService.getWords();
        console.log('words ========> ', words);

        setWords(savedWords);
        setLoading(false);
    };

    // 增：保存新单词
    const handleSaveWord = () => {
        const newWord = {
            id: new Date().getTime().toString(), // 使用当前时间戳作为单词ID
            bookId: 1,
            word: `新单词 - ${new Date().toLocaleTimeString()}`,
            notation: null,
            trans: '新的单词翻译',
            pronounce: null,
            amerPronoun: 'https://dict.youdao.com/dictvoice?audio=newword&type=0',
            britishPronoun: 'https://dict.youdao.com/dictvoice?audio=newword&type=1',
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
        };

        WordStorageService.saveWord(newWord);
        Alert.alert('提示', '新单词已保存');
        loadWords(); // 更新单词列表
    };

    // 删：删除某个单词
    const handleDeleteWord = (wordId) => {
        WordStorageService.deleteWord(wordId);
        Alert.alert('提示', '单词已删除');
        loadWords(); // 更新单词列表
    };

    // 改：更新单词信息
    const handleUpdateWord = (wordId) => {
        const updatedWord = {
            trans: '更新后的翻译',
            amerPronoun: 'https://dict.youdao.com/dictvoice?audio=updatedword&type=0',
            britishPronoun: 'https://dict.youdao.com/dictvoice?audio=updatedword&type=1',
        };

        WordStorageService.updateWord(wordId, updatedWord);
        Alert.alert('提示', '单词已更新');
        loadWords(); // 更新单词列表
    };

    // 查：查看单词详情
    const handleViewWord = (word) => {
        Alert.alert('单词详情', `单词: ${word.word}\n翻译: ${word.trans}\n美式发音: ${word.amerPronoun}\n英式发音: ${word.britishPronoun}`);
    };

    // 清空所有单词
    const handleClearAllWords = async () => {
        await WordStorageService.clearAllWords();
        Alert.alert('提示', '所有单词已清空');
        loadWords(); // 更新单词列表
    };

    useEffect(() => {
        loadWords(); // 初始化时加载单词列表
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>增删改查单词操作测试</Text>

            <Button title="添加新单词" onPress={handleSaveWord} />
            <Button title="清空所有单词" onPress={handleClearAllWords} />

            <ScrollView style={styles.wordList}>
                {loading ? (
                    <Text>加载中...</Text>
                ) : (
                    words.map((word) => (
                        <View key={word.id} style={styles.wordItem}>
                            <Text>{word.word}</Text>
                            <Text>翻译: {word.trans}</Text>

                            <Button title="查看详情" onPress={() => handleViewWord(word)} />
                            <Button title="更新单词" onPress={() => handleUpdateWord(word.id)} />
                            <Button title="删除单词" onPress={() => handleDeleteWord(word.id)} />
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    wordList: {
        marginTop: 20,
    },
    wordItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default Test;
