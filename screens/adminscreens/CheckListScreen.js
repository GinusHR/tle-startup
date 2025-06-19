import React from "react";
import { useRoute } from "@react-navigation/native";
import { CameraView } from "expo-camera";
import {
    Alert,
    Platform,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { getList } from "../../database";

const scaleFontSize = (figmaFontSize, width = 430) =>
    figmaFontSize * (width / 430);

export default function CheckListScreen({ navigation }) {

    const route = useRoute()
    const code = route.params?.code
    
    // get list by qrcode from the camerascreen page
    const list = getList(code)
    console.log('====================================');
    console.log(list);
    console.log('====================================');

    const list25 = 4 
    const list20 = 4 
    const list15 = 4 
    const list10 = 4

    // count bottles/cans per price (0.25, 0.20, 0.15, 0.10)
  const [number25, onChangeNumber25] = React.useState(0);
  const [number20, onChangeNumber20] = React.useState(0);
  const [number15, onChangeNumber15] = React.useState(0);
  const [number10, onChangeNumber10] = React.useState(0);
  let wrong = 0;

  function checkvalues(){
    if (number25 != list25){
      wrong++;
    } 
    if (number20 != list20){
      wrong++;
    }
    if (number15 != list15){
      wrong++;
    }
    if (number10 != list10){
      wrong++;
    }
    if (wrong === 0){
      //mark list as done
      Alert.alert('lijst succesvol afgerond');
    } else {
      Alert.alert(`${wrong} komen niet overeen met de ingestuurde lijst`);
      wrong = 0;
    }
  }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Controleer de lijst</Text>

                <View style={styles.inputGroup}>
                    <Text>aantal grote flessen €0,25:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber25}
                        value={number25}
                        placeholder="totaal "
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text>aantal flessen met beugel €0,20:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber20}
                        value={number20}
                        placeholder="totaal "
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text>aantal kleine flessen/blikjes €0,15:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber15}
                        value={number15}
                        placeholder="totaal "
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text>aantal bierflessen €0,10:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber10}
                        value={number10}
                        placeholder="totaal "
                        keyboardType="numeric"
                    />
                </View>

                <Pressable style={styles.confirmButton} onPress={checkvalues}>
                    <Text style={styles.confirmText}>CheckList</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    title: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(24),
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: "#212529",
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        width: "80%",
        justifyContent: "space-between",
        color: "#FDFDFD",
    },
    input: {
        fontFamily: "Montserrat",
        backgroundColor: "#2F4538",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: 100,
        textAlign: "center",
        fontSize: 16,
        color: "#FDFDFD",
    },
    confirmButton: {
        marginTop: 32,
        backgroundColor: "#597364",
        borderRadius: 40,
        paddingVertical: 16,
        alignItems: "center",
    },
    confirmText: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18,
    },
    camStyle: {
        position: 'absolute',
        width: 300,
        height: 300
    },
});
