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
        tabBarLabel: '', // 去掉文字标签
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesomeIcon 
            name={focused ? "house" : "house-chimney"} // 根据激活状态切换图标
            size={30} 
            color={tintColor} 
          />
        ),
      },
    },
    Cate: {
      screen: CatePage,
      navigationOptions: {
        tabBarLabel: '', // 去掉文字标签
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesomeIcon 
            name={focused ? "list-alt" : "list-ul"} // 根据激活状态切换图标
            size={30} 
            color={tintColor} 
          />
        ),
      },
    },
    Mine: {
      screen: MinePage,
      navigationOptions: {
        tabBarLabel: '', // 去掉文字标签
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesomeIcon 
            name={focused ? "user-circle" : "user"} // 根据激活状态切换图标
            size={30} 
            color={tintColor} 
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false, // 确保完全不显示文字标签
      activeTintColor: '#4F8EF7',
      inactiveTintColor: '#888',
    },
  }
);

export default BottonNavigator;
