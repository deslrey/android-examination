import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';  // 使用FontAwesome6图标库
import ImagePicker from 'react-native-image-crop-picker';  // 导入image crop picker

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

const MinePage = ({ navigation }) => {
    const [username, setUsername] = useState('张三');  // 用户名
    const [email, setEmail] = useState('zhangsan@example.com'); // 邮箱
    const [phone, setPhone] = useState('138****1234');  // 手机号
    const [avatarUri, setAvatarUri] = useState(null); // 头像 URI

    const avatarClick = () => {
        // 弹出选择框：选择图片或拍照
        Alert.alert('更换头像', '请选择头像来源', [
            {
                text: '从相册选择',
                onPress: () => chooseAvatar('library'),
            },
            {
                text: '拍照',
                onPress: () => chooseAvatar('camera'),
            },
            {
                text: '取消',
                style: 'cancel',
            },
        ]);
    };


    // 跳转到设置界面
    const Jumpsite = () => {
        console.log('Jumpsite,我被点击了');

        if (navigation === null) {
            console.log('navigation为NULL,跳转失败');
        }

        navigation.navigate('SitePage')
    }

    const chooseAvatar = (source) => {
        const options = {
            cropping: true,  // 启用裁剪功能
            width: 300,      // 裁剪后的宽度
            height: 300,     // 裁剪后的高度
            compressImageMaxWidth: 300,  // 压缩后图片的最大宽度
            compressImageMaxHeight: 300, // 压缩后图片的最大高度
            compressImageQuality: 0.7,   // 压缩图片质量
        };

        if (source === 'library') {
            ImagePicker.openPicker(options)
                .then((image) => {
                    setAvatarUri(image.path);  // 设置头像 URI
                })
                .catch((error) => {
                    console.log('图片选择错误: ', error);
                });
        } else if (source === 'camera') {
            ImagePicker.openCamera(options)
                .then((image) => {
                    setAvatarUri(image.path);  // 设置头像 URI
                })
                .catch((error) => {
                    console.log('拍照错误: ', error);
                });
        }
    };

    const handleItemPress = (title) => {
        console.log(`${title} 被点击`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                {/* 头像部分 */}
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={100}
                        rounded
                        source={avatarUri ? { uri: avatarUri } : undefined}  // 如果有头像 URI，使用该头像
                        title={!avatarUri ? 'Fc' : undefined}  // 默认显示字母，如果没有选择头像
                        containerStyle={styles.avatar}
                        onPress={avatarClick}
                    />
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.userInfo}>邮箱: {email}</Text>
                    <Text style={styles.userInfo}>手机号: {phone}</Text>
                </View>

                <View style={styles.bioContainer}>
                    <Text style={styles.bioText}>个人简介: 买买买</Text>
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
            </View>

            {/* 设置按钮 */}
            <TouchableOpacity style={styles.settingsButton} onPress={Jumpsite}>
                <FontAwesomeIcon name="ellipsis" size={30} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    mainContainer: {
        flex: 1,  // 确保这个容器占满剩余的空间
    },
    avatarContainer: {
        alignItems: 'center',
        backgroundColor: '#8fd3f4',
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
    settingsButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#38f9d7',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
    },
});

export default MinePage;
