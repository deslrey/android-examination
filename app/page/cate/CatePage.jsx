import React from 'react'
import { StyleSheet, Text, View } from 'react-native';



const CatePage = () => {
    return (
        <View style={styles.view}>
            <Text>Cate Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: 200,
        width: 200,
        backgroundColor: "#8ec5fc"
    },
    text: {
        fontSize: 30
    }
})

export default CatePage;
