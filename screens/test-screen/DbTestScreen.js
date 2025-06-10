import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { initDatabase, insertItem, getItems, deleteItem } from '../../database';

export default function DbTestScreen() {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        (async () => {
            await initDatabase();
            const data = await getItems();
            setItems(data);
        })();
    }, []);

    const showItems = async () => {
        const data = await getItems();
        setItems(data);
    }

    const handleAdd = async () => {
        if (!title.trim()) return;
        await insertItem(title);
        const data = await getItems();
        setItems(data);
        setTitle('');
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        const data = await getItems();
        setItems(data);
    };
    showItems();
    return (
        <View style={styles.container}>
            <Text style={styles.header}>SQLite Async</Text>
            <TextInput
                style={styles.input}
                placeholder="Nieuw item"
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Toevoegen" onPress={handleAdd} />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Button title="X" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
    item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
});
