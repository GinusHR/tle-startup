import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, Pressable, Alert} from 'react-native';




export default function ScanScreen({items, currentUser}) {
    // const [localItems, setLocalItems] = useState([])
    // const [quantities, setQuantities] = useState({});
    //
    // useEffect(() => {
    //     const fetchItems = async () => {
    //         const dbItems = await getItems();
    //         setLocalItems(dbItems);
    //
    //         // Initialiseer hoeveelheden op 0 per item
    //         const initial = {};
    //         dbItems.forEach(item => {
    //             initial[item.id] = 0;
    //         });
    //         setQuantities(initial);
    //     };
    //     fetchItems();
    // }, []);

    // const increment = () => setAmount(q => q + 1)
    // const decrement = () => setAmount(q => Math.max(0, q - 1))

    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelectItem = (item) => {
        setSelectedItems((prevSelected) => {
            const alreadySelected = prevSelected.find((i) => i.id === item.id);
            if (alreadySelected) {
                return prevSelected.filter((i) => i.id !== item.id);
            } else {
                return [...prevSelected, item];
            }
        });
    };

    const bevestigKeuze = async () => {
        if (!currentUser) {
            Alert.alert("Fout", "Geen gebruiker ingelogd.");
            return;
        }

        if (selectedItems.length === 0) {
            Alert.alert("Let op", "Je hebt nog geen items geselecteerd.");
            return;
        }

        try {
            // 1. Lijst aanmaken
            const response = await db.runAsync(
                'INSERT INTO lists (user_id, done) VALUES (?, ?);',
                currentUser.id, 0
            );
            const listId = response.lastInsertRowId;

            // 2. Voeg elk geselecteerd item toe aan list_items
            for (const item of selectedItems) {
                await insertList(listId, item.id, 1); // default quantity = 1
            }

            Alert.alert("Succes", "Je lijst is opgeslagen!");
            setSelectedItems([]); // reset selectie
        } catch (error) {
            console.error("Fout bij bevestigen keuze:", error);
            Alert.alert("Fout", "Er ging iets mis bij het opslaan.");
        }
    };

    const renderItem = ({ item }) => {
        const selected = selectedItems.some((i) => i.id === item.id);
        return (
            <View style={[styles.itemContainer, selected && styles.selectedItem]}>
                <Text>{item.name} (€{item.value.toFixed(2)})</Text>
                <Button
                    title={selected ? "Verwijder" : "Voeg toe"}
                    onPress={() => toggleSelectItem(item)}
                    color={selected ? "#8b0000" : "#2F4538"}
                />
            </View>
        );
    };

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
