import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker'; // 导入 image crop picker
import Icon from 'react-native-vector-icons/FontAwesome6'; // 引入图标组件
import UserStorageService from '../../db/UserStorageService'; // 导入 UserStorageService

const { width } = Dimensions.get('window');  // 获取屏幕宽度

const ProfilePage = () => {
    const navigation = useNavigation();

    const [avatarUri, setAvatarUri] = useState(require('../../static/avatars/avatar.jpg')); // 默认头像
    const [user, setUser] = useState({});  // 用户信息的状态

    useEffect(() => {
        const loadUserAvatar = async () => {
            try {
                const storedAvatar = await UserStorageService.getUserAvatar();
                const storeUser = await UserStorageService.getUserInfo();
                setUser(storeUser)
                console.log('从本地存储获取到的头像:', storedAvatar); // 打印头像路径或数据
                if (storedAvatar) {
                    // 如果头像是 Base64 格式
                    if (storedAvatar.startsWith('data:image')) {
                        setAvatarUri({ uri: storedAvatar });
                    } else {
                        // 如果头像是文件路径
                        setAvatarUri({ uri: storedAvatar });
                    }
                }
            } catch (error) {
                console.error('加载头像时出错:', error);
            }
        };

        loadUserAvatar();
    }, []);  // 组件加载时只执行一次

    const updateName = () => {
        navigation.navigate('updateName');
    };

    const updateGender = () => {
        navigation.navigate('updateGender');
    };

    const updatePhone = () => {
        navigation.navigate('updatePhone');
    };

    const updateEmail = () => {
        navigation.navigate('updateEmail');
    };

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
                    console.log('选择的头像路径:', image.path); // 打印路径
                    setAvatarUri({ uri: image.path });  // 设置头像 URI
                    UserStorageService.saveUserAvatar(image.path);  // 保存文件路径
                })
                .catch((error) => {
                    console.log('图片选择错误: ', error);
                });
        } else if (source === 'camera') {
            ImagePicker.openCamera(options)
                .then((image) => {
                    console.log('拍照的头像路径:', image.path); // 打印路径
                    setAvatarUri({ uri: image.path });  // 设置头像 URI
                    UserStorageService.saveUserAvatar(image.path);  // 保存文件路径
                })
                .catch((error) => {
                    console.log('拍照错误: ', error);
                });
        }
    };


    return (
        <View style={styles.container}>
            {/* 顶部导航栏 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>个人资料</Text>
            </View>

            {/* 用户头像 */}
            <TouchableOpacity onPress={avatarClick}>
                <Image source={avatarUri} style={styles.avatar} />
            </TouchableOpacity>

            {/* 用户信息 */}
            <View style={styles.infoContainer}>
                <TouchableOpacity style={styles.infoRow}>
                    <Text style={styles.infoLabel}>账户ID</Text>
                    <Text style={styles.infoValue}>{user.accountId || '未设置'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updateName} activeOpacity={1}>
                    <Text style={styles.infoLabel}>昵称</Text>
                    <Text style={styles.infoValue}>{user.name || '未设置'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updateGender} activeOpacity={1}>
                    <Text style={styles.infoLabel}>性别</Text>
                    <Text style={styles.infoValue}>{user.gender || '未设置'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updatePhone} activeOpacity={1}>
                    <Text style={styles.infoLabel}>手机号</Text>
                    <Text style={styles.infoValue}>{user.phone || '未设置'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.infoRow} onPress={updateEmail} activeOpacity={1}>
                    <Text style={styles.infoLabel}>邮箱</Text>
                    <Text style={styles.infoValue}>{user.email || '未设置'}</Text>
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
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b4eff',
        width: '100%',
        paddingVertical: 12,
    },
    backButton: {
        position: 'absolute',
        left: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    avatar: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        borderWidth: 3,
        borderColor: '#00bcd4',
        marginBottom: 10,
        marginTop: 10
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
        textAlign: 'center',
    },
});

export default ProfilePage;
