import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Tab, TabView, Text, Card } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6'; // 用于返回按钮的图标
import StorageService from '../../db/StorageService';
import WordStorageService from '../../db/WordStorageService';
import axios from 'axios';


const PrefixApi = 'http://192.168.31.10:808/deslre';
const url = {
    getAllWordBooks: '/books/getAllWordBooks',
    getWordData: '/words/getWordData',
};

export default function LearningPage({ navigation }) {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0); // 控制大类
    const [activeSubCategory, setActiveSubCategory] = useState(null); // 控制小类
    const [categories, setCategories] = useState([]); // 后端获取的分类数据
    const [loading, setLoading] = useState(true); // 控制加载状态

    // 数据分组函数
    const groupBooksByLanguageAndTags = (books) => {
        const grouped = {};
        books.forEach((book) => {
            const { languageCategory, tags } = book;
            if (!grouped[languageCategory]) {
                grouped[languageCategory] = {};
            }
            if (!grouped[languageCategory][tags]) {
                grouped[languageCategory][tags] = [];
            }
            grouped[languageCategory][tags].push(book);
        });

        // 转换为可用的数据结构
        return Object.entries(grouped).map(([language, tagData]) => ({
            title: mapLanguageName(language),
            topics: Object.entries(tagData).map(([tag, books]) => ({
                id: tag,
                title: tag,
                description: `包含 ${books.length} 本书。`,
                books,
            })),
        }));
    };

    const mapLanguageName = (language) => {
        const languageMap = {
            en: '英语',
            ja: '日语',
            de: '德语',
            id: '印尼语',
            kk: '哈萨克语',
        };
        return languageMap[language] || language;
    };

    const getAllWordBooks = async () => {
        try {
            const response = await axios.get(
                PrefixApi + url.getAllWordBooks
            );
            // console.log('result ======> ', response.data);
            const result = groupBooksByLanguageAndTags(response.data.data);
            setCategories(result);

            // 设置每个大类的小类默认选中第一个
            if (result.length > 0) {
                setActiveSubCategory(result[0].topics[0]?.id || null);
            }
        } catch (error) {
            console.error('请求错误', error);
        } finally {
            setLoading(false);
        }
    };

    // 获取数据并设置到 state
    const getWordData = async (id) => {
        try {
            const response = await axios.post(
                PrefixApi + url.getWordData,
                { bookId: id },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            const result = response.data;

            if (result.code === 200) {
                const data = result.data;

                // 遍历每个单词对象，保存到 AsyncStorage
                for (const word of data) {
                    // 为每个单词添加字段
                    const wordWithFlags = {
                        ...word,
                        isLearned: false,         // 初始时未学习
                        isFamiliar: false,        // 初始时未标熟
                        nextReviewDate: new Date(), // 下一次复习日期默认是当前日期
                        learningCount: 0          // 初始学习次数为 0
                    };

                    // 保存单词到本地存储
                    await WordStorageService.saveWord(wordWithFlags);
                }

                console.log('Words saved successfully!');
            } else {
                console.error('Error fetching data:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };




    const handleCardPress = (book) => {
        // console.log('Clicked Book: ', book);
        WordStorageService.clearAllWords()
        getWordData(book.id)
        // 先清空当前数据信息
        StorageService.clearAllBooks()
        // 保存书籍信息
        StorageService.saveBook(book)
        Alert.alert('保存成功', `书籍 "${book.bookName}" 和相关单词已成功保存！`);
    };

    // 从后端获取数据
    useEffect(() => {
        getAllWordBooks();
    }, []);

    // 渲染内容
    if (loading) {
        return <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />;
    }

    return (
        <>
            {/* 顶部导航 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>学习页面</Text>
            </View>
            {/* 顶部大类 Tab */}
            <Tab
                value={activeCategoryIndex}
                onChange={(index) => {
                    setActiveCategoryIndex(index);
                    setActiveSubCategory(categories[index].topics[0]?.id || null); // 切换大类时默认选中第一个小类
                }}
                indicatorStyle={styles.indicator}
                variant="primary"
            >
                {categories.map((category, idx) => (
                    <Tab.Item
                        key={idx}
                        title={category.title}
                        titleStyle={styles.tabTitle}
                    />
                ))}
            </Tab>

            {/* 对应的 TabView */}
            <TabView value={activeCategoryIndex} onChange={setActiveCategoryIndex} animationType="spring">
                {categories.map((category, idx) => (
                    <TabView.Item key={idx} style={styles.tabViewItem}>
                        <ScrollView>
                            {/* 小类选择横向展示 */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subCategoryContainer}>
                                {category.topics.map((topic) => (
                                    <TouchableOpacity
                                        key={topic.id}
                                        style={[
                                            styles.subCategoryButton,
                                            activeSubCategory === topic.id && styles.subCategoryButtonActive,
                                        ]}
                                        onPress={() => setActiveSubCategory(topic.id)}
                                    >
                                        <Text style={styles.subCategoryText}>{topic.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {activeSubCategory ? (
                                // 找到选中的小类
                                category.topics.find((t) => t.id === activeSubCategory)?.books.map((book) => (
                                    <Card key={book.id} containerStyle={styles.card}
                                    >
                                        <TouchableOpacity onPress={() => handleCardPress(book)}>
                                            <Text h3>{book.bookName}</Text>
                                            <Text style={styles.bookDetails}>包含单词数：{book.wordSum}</Text>
                                            <Text style={styles.bookDetails}>语言分类：{book.languageCategory}</Text>
                                            <Text style={styles.bookDetails}>标签：{book.tags}</Text>
                                        </TouchableOpacity>
                                    </Card>
                                ))
                            ) : (
                                <Text style={styles.placeholderText}>请选择一个小类以查看详情。</Text>
                            )}
                        </ScrollView>
                    </TabView.Item>
                ))}
            </TabView >
        </>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        backgroundColor: 'blue',
        height: 3,
    },
    tabTitle: {
        fontSize: 12,
        color: 'black',
    },
    tabViewItem: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
    languageTitle: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    subCategoryContainer: {
        marginVertical: 10,
    },
    subCategoryButton: {
        padding: 10,
        margin: 5,
        borderRadius: 8,
        backgroundColor: '#ccc',
    },
    subCategoryButtonActive: {
        backgroundColor: '#6200ea',
    },
    subCategoryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        borderRadius: 8,
        marginTop: 20,
        elevation: 3,
    },
    placeholderText: {
        margin: 20,
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    bookDetails: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
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
    }
});
