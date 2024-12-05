import React from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import CartDetail from '../details/CartDetail';
import FavoriteDetail from '../details/FavoriteDetail';
import RecentDetail from '../details/RecentDetail';

const CatePage = () => {
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
                    title="购物车"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="收藏"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="最近"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <CartDetail />
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <FavoriteDetail />
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                    <RecentDetail />
                </TabView.Item>
            </TabView>
        </>
    );
};

export default CatePage;