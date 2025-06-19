import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import HeaderQR from '../components/headerQR';
import QRCode from 'react-native-qrcode-svg';
import * as Brightness from 'expo-brightness';
import { useFocusEffect } from '@react-navigation/native';

export default function QRDetailsScreen() {
    useFocusEffect(
        React.useCallback(() => {
            let originalBrightness = null;

            const setBrightnessOnce = async () => {
                try {
                    const { status } = await Brightness.requestPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Toestemming vereist', 'Schermhelderheid kan niet worden aangepast.');
                        return;
                    }

                    originalBrightness = await Brightness.getBrightnessAsync();
                    await Brightness.setBrightnessAsync(1);
                } catch (error) {
                    console.warn('Fout bij instellen helderheid:', error);
                }
            };

            const restoreBrightness = async () => {
                try {
                    if (originalBrightness !== null) {
                        await Brightness.setBrightnessAsync(originalBrightness);
                    }
                } catch (error) {
                    console.warn('Fout bij herstellen helderheid:', error);
                }
            };

            setBrightnessOnce();

            return () => {
                restoreBrightness();
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <HeaderQR title="QR totaal" />
            <View style={styles.qrWrapper}>
                <QRCode
                    value="https://www.npmjs.com/package/react-native-qrcode-svg"
                    size={310}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    qrWrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: -40,
        marginTop: -60,
    },
});
