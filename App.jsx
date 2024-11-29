/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RootPage from './app/page/root/RootPage';  // 你的 BottomTab 导航器
import LoginScreen from './app/page/login/LoginScreen'; // 登录页面
import RegisterScreen from './app/page/login/RegisterScreen';

// 创建 Stack Navigator
const AppStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false, // 隐藏 header
      }
    },
    BottonNavigator: {
      screen: RootPage, // BottonNavigator 作为另一个页面
      navigationOptions: {
        headerShown: false, // 隐藏 header
      }
    },
    Register:{
      screen:RegisterScreen,
      navigationOptions: {
        headerShown: false, // 隐藏 header
      }
    }
  },
  {
    initialRouteName: 'Login',  // 默认加载登录页面
    mode: 'modal',
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);