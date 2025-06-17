import { CameraView } from "expo-camera";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


export default function CameraScreen({navigation}) {

    return (
        <SafeAreaView style={styleSheet.container}>

            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={styleSheet.camStyle}
                facing="back"
                barcodeScannerSettings={
                    {
                        barcodeTypes: 'qr',

                    }
                }

                onBarcodeScanned={
                    ({ data }) => {
                        // write check for security
                        // only go through if the qr is legit
                        // make warning popup for false codes
                        
                        navigation.navigate('Admin', {code: data})
                    }
                }
            />

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