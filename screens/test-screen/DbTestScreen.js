import React, { useEffect, useState } from 'react';
import {View, Text, Button, TextInput, FlatList, StyleSheet, ScrollView} from 'react-native';
import { initDatabase, insertItem, getItems, deleteItem, getAllUsers, insertUser, deleteUser } from '../../database';

export default function DbTestScreen() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (async () => {
            try {
                console.log("Start database init");
                await initDatabase();
                console.log("Database is geinitialiseerd");
                const itemData = await getItems();
                const userData = await getAllUsers();
                console.log("Items uit DB:", itemData);
                setItems(itemData);
                setUsers(userData);
            } catch (error) {
                console.error("Fout bij init:", error);
            }
        })();
    }, []);





    // const handleAddItems = async () => {
    //     if (!name.trim()) return;
    //     await insertItem(name);
    //     const data = await getItems();
    //     setItems(data);
    //     setName('');
    // };

    const handleAddUsers = async () => {
        if(!username.trim() && !email.trim()) return;
        console.log("User toevoegen");
        await insertUser(username, email, password);
        const data = await getAllUsers();
        setUsers(data);
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const handleDelete = async (id) => {
        await deleteUser(id);
        const data = await getAllUsers();
        setItems(data);
    };

    return (
        <View style={styles.container}>
            {/*<Text style={styles.header}>SQLite Item Test</Text>*/}
            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    placeholder="Nieuw item"*/}
            {/*    value={name}*/}
            {/*    onChangeText={setName}*/}
            {/*/>*/}
            {/*<Button title="Toevoegen" onPress={handleAddItems} />*/}
            {/*<FlatList*/}
            {/*    data={items}*/}
            {/*    keyExtractor={(item) => item.id.toString()}*/}
            {/*    renderItem={({ item }) => (*/}
            {/*        <View style={styles.item}>*/}
            {/*            <Text>Items</Text>*/}
            {/*            <Text>{item.name}</Text>*/}
            {/*            <Button title="X" onPress={() => handleDelete(item.id)} />*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*/>*/}
            <Text style={styles.header}>SQLite User Test</Text>
            <TextInput
                style={styles.input}
                placeholder="Naam"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Toevoegen" onPress={handleAddUsers} />
            <FlatList
                data={users}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
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
