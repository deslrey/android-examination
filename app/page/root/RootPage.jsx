import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomePage from "../home/HomePage";
import CatePage from "../cate/CatePage";
import MinePage from "../mine/MinePage";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6'; // 引入图标

const BottonNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: {
                title: '首页',
                tabBarLabel: '', // 去掉文字标签
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesomeIcon name="house-chimney" size={30} color={tintColor} /> // 设置图标
                ),
            },
        },
        Cate: {
            screen: CatePage,
            navigationOptions: {
                title: '分类',
                tabBarLabel: '', // 去掉文字标签
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesomeIcon name="list-ul" size={30} color={tintColor} /> // 设置图标
                ),
            },
        },
        Mine: {
            screen: MinePage,
            navigationOptions: {
                title: '我的',
                tabBarLabel: '', // 去掉文字标签
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesomeIcon name="user" size={30} color={tintColor} /> // 设置图标
                ),
            },
        },
    },
    {
        tabBarOptions: {
            showLabel: false, // 确保完全不显示文字标签
            labelStyle: {
                fontSize: 10,
            },
            // 图标选中时的颜色
            activeTintColor: '#4F8EF7',
            // 图标未选中时的颜色
            inactiveTintColor: '#888',
        },
    }
);

export default BottonNavigator;
