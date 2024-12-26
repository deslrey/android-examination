import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import WordStorageService from '../../db/WordStorageService';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // 引入图标组件
import Sound from 'react-native-sound'; // 引入音频库

const CubesStackPage = () => {
    const [words, setWords] = useState([]); // 存储单词数据
    const [currentTab, setCurrentTab] = useState('total'); // 当前选中的标签
    const navigation = useNavigation(); // 获取导航对象

    // 获取单词数据
    useEffect(() => {
        loadWords();
    }, []);

    // 获取所有单词
    const loadWords = async () => {
        try {
            const words = await WordStorageService.getWords();
            setWords(words); // 更新状态
        } catch (error) {
            console.error('Error loading words:', error);
        }
    };

    // 播放发音
    const playPronounce = (pronounceUrl) => {
        // 使用Sound加载音频并播放
        const sound = new Sound(pronounceUrl, null, (error) => {
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

    // 渲染单词列表
    const renderWordsList = (words, title) => {
        if (words.length === 0) {
            return <Text style={{ fontSize: 20, textAlign: 'center' }}>没有相关单词</Text>;
        }

        return (
            <View>
                <ScrollView>
                    {words.map((word) => (
                        <View key={word.id} style={styles.wordItem}>
                            {word.notation && <Text style={styles.wordNotation}>{word.notation}</Text>}
                            <View style={styles.wordRow}>
                                <Text style={styles.wordText}>{word.word}</Text>
                                {/* 如果有发音字段，展示喇叭图标并绑定播放事件 */}
                                {(word.pronounce || word.amerPronoun) && (
                                    <TouchableOpacity onPress={() => playPronounce(word.pronounce || word.amerPronoun)}>
                                        <Icon name="volume-high" size={24} color="#2b4eff" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Text style={styles.wordDetails}>翻译: {word.trans}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };

    // 渲染不同标签的内容
    const renderTabContent = () => {
        let filteredWords = [];
        switch (currentTab) {
            case 'learned':
                filteredWords = words.filter((word) => word.learningCount > 0);
                return renderWordsList(filteredWords, '已学单词');
            case 'notLearned':
                filteredWords = words.filter((word) => word.learningCount === 0);
                return renderWordsList(filteredWords, '未学单词');
            case 'familiar':
                filteredWords = words.filter((word) => word.isFamiliar);
                return renderWordsList(filteredWords, '标熟单词');
            default:
                return renderWordsList(words, '所有单词');
        }
    };

    // 计算不同类别的单词数
    const getTotalWordsCount = () => {
        return words.length;
    };

    const getLearnedWordsCount = () => {
        return words.filter((word) => word.learningCount > 0).length;
    };

    const getNotLearnedWordsCount = () => {
        return words.filter((word) => word.learningCount === 0).length;
    };

    const getFamiliarWordsCount = () => {
        return words.filter((word) => word.isFamiliar).length;
    };

    // 切换标签
    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    // 返回按钮的点击事件
    const handleBackButton = () => {
        navigation.goBack(); // 使用导航返回上一个页面
    };

    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>单词管理</Text>
            </View>

            {/* 标签导航栏 */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => handleTabChange('total')}>
                    <Text style={[styles.navItem, currentTab === 'total' && styles.activeTab]}>
                        总数 ({getTotalWordsCount()})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabChange('learned')}>
                    <Text style={[styles.navItem, currentTab === 'learned' && styles.activeTab]}>
                        已学 ({getLearnedWordsCount()})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabChange('notLearned')}>
                    <Text style={[styles.navItem, currentTab === 'notLearned' && styles.activeTab]}>
                        未学 ({getNotLearnedWordsCount()})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabChange('familiar')}>
                    <Text style={[styles.navItem, currentTab === 'familiar' && styles.activeTab]}>
                        标熟 ({getFamiliarWordsCount()})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 标签内容 */}
            <View style={styles.tabContent}>
                {renderTabContent()}
            </View>
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
        width: '100%',
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
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    navItem: {
        fontSize: 16,
        padding: 10,
        color: '#555',
    },
    activeTab: {
        color: '#2b4eff',
        fontWeight: 'bold',
    },
    tabContent: {
        marginTop: 20,
    },
    wordItem: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    wordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 将单词和喇叭图标放在左右两边
        alignItems: 'center', // 垂直居中对齐
    },
    wordText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    wordDetails: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    wordNotation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CubesStackPage;
