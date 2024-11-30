import React from 'react'

import { Text, View } from 'react-native';


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';

export default function Test() {
    return (
        <View>
            <FontAwesomeIcon name="chess-queen" size={30} color="#900" />
            <Text>
                Lorem <FontAwesomeIcon name="book" color="#4F8EF7" /> Ipsum
            </Text>
        </View>
    )
}
