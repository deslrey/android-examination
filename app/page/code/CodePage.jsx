import React, { useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';  // 使用FontAwesome6图标库
import Mater from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CodePage = () => {

    const [count, setCount] = useState(0)

    const onPress = () => setCount(prveCount => prveCount + 1)

    return (
        <View style={styles.container}>
            <View style={styles.countContainer}>
                <Text h1>Count : {count}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text><Icon name='java' size={30} /></Text>
                <Text><Mater name='language-go' size={30}/></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        height: 50
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    }
});

export default CodePage;