import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';

const DATA = [];
const DATA2 = [];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const Item2 = ({ title }) => (
    <View style={styles.item2}>
        <Text style={styles.title}>{title}</Text>
    </View>
);



const HomePage = () => {


    const add = () => {
        for (let index = 1; index <= 20; index++) {
            let obj = {
                id: index,
                title: 'Third Item' + index
            }
            DATA2.push(obj)
        }
    }
    const add2 = () => {
        for (let index = 1; index <= 20; index++) {
            let obj = {
                id: index,
                title: 'Third Item' + index
            }
            DATA.push(obj)
        }
    }
    add()
    add2()

    return (
        <View>
            <SafeAreaView>
                <FlatList
                    horizontal
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <Text style={styles.dividingLine}>=========占位========</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA2}
                    renderItem={({ item }) => <Item2 title={item.title} />}
                    keyExtractor={item => item.id}
                    numColumns={2} // 每行显示两个项目
                    contentContainerStyle={styles.listContent} // 设置内容样式
                />
            </SafeAreaView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1, // 父容器占满屏幕高度
        marginBottom: '50%',
        marginTop: StatusBar.currentHeight || 0, // 避免状态栏遮挡
    },
    listContent: {
        paddingHorizontal: 8, // 列表内边距
    },
    item: {
        backgroundColor: '#38f9d7',
        padding: 20,
        margin: 8, // 调整间距
        flex: 1, // 在行内均分空间
    },
    item2: {
        backgroundColor: '#4facfe',
        padding: 20,
        margin: 8, // 调整间距
        flex: 1, // 在行内均分空间
        maxWidth: '48%', // 限制每列的最大宽度
        alignItems: 'center', // 内容居中
    },
    title: {
        fontSize: 16,
    },
});


export default HomePage;