import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Mater from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const PrefixApi = 'http://192.168.31.10:808/deslre';
const url = {
    getCategory: '/books/getCategory',
};

const CodePage = () => {
    const [data, setData] = useState([]);
    const [expanded, setExpanded] = useState({});

    // 获取数据并设置到 state
    const getCategory = async () => {
        try {
            const response = await axios.post(
                PrefixApi + url.getCategory,
                { category: '代码练习' },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            const result = response.data;

            if (result.code === 200) {
                const transformedData = transformData(result.data);
                setData(transformedData);
            } else {
                console.error('Error fetching data:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    // 转换数据结构
    const transformData = (rawData) => {
        const languageIcons = {
            Java: <Icon name="java" size={30} />,
            Python: <Mater name="language-python" size={30} />,
            golang: <Mater name="language-go" size={30} />,
            Cpp: <Mater name="language-cpp" size={30} />,
            JavaScript: <Mater name="language-javascript" size={30} />,
            Linux: <Icon name="linux" size={30} />,
            Csharp: <Mater name="language-csharp" size={30} />,
            SQL: <Fontisto name="mysql" size={30} />,
            AI: <FontAwesome5 name="airbnb" size={30} />,
            // Arduino: <Mater name="arduino" size={30} />,
        };

        return rawData.reduce((acc, item) => {
            const language = item.tags.split('&')[0];
            const icon = languageIcons[language] || <Icon name="book" size={30} />;

            const existingCategory = acc.find((cat) => cat.title === language);
            if (existingCategory) {
                existingCategory.subItems.push({
                    id: `${item.id}`,
                    title: `${item.bookName} `, // 显示单词数量
                    wordSum: item.wordSum,
                });
            } else {
                acc.push({
                    id: `${acc.length + 1}`,
                    title: language,
                    icon,
                    subItems: [
                        {
                            id: `${item.id}`,
                            title: `${item.bookName} `, // 显示单词数量
                            wordSum: item.wordSum,
                        },
                    ],
                });
            }
            return acc;
        }, []);
    };


    // 切换展开状态
    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // 子类点击事件
    const handleSubItemPress = (subItem) => {
        console.log(`Clicked on ${subItem.id}`);
    };

    // 渲染子类
    const renderSubItems = (subItems) => {
        return subItems.map((subItem) => (
            <TouchableOpacity
                key={subItem.id}
                style={styles.subItemContainer}
                onPress={() => handleSubItemPress(subItem)}
            >
                <Text style={styles.subItemText}>
                    {subItem.title} - {subItem.wordSum} 词
                </Text>
            </TouchableOpacity>
        ));
    };


    // 渲染每个父类
    const renderItem = ({ item }) => {
        const isExpanded = expanded[item.id];
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.titleRow} onPress={() => toggleExpand(item.id)}>
                    {item.icon}
                    <Text style={styles.titleText}>{item.title}</Text>
                </TouchableOpacity>
                {isExpanded && <View style={styles.subItemsContainer}>{renderSubItems(item.subItems)}</View>}
            </View>
        );
    };

    // 初始加载数据
    useEffect(() => {
        getCategory();
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};
const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
        backgroundColor: '#ffffff', // 设置背景为白色
    },
    itemContainer: {
        marginBottom: 16,
        backgroundColor: '#eef2ff', // 设置卡片的背景色为浅蓝
        borderRadius: 12, // 增加圆角
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20, // 增加字体大小
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#000000', // 设置字体颜色为深蓝
    },
    subItemsContainer: {
        marginTop: 10,
        paddingLeft: 20,
    },
    subItemContainer: {
        marginVertical: 5,
        backgroundColor: '#ffffff', // 子项目背景为白色
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dce0ff', // 子项目边框颜色为浅蓝
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    subItemText: {
        fontSize: 16,
        color: '#333333', // 深灰色文字
    },
});


export default CodePage;
