import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BoxComponent = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.box} onPress={onPress}>
            <Text style={styles.boxText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: 150,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    boxText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BoxComponent;
