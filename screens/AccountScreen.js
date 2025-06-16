import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>GEBRUIKER</Text>
                    <Ionicons name="qr-code-outline" size={24} color="#1D1F21" />
                </View>

                <View style={styles.card}>
                    <MenuItem title="Account" icon="person-outline" />
                    <MenuItem title="Help" icon="help-circle-outline" />
                    <MenuItem title="Leren" icon="book-outline" />
                    <MenuItem title="Uiterlijk" icon="color-palette-outline" />
                </View>

                <View style={styles.card}>
                    <MenuItem title="Over ons" icon="information-circle-outline" />
                    <MenuItem title="FAQ’s" icon="chatbubble-ellipses-outline" />
                    <MenuItem title="Algemene voorwaarden" icon="document-text-outline" />
                </View>

                <View style={styles.logoutCard}>
                    <MenuItem title="Uitloggen" icon="log-out-outline" />
                </View>
            </ScrollView>
        </View>
    );
}

const MenuItem = ({ title, icon }) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuRow}>
            <Ionicons name={icon} size={22} color="#2F4538" style={styles.icon} />
            <Text style={styles.menuText}>{title}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1D1F21',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 20,
    },
    logoutCard: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 60,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    menuText: {
        fontSize: 16,
        color: '#1D1F21',
    },
});
