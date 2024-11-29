import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from '../page/home/HomePage';
import HomePage from '../page/home/HomePage';
import CatePage from '../page/cate/CatePage';
import MinePage from '../page/mine/MinePage';
import LoginScreen from '../page/login/LoginScreen';
import ProfilePage from '../page/profile/ProfilePage';
import RegisterScreen from '../page/login/RegisterScreen';

// 创建栈导航器
const AppNavigator = createStackNavigator(
    {
        // 定义所有页面的路由
        Login: LoginScreen,
        Home: HomePage,
        Cate: CatePage,
        Mine: MinePage,
        Profile: ProfilePage,
        Register: RegisterScreen
    }
    // {
    //     initialRouteName: 'Login',  // 默认加载登录页面
    // }
);

// 创建并导出应用容器
export default createAppContainer(AppNavigator);
