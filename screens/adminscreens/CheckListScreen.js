import { useRoute } from "@react-navigation/native";
import { CameraView } from "expo-camera";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";


export default function CheckListScreen({navigation}) {

       const route = useRoute()
      const code = route.params?.code
    
    // get list by qrcode from the camerascreen page

    return (
        <SafeAreaView style={styleSheet.container}>
            {/* show list of items */}
        <View>
            <Text>QR totaal</Text>

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