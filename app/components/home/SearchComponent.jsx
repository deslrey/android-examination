import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

const SearchComponent = () => {

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <View style={styles.searchView}>
            <SearchBar
                style={styles.searchBar}
                placeholder="搜索商品"
                onChangeText={updateSearch}
                value={search}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchView: {
        margin: 10,

    },
    searchBar: {
        borderRadius: 16
    }
});

export default SearchComponent;