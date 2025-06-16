import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();

    const backgroundColor = '#fff';
    const textColor = '#1D1F21';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: textColor }]}>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('QRDetail')}>
                    <Ionicons name="qr-code" size={24} color={textColor} />
                </TouchableOpacity>
            </View>

            <Button
                title="Ga naar Plan Pickup"
                onPress={() => navigation.navigate('PlanPickup')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});
