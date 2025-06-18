import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, Pressable} from 'react-native';




export default function ScanScreen({items}) {
    const [localItems, setLocalItems] = useState([])
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        if (items && items.length > 0) {
            console.log("Collecting info");
            console.log("List found", items);
            setLocalItems(items);
        }
    }, [items]);

    const increment = () => setAmount(q => q + 1)
    const decrement = () => setAmount(q => Math.max(0, q - 1))

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Kies het aantal flessen dat u wilt afleveren</Text>
            <FlatList
                data={localItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text>{item.name}</Text>
                    <View style={styles.fn}>
                        <Pressable onPress={increment} style={styles.button}>
                            <Text style={styles.bText}>+</Text>
                        </Pressable>
                        <Text>{amount}</Text>
                        <Pressable onPress={decrement} style={styles.button}>
                            <Text style={styles.bText}>-</Text>
                        </Pressable>
                    </View>
                </View>
            )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
    item: { flexDirection: 'row', justifyContent: "space-around", paddingVertical: 10 },
    fn: { flexDirection: 'row', gap: 10, width: 30 },
    button: { backgroundColor: '#1F3A3D', borderRadius: 8, width: 20, alignContent: "center" },
    bText: { color: '#fff', fontWeight: "bold" }
});
