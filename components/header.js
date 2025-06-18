import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function Header({
                                   title = 'Titel',
                                   showQR = true,
                                   textColor = '#212529',
                               }) {
    return (
        <View style={styles.header}>
            <Text style={[styles.pageTitle, { color: textColor }]}>{title}</Text>
            {showQR && (
                <Ionicons
                    name="qr-code"
                    size={30}
                    color={textColor}
                    style={styles.qrIcon}
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
        // optioneel: je kunt hiermee een fine-tune doen qua hoogte
        transform: [{ translateY: 1 }],
    },
});
