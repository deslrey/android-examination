import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';

import axios from 'axios';

const HomePage = () => {


    const getStudentData = () => {
        axios.get('http://192.168.31.10:808/deslre/test/dev1').then(
            response => {
                console.log('成功了------> ', response.data);
            },
            error => {
                console.log('失败了------> ', error);
            }
        )
    }

    const btn = () => {
        fetch('http://192.168.31.10:808/deslre/test/dev1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(res => {
            console.log(res)
        })
    }

    return (
        <View style={styles.view}>
            <Text>Home Page</Text>
            <Button title='点我发送请求' onPress={getStudentData} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: 200,
        width: 200,
        backgroundColor: "#84fab0"
    }
})

export default HomePage;
