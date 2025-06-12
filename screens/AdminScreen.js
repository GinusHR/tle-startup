import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function AdminScreen() {
    return (
        <View>
            <QRCode
      value="http://awesome.link.qr"
    />
        </View>
    );
}