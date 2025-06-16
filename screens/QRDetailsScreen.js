import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function QRDetailsScreen() {
    const navigation = useNavigation();

    // Header aanpassen
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'QR totaal',
            headerTitleStyle: {
                fontFamily: 'montserrat-bold',
                fontSize: 18,
            },
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                    <Ionicons name="close" size={24} color="#1C1F1E" />
                </Pressable>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Placeholder voor QR-code */}
            <View style={styles.qrPlaceholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrPlaceholder: {
        width: 240,
        height: 240,
        backgroundColor: '#2F4538',
        borderRadius: 16,
    },
});
