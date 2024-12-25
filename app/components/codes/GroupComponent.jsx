import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const GroupComponent = ({ route, navigation }) => {
    const { id, total, title } = route.params;
    const itemsPerChapter = 20; // 每章的项目数量
    const chapters = Math.ceil(total / itemsPerChapter); // 计算章节数

    // 点击章节按钮处理
    const handleChapterPress = (chapterNumber) => {
        const start = (chapterNumber - 1) * itemsPerChapter + 1;
        const end = Math.min(chapterNumber * itemsPerChapter, total);
        navigation.navigate('ChapterDetails', {
            id,
            chapterNumber,
            range: `${start} - ${end}`,
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
            {/* 显示章节信息 */}
            <Text style={styles.header}>{title} - 总共 {chapters} 章</Text>
            {/* 显示章节卡片，2列布局 */}
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
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    chapterList: {
        paddingBottom: 20,
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
        marginBottom: 8,
    },
    chapterSubtitle: {
        fontSize: 14,
        color: '#fff',
    },
});
