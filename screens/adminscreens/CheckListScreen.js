import { useRoute } from "@react-navigation/native";
import { CameraView } from "expo-camera";
import React from "react";
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { getList } from "../../database";


export default function CheckListScreen({navigation}) {

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
      alert('lijst succesvol afgerond');
    } else {
      alert(`${wrong} komen niet overeen met de ingestuurde lijst`);
      wrong = 0;
    }
  }

    return (
        <SafeAreaView style={styleSheet.container}>
        <View style={styleSheet.form}>
            {/* <View style={styleSheet.allinputs}> */}
            <Text>aantal 0,25 flessen:</Text>
            <TextInput
            style={styleSheet.input}
            onChangeText={onChangeNumber25}
            value={number25}
            placeholder="totaal "
            keyboardType="numeric"
            />
             <Text>aantal 0,20 flessen:</Text>
            <TextInput
            style={styleSheet.input}
            onChangeText={onChangeNumber20}
            value={number20}
            placeholder="totaal "
            keyboardType="numeric"
            />
             <Text>aantal 0,15 flessen:</Text>
            <TextInput
            style={styleSheet.input}
            onChangeText={onChangeNumber15}
            value={number15}
            placeholder="totaal "
            keyboardType="numeric"
            />
             <Text>aantal 0,10 flessen:</Text>
            <TextInput
            style={styleSheet.input}
            onChangeText={onChangeNumber10}
            value={number10}
            placeholder="totaal "
            keyboardType="numeric"
            />
{/* </View> */}

            <Pressable onPress={
                () => {
                  checkvalues()
                }
              } style={[styleSheet.mainBtn, styleSheet.btnYellow ]}  >
                <Text>CheckList</Text>
              </Pressable>
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
    form: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camStyle: {
        position: 'absolute',
        width: 300,
        height: 300
    },
    input: {
        backgroundColor: '#f6f6f6',
        borderColor: '#33eeff',
        borderRadius: 5,
        width: 50,
        

    },
    mainBtn: {
    width: 200,
    height: 40,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});
