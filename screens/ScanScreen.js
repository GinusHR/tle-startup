import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';


// const [items, setItems] = useState([])


export default function ScanScreen() {
    useEffect(() => {
        (async () => {
            try {
                console.log("Collecting info")
                // setItems(list);
                console.log("List found")
            } catch (error) {
                console.log("AAAAAAAAAAAAAAAAAAgh", error)
            }
        })();
    }, []);
    return (
        <View>
            <Text>Scan</Text>
        </View>
    );
}