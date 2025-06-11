import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { initDatabase, insertItem, getItems, deleteItem, getAllUsers, insertUser, deleteUser } from '../../database';

export default function DbTestScreen() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (async () => {
            await initDatabase();
            console.log("Database is geinitialiseerd")
            const itemData = await getItems();
            const userData = await getAllUsers();
            console.log("Items uit DB:", itemData);
            setItems(itemData);
            set
        })();
    }, []);

    const showItems = async () => {
        const itemData = await getItems();
        setItems(itemData);
    }

    const showUsers = async () => {

    }

    const handleAdd = async () => {
        if (!name.trim()) return;
        await insertItem(name);
        const data = await getItems();
        setItems(data);
        setName('');
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        const data = await getItems();
        setItems(data);
    };
    showItems();
    showUsers();
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
                        <Text>{item.name}</Text>
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
