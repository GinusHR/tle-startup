import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function HeaderAdmin({ title = 'Titel', textColor = '#212529' }) {
    return (
        <View style={styles.header}>
                <Text style={[styles.pageTitle, { color: textColor }]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    pageTitle: {
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(36),
        fontWeight: '800',
        letterSpacing: -1,
    },
    userInfo: {
        fontFamily: 'montserrat-regular',
        fontSize: scaleFontSize(16),
        marginTop: 4,
    },
    roleBadge: {
        fontFamily: 'montserrat-semibold',
        fontSize: scaleFontSize(14),
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
});
