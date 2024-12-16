import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // 使用 NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // 使用 Stack Navigator
import LoginScreen from './app/page/login/LoginScreen'; // 登录页面
import RegisterScreen from './app/page/login/RegisterScreen';
import PhoneRegister from './app/page/login/PhoneRegister';
import EmailRegiste from './app/page/login/EmailRegister';
import RegisterButton from './app/page/login/RegisterButton';
import Test from './app/page/test/Test';
import HomePage from './app/page/home/HomePage';

// 引入 MessageProvider
import { MessageProvider } from './app/utils/Message';
import LearnComponent from './app/components/LearnComponent';
import ReviewComponent from './app/components/ReviewComponent';

const Stack = createStackNavigator(); // 创建 Stack Navigator

const App = () => {
  return (
    <MessageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PhoneRegister" component={PhoneRegister} options={{ headerShown: false }} />
          <Stack.Screen name="EmailRegiste" component={EmailRegiste} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterButton" component={RegisterButton} options={{ headerShown: false }} />
          <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Learn" component={LearnComponent} options={{ headerShown: false }} />
          <Stack.Screen name="Review" component={ReviewComponent} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MessageProvider>
  );
};

export default App;
