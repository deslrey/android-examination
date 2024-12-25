import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GroupComponent = ({ route }) => {
    const { id } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Group Component</Text>
            <Text style={styles.text}>ID: {id}</Text>
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
