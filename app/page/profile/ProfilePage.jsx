import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';

const { width } = Dimensions.get('window');  // 获取屏幕宽度

const ProfilePage = () => {
    const user = {
        name: '张三',
        gender: '男',
        accountId: '1234567890',
        phone: '13812345678',
        email: 'zhangsan@example.com',
        avatar: require('../../static/avatars/avatar.jpg') // 使用本地头像
    };

    return (
        <View style={styles.container}>
            {/* 用户头像 */}
            <Image source={user.avatar} style={styles.avatar} />

            {/* 用户昵称 */}
            <Text h3 style={styles.name}>{user.name}</Text>

            {/* 用户信息 */}
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>性别</Text>
                    <Text style={styles.infoValue}>{user.gender}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>账户ID</Text>
                    <Text style={styles.infoValue}>{user.accountId}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>手机号</Text>
                    <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>邮箱</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                </View>
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
        backgroundColor: '#f0f0f0',  // 更柔和的背景色
    },
    avatar: {
        width: width * 0.3,  // 头像宽度
        height: width * 0.3, // 头像高度
        borderRadius: width * 0.15,  // 圆形头像
        borderWidth: 3,
        borderColor: '#00bcd4', // 添加清新的边框颜色
        marginBottom: 20,
    },
    name: {
        fontWeight: '600',
        fontSize: 24,
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',  // 保证昵称居中
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
        borderBottomColor: '#ddd', // 清新的浅灰色分隔线
        marginBottom: 15,  // 行之间间距
        backgroundColor: '#fff',  // 信息行背景色
        borderRadius: 10, // 圆角
        paddingHorizontal: 15,
    },
    infoLabel: {
        fontSize: 16,
        color: '#757575',  // 浅灰色
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#f43b47',
        width: 250,
        marginTop: 30,
        paddingVertical: 15,
        borderRadius: 5,
    },
    logoutButtonTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center'
    },
});

export default ProfilePage;