import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';  // 导入image crop picker

const { width } = Dimensions.get('window');  // 获取屏幕宽度

const ProfilePage = () => {
    const navigation = useNavigation();

    const [avatarUri, setAvatarUri] = useState(require('../../static/avatars/avatar.jpg'));  // 初始头像

    const user = {
        name: '张三',
        gender: '男',
        accountId: '1234567890',
        phone: '13812345678',
        email: 'zhangsan@example.com',
    };

    const updateName = () => {
        navigation.navigate('updateName')
    }

    const updateGender = () => {
        navigation.navigate('updateGender')
    }

    const updatePhone = () => {
        navigation.navigate('updatePhone')
    }

    const updateEmail = () => {
        navigation.navigate('updateEmail')
    }

    // 头像点击事件，弹出选择框
    const avatarClick = () => {
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

    // 选择头像来源
    const chooseAvatar = (source) => {
        const options = {
            cropping: true,
            width: 300,
            height: 300,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            compressImageQuality: 0.7,
        };

        if (source === 'library') {
            ImagePicker.openPicker(options)
                .then((image) => {
                    setAvatarUri({ uri: image.path });  // 设置头像 URI
                })
                .catch((error) => {
                    console.log('图片选择错误: ', error);
                });
        } else if (source === 'camera') {
            ImagePicker.openCamera(options)
                .then((image) => {
                    setAvatarUri({ uri: image.path });  // 设置头像 URI
                })
                .catch((error) => {
                    console.log('拍照错误: ', error);
                });
        }
    };

    return (
        <View style={styles.container}>
            {/* 用户头像 */}
            <TouchableOpacity onPress={avatarClick}>
                <Image source={avatarUri} style={styles.avatar} />
            </TouchableOpacity>

            {/* 用户信息 */}
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoRow} onPress={updateName} activeOpacity={1}>
                    <Text style={styles.infoLabel}>昵称</Text>
                    <Text style={styles.infoValue}>{user.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updateGender} activeOpacity={1}>
                    <Text style={styles.infoLabel}>性别</Text>
                    <Text style={styles.infoValue}>{user.gender}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow}>
                    <Text style={styles.infoLabel}>账户ID</Text>
                    <Text style={styles.infoValue}>{user.accountId}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updatePhone} activeOpacity={1}>
                    <Text style={styles.infoLabel}>手机号</Text>
                    <Text style={styles.infoValue}>{user.phone}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updateEmail} activeOpacity={1}>
                    <Text style={styles.infoLabel}>邮箱</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                </TouchableOpacity>
            </View>

            {/* 退出登录按钮 */}
            <Button
                title="退出登录"
                buttonStyle={styles.logoutButton}
                titleStyle={styles.logoutButtonTitle}
                onPress={() => console.log('退出登录')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    avatar: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        borderWidth: 3,
        borderColor: '#00bcd4',
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    infoLabel: {
        fontSize: 16,
        color: '#757575',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#f43b47',
        width: 250,
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 5,
    },
    logoutButtonTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center'
    },
});

export default ProfilePage;
