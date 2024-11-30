import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity, // 导入TouchableOpacity
} from 'react-native';

const DATA = [];
const DATA2 = [];

const Item = ({ title }) => (
    <TouchableOpacity style={styles.item} onPress={() => console.log('我被点击了Item1')}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
);

const Item2 = ({ title }) => (
    <TouchableOpacity style={styles.item2} onPress={() => console.log('我被点击了Item2')}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
);

const HomePage = () => {

    const add = () => {
        for (let index = 1; index <= 20; index++) {
            let obj = {
                id: index,
                title: 'Third Item' + index
            }
            DATA2.push(obj);
        }
    };

    const add2 = () => {
        for (let index = 1; index <= 20; index++) {
            let obj = {
                id: index,
                title: 'Third Item' + index
            }
            DATA.push(obj);
        }
    };

    add();
    add2();

    return (
        <View style={styles.mainContainer}>
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
    mainContainer: {
        flex: 1, // 使用flex布局让容器占满屏幕
    },
    container: {
        // marginBottom: '55%',
        flex: 1, // 使用flex布局让容器占满屏幕
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
        borderRadius: 11,
    },
    item2: {
        backgroundColor: '#4facfe',
        padding: 20,
        margin: 8, // 调整间距
        flex: 1, // 在行内均分空间
        maxWidth: '48%', // 限制每列的最大宽度
        alignItems: 'center', // 内容居中
        borderRadius: 11,
    },
    dividingLine: {
        padding: 5,
        fontSize: 20,
        textAlign: 'center'
    },
    title: {
        fontSize: 16,
    },
});

export default HomePage;
