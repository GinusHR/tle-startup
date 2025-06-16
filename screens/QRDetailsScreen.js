import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

export default function QRDetailsScreen() {
    const navigation = useNavigation();
    const backgroundColor = '#fff';
    const textColor = '#1D1F21';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color={textColor} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: textColor }]}>QR totaal</Text>
                <View style={{ width: 24 }} /> {/* Spacing voor centreren */}
            </View>

            {/* QR-code Placeholder */}
            {/* <View style={styles.qrPlaceholder} /> */}
            <QRCode
      value="https://www.npmjs.com/package/react-native-qrcode-svg"
      size={310}
    />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 18,
    },
    qrPlaceholder: {
        width: 240,
        height: 240,
        backgroundColor: '#2F4538',
        borderRadius: 16,
        alignSelf: 'center',
    },
});
