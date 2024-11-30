import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';

const DATA = [
    {
        id: '1',
        title: 'First Item1',
    },
    {
        id: '2',
        title: 'Second Item2',
    },
    {
        id: '3', 
        title: 'Third Item3',
    },
    {
        id: '4', 
        title: 'Third Item4',
    },
    {
        id: '5', 
        title: 'Third Item5',
    },
    {
        id: '6', 
        title: 'Third Item6',
    },
    {
        id: '7', 
        title: 'Third Item7',
    },
    {
        id: '8', 
        title: 'Third Item8',
    },
    {
        id: '9', 
        title: 'Third Item9',
    }, 
    {
        id: '10', 
        title: 'Third Item10',
    }
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const MinePage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList horizontal
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#4facfe',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        height:50
    },
    title: {
        fontSize: 16,
    },
});

export default MinePage;