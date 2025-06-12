import { useCameraPermissions } from 'expo-camera';
import React from 'react';
import { View, StyleSheet, Text, StatusBar, SafeAreaView, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CameraScreen from './CameraScreen';

export default function AdminScreen({navigation}) {
const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styleSheet.container}>
      <StatusBar style="auto" />

      <Text style={styleSheet.mainText}>Expo QR Code Scanner</Text>

      <Pressable style={[styleSheet.mainBtn, styleSheet.btnGreen]} onPress={requestPermission}>
        <Text>Request Permission</Text>
      </Pressable>

      <Pressable onPress={
        () => {
          navigation.navigate('Camera')
        }
      } style={[styleSheet.mainBtn, styleSheet.btnYellow, { opacity: isPermissionGranted ? 1 : 0.5 }]} disabled={!isPermissionGranted} >
        <Text>Scan Code</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20
  },
  mainBtn: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnGreen: {
    backgroundColor: "#0BCD4C",
  },
  btnYellow: {
    backgroundColor: "yellow",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});