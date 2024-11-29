// src/profile/ProfilePage.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfilePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>这是个人资料页面</Text>
            <Button
                title="返回首页"
                onPress={() => navigation.navigate('Home')}  // 跳转到 Home 页面
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfilePage;
