import { CameraView } from "expo-camera";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


export default function CameraScreen({navigation}) {
    // get list by qrcode or manual code from the camerascreen page
    
    return (
        <SafeAreaView style={styleSheet.container}>
            {/* show list of items */}

            

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