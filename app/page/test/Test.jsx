import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import StorageService from '../../db/StorageService';


const Test = () => {
    const [books, setBooks] = useState([]); // 用于存储获取到的书本列表
    const [loading, setLoading] = useState(true);

    // 获取保存的书本列表
    const loadBooks = async () => {
        setLoading(true);
        const savedBooks = await StorageService.getBooks();
        setBooks(savedBooks);
        setLoading(false);
    };

    // 增：保存新书本
    const handleSaveBook = () => {
        const newBook = {
            id: new Date().getTime().toString(), // 使用当前时间戳作为书本ID
            bookName: `新书本 - ${new Date().toLocaleTimeString()}`,
            wordSum: Math.floor(Math.random() * 100), // 随机生成单词数量
            languageCategory: '英语',
            tags: '词汇',
        };

        StorageService.saveBook(newBook);
        Alert.alert('提示', '新书本已保存');
        loadBooks(); // 更新书本列表
    };

    // 删：删除某本书
    const handleDeleteBook = (bookId) => {
        StorageService.deleteBook(bookId);
        Alert.alert('提示', '书本已删除');
        loadBooks(); // 更新书本列表
    };

    // 改：更新书本信息
    const handleUpdateBook = (bookId) => {
        const updatedBook = {
            bookName: '更新后的书名',
            wordSum: Math.floor(Math.random() * 1000), // 随机生成新的单词数量
            languageCategory: '法语',
            tags: '新标签',
        };

        StorageService.updateBook(bookId, updatedBook);
        Alert.alert('提示', '书本已更新');
        loadBooks(); // 更新书本列表
    };

    // 查：查看书本详情
    const handleViewBook = (book) => {
        Alert.alert('书本详情', `书名: ${book.bookName}\n单词数: ${book.wordSum}\n语言分类: ${book.languageCategory}\n标签: ${book.tags}`);
    };

    useEffect(() => {
        loadBooks(); // 初始化时加载书本列表
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>增删改查操作测试</Text>

            <Button title="添加新书本" onPress={handleSaveBook} />
            <ScrollView style={styles.bookList}>
                {loading ? (
                    <Text>加载中...</Text>
                ) : (
                    books.map((book) => (
                        <View key={book.id} style={styles.bookItem}>
                            <Text>{book.bookName}</Text>
                            <Text>标签: {book.tags}</Text>
                            <Text>语言: {book.languageCategory}</Text>
                            <Text>单词数: {book.wordSum}</Text>

                            <Button title="查看详情" onPress={() => handleViewBook(book)} />
                            <Button title="更新书本" onPress={() => handleUpdateBook(book.id)} />
                            <Button title="删除书本" onPress={() => handleDeleteBook(book.id)} />
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
    bookList: {
        marginTop: 20,
    },
    bookItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default Test;
