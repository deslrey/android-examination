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
import PhoneRegister from './app/page/login/PhoneRegister';
import EmailRegiste from './app/page/login/EmailRegister';
import RegisterButton from './app/page/login/RegisterButton';
import Test from './app/page/test/Test';

// 创建 Stack Navigator
const AppStack = createStackNavigator(
  {
    // 登录界面的路由注册
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false, // 隐藏 header
      }
    },

    // 主界面路由
    BottonNavigator: {
      screen: RootPage, // BottonNavigator 作为另一个页面
      navigationOptions: {
        headerShown: false, // 隐藏 header
      }
    },

    // 注册路由
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false, // 隐藏 header
      }
    },

    // 手机号注册
    PhoneRegister: {
      screen: PhoneRegister,
      navigationOptions: {
        headerShown: false
      }
    },

    // 邮箱注册
    EmailRegiste: {
      screen: EmailRegiste,
      navigationOptions: {
        headerShown: false
      }
    },
    RegisterButton: {
      screen: RegisterButton,
      navigationOptions: {
        headerShown: false
      }
    },
    Test: {
      screen: Test,
      navigationOptions: {
        headerShown: false
      }
    }

  },
  {
    initialRouteName: 'Test',  // 默认加载登录页面
    mode: 'modal',
    headerMode: 'none'
  }
);

export default createAppContainer(AppStack);