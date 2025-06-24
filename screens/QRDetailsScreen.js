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
    // setList(await getListId(currentUser.currentUser.id))

    useEffect(() => {
        const init = async() => {
            try {
                const result = await getListId(currentUser.currentUser.id);
                const listId = JSON.stringify(result.id) 
                setList(result.id);
            } catch (error) {
                console.error("AAAAAAAAAAAAAAAAAAAAAAIK HAAT DIT", error)
            }
        }
        init()
    },[])

    console.log('====================================');
    console.log(JSON.stringify(list));
    console.log('====================================');

    return (
        <View style={styles.container}>
            <HeaderQR title="QR totaal" />
            <View style={styles.qrWrapper}>
                <QRCode
                    value={JSON.stringify(list)}
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
