import React from 'react'

import { Text, View } from 'react-native';

import AntDesign from "react-native-vector-icons/AntDesign";

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function Test() {
    return (
        <View>
            <FontAwesome6 name="rocket" size={30} color="#900" />
            <Text>
                Lorem <FontAwesome6 name="book" color="#4F8EF7" /> Ipsum
            </Text>
        </View>
    )
}
