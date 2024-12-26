import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // 使用 NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // 使用 Stack Navigator

// 引入 MessageProvider
import { MessageProvider } from './app/utils/Message';

import LoginScreen from './app/page/login/LoginScreen'; // 登录页面
import RegisterScreen from './app/page/login/RegisterScreen';
import PhoneRegister from './app/page/login/PhoneRegister';
import EmailRegiste from './app/page/login/EmailRegister';
import RegisterButton from './app/page/login/RegisterButton';
import Test from './app/page/test/Test';
import HomePage from './app/page/home/HomePage';
import LearnComponent from './app/components/boxs/LearnComponent';
import ReviewComponent from './app/components/boxs/ReviewComponent';
import CodePage from './app/page/code/CodePage';
import CubesStackPage from './app/page/cubes/CubesStackPage';
import LeaningPage from './app/page/lines/LeaningPage';
import ProfilePage from './app/page/profile/ProfilePage';
import EmailComponent from './app/components/profile/EmailComponent';
import GenderComponent from './app/components/profile/GenderComponent';
import NameComponent from './app/components/profile/NameComponent';
import PhoneComponent from './app/components/profile/PhoneComponent';
import ChapterDetailComponent from './app/components/codes/ChapterDetailComponent';
import GroupComponent from './app/components/codes/GroupComponent';

const Stack = createStackNavigator(); // 创建 Stack Navigator

const App = () => {
  return (
    <MessageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Test">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PhoneRegister" component={PhoneRegister} options={{ headerShown: false }} />
          <Stack.Screen name="EmailRegiste" component={EmailRegiste} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterButton" component={RegisterButton} options={{ headerShown: false }} />
          <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen
            name="Learn"
            component={LearnComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Review" component={ReviewComponent} options={{ headerShown: false }} />
          <Stack.Screen name="Code" component={CodePage} options={{
            headerShown: false,
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],  // 从屏幕底部到顶部
                      }),
                    },
                  ],
                },
              };
            },
          }} />
          <Stack.Screen name="CubesStack" component={CubesStackPage} options={{
            headerShown: false,
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],  // 从屏幕底部到顶部
                      }),
                    },
                  ],
                },
              };
            },
          }} />
          <Stack.Screen name="Leaning" component={LeaningPage} options={{
            headerShown: false, cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],  // 从屏幕底部到顶部
                      }),
                    },
                  ],
                },
              };
            },
          }} />

          {/* ProfilePage 这里是重点修改 */}
          <Stack.Screen name="Profile" component={ProfilePage} options={{
            headerShown: false,
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-layouts.screen.width, 0],  // 从屏幕左侧滑入
                      }),
                    },
                  ],
                },
              };
            },
          }} />
          <Stack.Screen name="updateEmail" component={EmailComponent} options={{ title: '修改邮箱' }} />
          <Stack.Screen name="updateGender" component={GenderComponent} options={{ headerShown: false }} />
          <Stack.Screen name="updateName" component={NameComponent} options={{ headerShown: false }} />
          <Stack.Screen name="updatePhone" component={PhoneComponent} options={{ headerShown: false }} />
          <Stack.Screen name="ChapterDetail" component={ChapterDetailComponent} options={{ headerShown: false }} />
          <Stack.Screen name="Group" component={GroupComponent} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </MessageProvider>
  );
};

export default App;
