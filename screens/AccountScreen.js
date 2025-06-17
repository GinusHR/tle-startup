import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ onLogout }) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    const backgroundColor = darkMode ? '#1D1F21' : '#fff';
    const textColor = darkMode ? '#fff' : '#1D1F21';
    const borderColor = darkMode ? '#444' : '#ddd';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: textColor }]}>GEBRUIKER</Text>
                    <Ionicons name="qr-code-outline" size={24} color={textColor} />
                </View>

                <View style={[styles.card, { borderColor }]}>
                    <MenuItem title="Account" icon="person-outline" color={textColor} />
                    <MenuItem title="Help" icon="help-circle-outline" color={textColor} />
                    <MenuItem title="Leren" icon="book-outline" color={textColor} />
                    <MenuItem
                        title="Uiterlijk"
                        icon="color-palette-outline"
                        color={textColor}
                        onPress={toggleDarkMode}
                        rightElement={
                            <Text style={{ color: textColor, fontSize: 16 }}>
                                {darkMode ? 'Dark' : 'Light'}
                            </Text>
                        }
                    />
                </View>

                <View style={[styles.card, { borderColor }]}>
                    <MenuItem title="Over ons" icon="information-circle-outline" color={textColor} />
                    <MenuItem title="FAQ’s" icon="chatbubble-ellipses-outline" color={textColor} />
                    <MenuItem title="Algemene voorwaarden" icon="document-text-outline" color={textColor} />
                </View>

                <View style={[styles.logoutCard, { borderColor }]}>
                    <MenuItem
                        title="Uitloggen"
                        icon="log-out-outline"
                        color={textColor}
                        onPress={onLogout}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const MenuItem = ({ title, icon, onPress, color, rightElement }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
                <Ionicons name={icon} size={22} color={color} style={styles.icon} />
                <Text style={[styles.menuText, { color }]}>{title}</Text>
            </View>
            {rightElement && <View>{rightElement}</View>}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    card: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 20,
    },
    logoutCard: {
        borderWidth: 1,
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    menuText: {
        fontSize: 16,
    },
});
