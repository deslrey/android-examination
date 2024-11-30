import HomePage from "../home/HomePage";
import CatePage from "../cate/CatePage";
import MinePage from "../mine/MinePage";
import { createBottomTabNavigator } from "react-navigation-tabs";


const BottonNavigator = createBottomTabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: '首页',
            tabBarLabel: '首页'
        }
    },
    Cate: {
        screen: CatePage,
        navigationOptions: {
            title: '分类',
            tabBarLabel: '分类',
        },
    },
    Mine: {
        screen: MinePage,
        navigationOptions: {
            title: '我的',
            tabBarLabel: '我的',
        }
    },

}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: 18
        }
    }
})

export default BottonNavigator;