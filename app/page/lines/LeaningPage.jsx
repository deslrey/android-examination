import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Tab, TabView, Text, Card } from '@rneui/themed';
import axios from 'axios';

const PrefixApi = 'http://192.168.31.10:808/deslre';
const url = {
    getAllWordBooks: '/books/getAllWordBooks',
};

export default function LearningPage() {
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
            title: language,
            topics: Object.entries(tagData).map(([tag, books]) => ({
                id: tag,
                title: tag,
                description: `包含 ${books.length} 本书。`,
                books,
            })),
        }));
    };

    const getAllWordBooks = async () => {
        try {
            const response = await axios.get(
                PrefixApi + url.getAllWordBooks
            );
            console.log('result ======> ', response.data);
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
                                    <Card key={book.id} containerStyle={styles.card}>
                                        <Text h3>{book.bookName}</Text>
                                        <Text style={styles.bookDetails}>包含单词数：{book.wordSum}</Text>
                                        <Text style={styles.bookDetails}>语言分类：{book.languageCategory}</Text>
                                        <Text style={styles.bookDetails}>标签：{book.tags}</Text>
                                    </Card>
                                ))
                            ) : (
                                <Text style={styles.placeholderText}>请选择一个小类以查看详情。</Text>
                            )}
                        </ScrollView>
                    </TabView.Item>
                ))}
            </TabView>
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
});
