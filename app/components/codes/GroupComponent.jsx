import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // 引入图标组件

const GroupComponent = ({ route, navigation }) => {
    const { id, total, title } = route.params;
    const itemsPerChapter = 20; // 每章的项目数量
    const chapters = Math.ceil(total / itemsPerChapter); // 计算章节数

    // 点击章节按钮处理
    const handleChapterPress = (chapterNumber) => {
        const start = (chapterNumber - 1) * itemsPerChapter + 1;
        const end = Math.min(chapterNumber * itemsPerChapter, total);
        navigation.navigate('ChapterDetail', {
            id,
            chapterNumber,
            itemsPerChapter
        });
    };

    // 渲染章节卡片
    const renderChapterItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chapterCard}
            onPress={() => handleChapterPress(item)}
        >
            <Text style={styles.chapterTitle}>第{item}章</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* 顶部导航 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title} - 总共 {chapters} 章</Text>
            </View>

            {/* 章节列表 */}
            <FlatList
                data={Array.from({ length: chapters }, (_, index) => index + 1)}
                keyExtractor={(item) => item.toString()}
                renderItem={renderChapterItem}
                numColumns={2} // 两列布局
                columnWrapperStyle={styles.row} // 每行样式
                contentContainerStyle={styles.chapterList}
            />
        </View>
    );
};

export default GroupComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
    },
    chapterList: {
        padding: 16,
    },
    row: {
        justifyContent: 'space-between', // 卡片左右对齐
        marginBottom: 16,
    },
    chapterCard: {
        flex: 1,
        backgroundColor: '#4caf50',
        marginHorizontal: 8,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // 阴影效果
    },
    chapterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
