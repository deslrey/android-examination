import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from '@rneui/themed';

// 模拟数据
const Data = [
    { id: 1, title: '我的订单' },
    { id: 2, title: '我的收藏' },
    { id: 3, title: '账户设置' },
    { id: 4, title: '我的钱包' },
    { id: 5, title: '邀请好友' },
];

const Item = ({ title, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
);

const MinePage = () => {
    const avatarClick = () => {
        console.log('头像被点击了');
    };

    const handleItemPress = (title) => {
        console.log(`${title} 被点击`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* 头像部分 */}
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={100}
                        rounded
                        title="Fc"
                        containerStyle={styles.avatar}
                        onPress={avatarClick}
                    />
                    <Text style={styles.username}>张三</Text> 
                    <Text style={styles.userInfo}>邮箱: zhangsan@example.com</Text> 
                    <Text style={styles.userInfo}>手机号: 138****1234</Text>
                </View>

                {/* 个人简介部分 */}
                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>个人简介：热爱编程，喜欢探索新技术，目标是成为一名全栈开发工程师！</Text>
                </View>

                {/* 功能项列表 */}
                <FlatList
                    data={Data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Item title={item.title} onPress={() => handleItemPress(item.title)} />
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollViewContainer: {
        paddingBottom: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        backgroundColor: '#8fd3f4', // 头像区域背景色
        paddingVertical: 40,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        backgroundColor: '#8fd3f4',
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    userInfo: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    bioContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bioText: {
        fontSize: 16,
        color: '#333',
        fontStyle: 'italic',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    item: {
        backgroundColor: '#38f9d7',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default MinePage;
