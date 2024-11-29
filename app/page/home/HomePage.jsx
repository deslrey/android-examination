import React, { useState } from 'react';

import { Button, Dialog, } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

import axios from 'axios';

const PrefixApi = 'http:192.168.31.10:808/deslre'

const HomePage = () => {

    const [visible, setVisible] = useState(false);

    const toggleDialog = async () => {
        setVisible(!visible);
        try {

            const response = await axios({
                method: 'post',
                url: PrefixApi + '/userInfo/login',
                data: {
                    'userName': '111',
                    'passWord': '222'
                }
            })
            console.log('result ======> ', response.data);
        } catch (error) {
            console.error('Request failed: ', error.response || error.message);
        }
    };

    return (
        <View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Open Simple Dialog"
                    onPress={toggleDialog}
                    buttonStyle={styles.button}
                />
            </View>
            <Dialog
                isVisible={visible}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Dialog Title" />
                <Text>Dialog body text. Add relevant information here.</Text>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        width: 220,
        margin: 20,
    },
    buttonContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default HomePage;
