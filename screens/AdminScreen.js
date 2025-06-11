import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function AdminScreen() {
    return (
        <View>
            <QRCode
      value="http://awesome.link.qr"
    />
        </View>
    );
}