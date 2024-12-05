import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const listData = [
    { id: 1, title: '个人资料' }, { id: 2, title: '账户与安全' }, { id: 3, title: '消息管理与通知' }, { id: 4, title: '青少年模式' },
    { id: 5, title: '应用权限' }, { id: 6, title: '隐私' }, { id: 7, title: '隐私' }, { id: 8, title: '关于Deslre' },
]

const Item = ({ title, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
);

const SitePage = () => {

    const arrowClick = () => {
        console.log('返回上一页');
    }

    const handleItemPress = (title) => {
        console.log(`${title} 被点击`);
    };

    return (
        <>
            <View style={styles.headerContainer}>
                <FontAwesome6Icon style={styles.arrowLeft} name='arrow-left' onPress={arrowClick} />
                <Text style={styles.siteText}>设置</Text>
            </View>

            <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>
                    <FlatList
                        data={listData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <Item title={item.title} onPress={() => handleItemPress(item.title)} />
                        )}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    mainContainer: {
        flex: 1,  // 确保这个容器占满剩余的空间
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
    siteText: {
        fontSize: 25,
        color: '#2af598',
        textAlign: 'center', // 使文字居中
        flexGrow: 1, // 使文本在容器中填充剩余空间
        paddingRight: '10%'
    },
    arrowLeft: {
        fontSize: 20,
        paddingLeft: '5%'
    },
    headerContainer: {
        flexDirection: 'row',  // 将图标和文本排列成一行
        alignItems: 'center',  // 垂直居中
        width: '100%',  // 宽度为屏幕宽度
        paddingVertical: 10,
    }
});

export default SitePage;
