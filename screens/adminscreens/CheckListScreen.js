import { useRoute } from "@react-navigation/native";
import { CameraView } from "expo-camera";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { getList } from "../../database";


export default function CheckListScreen({navigation}) {

       const route = useRoute()
      const code = route.params?.code
    
    // get list by qrcode from the camerascreen page
    const list = getList(code)
    console.log('====================================');
    console.log(list);
    console.log('====================================');
    // count bottles/cans per price (0.25, 0.20, 0.15, 0.10)
  const [number, onChangeNumber] = React.useState('');

    return (
        <SafeAreaView style={styleSheet.container}>
        <View>
            <Text>totaal 0,25 flessen</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
            />
             <Text>totaal 0,20 flessen</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
            />
             <Text>totaal 0,15 flessen</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
            />
             <Text>totaal 0,10 flessen</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
            />
        </View>
            

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
    camStyle: {
        position: 'absolute',
        width: 300,
        height: 300
    }
});
