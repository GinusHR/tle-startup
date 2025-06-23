import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HeaderQR({
                                     title = 'Titel',
                                     textColor = '#212529',
                                 }) {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.left}
            >
                <Ionicons name="close" size={24} color={textColor} />
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 36,
        fontWeight: '600',
        marginLeft: 12,
    },
});
