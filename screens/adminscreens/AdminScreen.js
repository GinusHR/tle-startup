import { useCameraPermissions } from 'expo-camera';
import React from 'react';
import { View, StyleSheet, Text, StatusBar, SafeAreaView, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function AdminScreen({navigation}) {
const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);
   const route = useRoute()
  const code = route.params?.code

  return (
    <SafeAreaView style={styleSheet.container}>
      <StatusBar style="auto" />

      <Text style={styleSheet.mainText}>Expo QR Code Scanner</Text>

      <Pressable style={[styleSheet.mainBtn, styleSheet.btnGreen]} onPress={requestPermission}>
        <Text>Request Permission</Text>
      </Pressable>

      <Pressable onPress={
        () => {
          useRoute
          navigation.navigate('Camera')
        }
      } style={[styleSheet.mainBtn, styleSheet.btnYellow, { opacity: isPermissionGranted ? 1 : 0.5 }]} disabled={!isPermissionGranted} >
        <Text>Scan Code</Text>
      </Pressable>

      <Pressable onPress={
        () => {
          useRoute
          navigation.navigate('DbTest')
        }
      } style={[styleSheet.mainBtn, styleSheet.btnYellow, { opacity: isPermissionGranted ? 1 : 0.5 }]}  >
        <Text>database</Text>
      </Pressable>
      <Pressable onPress={
        () => {
          useRoute
          navigation.navigate('CheckList')
        }
      } style={[styleSheet.mainBtn, styleSheet.btnYellow, { opacity: isPermissionGranted ? 1 : 0.5 }]}  >
        <Text>CheckList</Text>
      </Pressable>

      <Text>code output: {code}</Text>

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