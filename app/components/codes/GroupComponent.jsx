import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';


const PrefixApi = 'http://192.168.31.10:808/deslre';
const url = {
    getCodeData: '/codes/getCodeData',
};

const GroupComponent = ({ route }) => {
    const { id, total } = route.params;

    // 获取数据并设置到 state
    const getCodeData = async () => {
        try {
            const response = await axios.post(
                PrefixApi + url.getCodeData,
                { id: id },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            const result = response.data;

            console.log('result ======> ', result);


            if (result.code === 200) {

            } else {
                console.error('Error fetching data:', result.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Group Component</Text>
            <Text style={styles.text}>ID: {id}</Text>
            <Text style={styles.text}>Sum: {total}</Text>
            <Button onPress={getCodeData}>点我</Button>
        </View>
    );
};

export default GroupComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});
