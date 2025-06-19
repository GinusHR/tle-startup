import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Pressable,
    Alert,
    Button,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Platform
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {createListForUser, getListItem, insertIntoList} from "../database";

import Header from '../components/header';

const {width, height} = Dimensions.get("window");
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);


export default function ScanScreen({items, currentUser}) {
    const [selectedItems, setSelectedItems] = useState([]);

    const updateQuantity = (itemId, delta) => {
        setSelectedItems((prev) => {
            const existing = prev.find((i) => i.id === itemId);
            if (existing) {
                const newQuantity = existing.quantity + delta;
                if (newQuantity <= 0) {
                    return prev.filter((i) => i.id !== itemId);
                }
                return prev.map((item) =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                );
            } else if (delta > 0) {
                const newItem = items.find((i) => i.id === itemId);
                return [...prev, { ...newItem, quantity: 1 }];
            }
            return prev;
        });
    };

    const confirmChoice = async () => {
        if (!currentUser) {
            Alert.alert("Fout", "Geen gebruiker ingelogd.");
            return;
        }

        if (selectedItems.length === 0) {
            Alert.alert("Let op", "Je hebt nog geen items geselecteerd.");
            return;
        }


        try {
            console.log("Huidige gebruiker ID:", currentUser.id);
            const listId = await createListForUser(currentUser.id);
            if (!listId) {
                Alert.alert("Fout", "Kon geen lijst aanmaken.");
                return;
            }

            for (const item of selectedItems) {
                console.log("Voeg toe aan list_id:", listId, "item:", item.id, "qty:", item.quantity);
                await insertIntoList(listId, item.id, item.quantity);
            }

            Alert.alert("Succes", "Je lijst is opgeslagen!");
            setSelectedItems([]);
        } catch (error) {
            console.error("Fout bij bevestigen keuze:", error);
            Alert.alert("Fout", "Er ging iets mis bij het opslaan.");
        }
    };

    const renderItem = ({item}) => {
        const selected = selectedItems.find((i) => i.id === item.id);
        const quantity = selected?.quantity || 0;

        return (
            <View style={[styles.itemContainer, quantity > 0 && styles.selectedItem]}>
                <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemValue}>€{item.value.toFixed(2)}</Text>
                </View>
                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => updateQuantity(item.id, -1)}
                    >
                        <Text style={styles.controlText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => updateQuantity(item.id, 1)}
                    >
                        <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const dbChecker =  async () => {
        const response =  await getListItem()
        console.log(response);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    paddingHorizontal: 30,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}
            >
                <Header title="Scan" />
            </View>
            <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: '#FDFDFD'}}>
            <Text style={styles.title}>Kies uw statiegeld</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <View>
                <Pressable
                    onPress={confirmChoice}
                    style={styles.confirmButton}
                >
                    <Text style={styles.confirmText}>Bevestig selectie</Text>
                </Pressable>
            </View>
        </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FDFDFD',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: "#212529",
    },
    pageTitle: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(36),
        fontWeight: "800",
        color: "#212529",
        letterSpacing: -1,
    },
    title: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    itemContainer: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#EDEDED',
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    selectedItem: {
        backgroundColor: '#D6F5D6',
    },
    itemName: {
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemValue: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: '#555',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },
    controlButton: {
        backgroundColor: '#2F4538',
        borderRadius: 200,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    controlText: {
        fontFamily: "Montserrat",
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: 24,
        textAlign: 'center',
    },
    confirmButton: {
        marginBottom: 30,
        borderRadius: 40,
        backgroundColor: "#597364",
        padding: 20,
    },
    confirmText: {
        fontFamily: "Montserrat",
        color: '#fff',
        fontWeight: "bold",
        alignSelf: "center",
    },
});