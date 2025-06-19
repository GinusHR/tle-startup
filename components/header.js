import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function Header({
                                   title = 'Titel',
                                   showQR = true,
                                   textColor = '#212529',
                               }) {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Text style={[styles.pageTitle, { color: textColor }]}>{title}</Text>
            {showQR && (
                <Ionicons
                    name="qr-code"
                    size={30}
                    color={textColor}
                    style={styles.qrIcon}
                    onPress={() => navigation.navigate('Home', {
                        screen: 'QRDetail',
                    })
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    pageTitle: {
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(36),
        fontWeight: '800',
        letterSpacing: -1,
    },
    qrIcon: {
        transform: [{ translateY: 1 }],
    },
});
