import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

// 使用 require 加载本地图片
const image = require('../../static/images/lbl.png'); // 根据当前文件相对路径


const App = () => (
    <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
            <Text style={styles.text}>Inside</Text>
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0" // 使用 backgroundColor 替换 background
    }
});

export default App;
