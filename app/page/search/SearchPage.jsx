import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const PrefixApi = 'http://192.168.31.10:808/deslre';


const SearchPage = () => {
    const [searchText, setSearchText] = useState(''); // 搜索框的输入
    const [searchResults, setSearchResults] = useState([]); // 搜索结果
    const [errorMessage, setErrorMessage] = useState(''); // 错误信息

    // 搜索单词函数
    const handleSearch = async () => {
        try {
            setErrorMessage(''); // 清除之前的错误信息
            const response = await axios.post(`${PrefixApi}/words/searchWord`,
                { word: searchText, },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            console.log('response ======> ', response.data);

            if (response.data) {
                setSearchResults(response.data.data || []); // 根据返回格式解析
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            setErrorMessage('搜索失败，请稍后重试');
            console.error(error);
        }
    };

    // 渲染每个单词卡片
    const renderWordCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.word}>{item.word}</Text>
            <Text style={styles.trans}>{item.trans}</Text>
            <Text style={styles.pronounce}>美式发音: {item.amer}</Text>
            <Text style={styles.pronounce}>英式发音: {item.british}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* 搜索框和按钮 */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="输入单词"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>搜索</Text>
                </TouchableOpacity>
            </View>

            {/* 错误提示 */}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            {/* 搜索结果列表 */}
            <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWordCard}
                contentContainerStyle={styles.resultContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    button: {
        marginLeft: 8,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
    resultContainer: {
        paddingTop: 8,
    },
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    word: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    trans: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    pronounce: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
});

export default SearchPage;
