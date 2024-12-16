import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const SignInButton = ({ hasSignedIn, onSignIn }) => {
    return (
        <View style={styles.signInContainer}>
            {hasSignedIn ? (
                <Text style={styles.signedInText}>今日已签到</Text>
            ) : (
                <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
                    <Text style={styles.signInText}>签到</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    signInContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '30%',
    },
    signInButton: {
        backgroundColor: 'rgba(98, 0, 238, 0.6)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    signInText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signedInText: {
        color: '#6200EE',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SignInButton;
