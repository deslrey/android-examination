import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // 使用FontAwesome6图标库
import Mater from 'react-native-vector-icons/MaterialCommunityIcons';

const CodePage = () => {
    const [data, setData] = useState([
        {
            id: '1',
            title: 'Java',
            icon: <Icon name="java" size={30} />,
            subItems: [
                { id: '1-1', title: 'Introduction to Java' },
                { id: '1-2', title: 'Java for Backend Development' },
            ],
        },
        {
            id: '2',
            title: 'Go',
            icon: <Mater name="language-go" size={30} />,
            subItems: [
                { id: '2-1', title: 'Getting Started with Go' },
                { id: '2-2', title: 'Go for Microservices' },
            ],
        },
        {
            id: '3',
            title: 'Python',
            icon: <Mater name="language-python" size={30} />,
            subItems: [
                { id: '3-1', title: 'Python Basics' },
                { id: '3-2', title: 'Data Science with Python' },
            ],
        },
    ]);

    // 记录哪些父类是展开的
    const [expanded, setExpanded] = useState({});

    // 切换展开状态
    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // 子类点击事件
    const handleSubItemPress = (subItem) => {
        console.log(`Clicked on ${subItem.title}`);
        // 这里可以添加导航或其他逻辑
    };

    // 渲染子类
    const renderSubItems = (subItems) => {
        return subItems.map((subItem) => (
            <TouchableOpacity
                key={subItem.id}
                style={styles.subItemContainer}
                onPress={() => handleSubItemPress(subItem)}
            >
                <Text style={styles.subItemText}>{subItem.title}</Text>
            </TouchableOpacity>
        ));
    };

    // 渲染每个父类
    const renderItem = ({ item }) => {
        const isExpanded = expanded[item.id];
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={styles.titleRow}
                    onPress={() => toggleExpand(item.id)}
                >
                    {item.icon}
                    <Text style={styles.titleText}>{item.title}</Text>
                </TouchableOpacity>
                {isExpanded && <View style={styles.subItemsContainer}>{renderSubItems(item.subItems)}</View>}
            </View>
        );
    };

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
    },
    itemContainer: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    subItemsContainer: {
        marginTop: 10,
        paddingLeft: 20,
    },
    subItemContainer: {
        marginVertical: 5,
    },
    subItemText: {
        fontSize: 16,
        color: '#555',
    },
});

export default CodePage;
