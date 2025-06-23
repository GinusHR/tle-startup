import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import HeaderQR from '../components/headerQR';
import QRCode from 'react-native-qrcode-svg';
import * as Brightness from 'expo-brightness';
import { useFocusEffect } from '@react-navigation/native';
import { getListId } from '../database';

export default function QRDetailsScreen({currentUser}) {
    const [list, setList] = React.useState();
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

    useEffect(() => {
        const init = async() => {
            try {
                 console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAa", currentUser.currentUser.id)
                setList(await getListId(currentUser.currentUser.id))
            } catch (error) {
                console.error("AAAAAAAAAAAAAAAAAAAAAAIK HAAT DIT", error)
            }
        }
        init()
    },[])

    return (
        <View style={styles.container}>
            <HeaderQR title="QR totaal" />
            <View style={styles.qrWrapper}>
                <QRCode
                    value='tet'
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
