import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';


const MinePage = () => {

    const avatarClick = () => {
        console.log('头像被点击了');
    }

    return (
        <>
            <ScrollView>
                <View
                    style={styles.avatarStyle}
                >
                    <Avatar
                        size={64}
                        rounded
                        title="Fc"
                        containerStyle={{ backgroundColor: '#8fd3f4', }}
                        onPress={avatarClick}
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    avatarStyle: {
        paddingTop: '1%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    }
})

export default MinePage;