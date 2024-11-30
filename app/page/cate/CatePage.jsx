import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { Avatar, ListItem } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const CatePage = ({ navigation }) => {


    const btn = () => {
        console.log('我被点击了');
        navigation.navigate('Login'); // 登录成功后跳转到 BottonNavigator

    }


    return (
        <>
            <ListItem
                onPress={btn}
                linearGradientProps={{
                    colors: ["#FF9800", "#F44336"],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                }}
                ViewComponent={LinearGradient}
            >
                <Avatar
                    rounded
                    source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
                />
                <ListItem.Content>
                    <ListItem.Title style={{ color: "white", fontWeight: "bold" }}>
                        Chris Jackson
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: "white" }}>
                        Vice Chairman
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="white" />
            </ListItem>
        </>
    )
}



export default CatePage;
