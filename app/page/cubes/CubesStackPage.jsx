import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { Component } from 'react';
import WordStorageService from '../../db/WordStorageService';


export class CubesStackPage extends Component {
    state = {
        words: [],
        currentTab: 'total', // 当前选中的标签: total, learned, notLearned, familiar
    };

    // 在组件挂载时获取所有单词数据
    componentDidMount() {
        this.loadWords();
    }

    // 获取单词数据
    loadWords = async () => {
        try {
            const words = await WordStorageService.getWords();
            this.setState({ words });
        } catch (error) {
            console.error('Error loading words:', error);
        }
    };

    // 计算不同类别的单词数
    getTotalWordsCount = () => {
        return this.state.words.length;
    };

    getLearnedWordsCount = () => {
        return this.state.words.filter((word) => word.learningCount > 0).length;
    };

    getNotLearnedWordsCount = () => {
        return this.state.words.filter((word) => word.learningCount === 0).length;
    };

    getFamiliarWordsCount = () => {
        return this.state.words.filter((word) => word.isFamiliar).length;
    };

    // 渲染不同标签的内容
    renderTabContent = () => {
        const { currentTab, words } = this.state;
        let filteredWords = [];

        switch (currentTab) {
            case 'learned':
                filteredWords = words.filter((word) => word.learningCount > 0);
                return this.renderWordsList(filteredWords, '已学单词');
            case 'notLearned':
                filteredWords = words.filter((word) => word.learningCount === 0);
                return this.renderWordsList(filteredWords, '未学单词');
            case 'familiar':
                filteredWords = words.filter((word) => word.isFamiliar);
                return this.renderWordsList(filteredWords, '标熟单词');
            default:
                return this.renderWordsList(words, '所有单词');
        }
    };

    // 渲染单词列表
    renderWordsList = (words, title) => {
        if (words.length === 0) {
            return <Text>没有相关单词。</Text>;
        }

        return (
            <View>
                {/* <Text style={styles.listTitle}>{title}</Text> */}
                <ScrollView>
                    {words.map((word) => (
                        <View key={word.id} style={styles.wordItem}>
                            <Text style={styles.wordText}>{word.word}</Text>
                            <Text style={styles.wordDetails}>翻译: {word.trans}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };

    // 切换标签
    handleTabChange = (tab) => {
        this.setState({ currentTab: tab });
    };

    render() {
        return (
            <View style={styles.container}>
                {/* 导航栏 */}
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => this.handleTabChange('total')}>
                        <Text style={[styles.navItem, this.state.currentTab === 'total' && styles.activeTab]}>
                            总数
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleTabChange('learned')}>
                        <Text style={[styles.navItem, this.state.currentTab === 'learned' && styles.activeTab]}>
                            已学
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleTabChange('notLearned')}>
                        <Text style={[styles.navItem, this.state.currentTab === 'notLearned' && styles.activeTab]}>
                            未学
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleTabChange('familiar')}>
                        <Text style={[styles.navItem, this.state.currentTab === 'familiar' && styles.activeTab]}>
                            标熟
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 标签内容 */}
                <View style={styles.tabContent}>
                    {this.renderTabContent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
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
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
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
    separator: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginVertical: 8,
    },
});

export default CubesStackPage;
