import React from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';  // 使用FontAwesome6图标库

const CodePage = () => {
    const [index, setIndex] = React.useState(0);

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Recent"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="favorite"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="cart"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text h1>Recent   <FontAwesomeIcon name="java" size={30} color="red" /></Text>

                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text h1>Favorite  <FontAwesomeIcon name="neos" size={30} color="red" /></Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>
        </>
    );
};

export default CodePage;