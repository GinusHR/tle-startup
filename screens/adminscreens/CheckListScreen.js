import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
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
import { getListItemsByListId, updateListStatus } from "../../database";
import HeaderAdmin from "../../components/headerAdmin";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const scaleFontSize = (figmaFontSize, width = 430) =>
    figmaFontSize * (width / 430);

export default function CheckListScreen({ navigation }) {
    const route = useRoute();
    // const code = 1;
    const code = route.params?.code;

    const list25 = 4;
    const list20 = 4;
    const list15 = 4;
    const list10 = 4;

    const [number25, onChangeNumber25] = React.useState(0);
    const [number20, onChangeNumber20] = React.useState(0);
    const [number15, onChangeNumber15] = React.useState(0);
    const [number10, onChangeNumber10] = React.useState(0);
    let wrong = 0;

    function checkvalues() {
        if (number25 != list25) {
            wrong++;
        }
        if (number20 != list20) {
            wrong++;
        }
        if (number15 != list15) {
            wrong++;
        }
        if (number10 != list10) {
            wrong++;
        }
        if (wrong === 0) {
            Alert.alert("lijst succesvol afgerond");
            navigation.navigate()
        } else {
            Alert.alert(`${wrong} komen niet overeen met de ingestuurde lijst`);
            wrong = 0;
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
      updateListStatus(code)
      navigation.navigate('Home')
    } else {
      Alert.alert(`${wrong} komen niet overeen met de ingestuurde lijst`);
      wrong = 0;
    }
  }
        //   const init = async() => {
        //       try {
        //         // get list by qrcode from the camerascreen page
        //         const list = await getListItemsByListId(code);
        //         console.log('====================================');
        //         console.log(list);
        //         console.log('====================================');
        //       } catch (error) {
        //           console.error("AAAAAAAAAAAAAAAAAAAAAAIK HAAT DIT", error)
        //       }
        //   }

        const [lastAppointment, setLastAppointment] = useState(null);
            const [user, setUser] = useState(null)
            const [totalBottles, setTotalBottles] = useState(0);
            const [totalValue, setTotalValue] = useState(0)
            const [listItems, setListItems] = useState([])
            const [balance, setBalance] = useState(0);
      
      useEffect(() => {
              const fetchAppointmentAndLists = async () => {
                  const userData = await SecureStore.getItemAsync("user");
                  if (userData) {
                      const parsedUser = JSON.parse(userData);
                      setUser(parsedUser);
      
                      const appointment = await getNextAppointmentForUser(parsedUser.id);
                      setLastAppointment(appointment);
      
                      const updateBalance = await getUserWallet(parsedUser.id);
                      const parsedBalance = Number(updateBalance);
                      if (!isNaN(parsedBalance)) {
                          setBalance(parsedBalance);
                      } else {
                          console.warn("Saldo kon niet worden geconverteerd naar getal:", updateBalance);
                          setBalance(0);
                      }
      
                      const fetchedLists = await getUserLists(parsedUser.id);
                      const allListItems = [];
      
                      for (const list of fetchedLists) {
                          const items = await getListItemsByListId(list.id);
                          items.forEach((item) => {
                              allListItems.push({
                                  listId: list.id,
                                  itemName: item.item_name,
                                  quantity: item.quantity,
                                  value: item.item_value,
                              });
                          });
                      }
      
                      const totalB= allListItems.reduce((sum, item) => sum + item.quantity, 0);
                      const totalV = allListItems.reduce((sum, item) => sum + item.quantity * item.value, 0);
      
                      setTotalBottles(totalB);
                      setTotalValue(totalV);
                      setListItems(allListItems);
                  }
              };
      
              const unsubscribe = navigation.addListener('focus', fetchAppointmentAndLists);
              return unsubscribe;
          }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    paddingHorizontal: 30,
                    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <HeaderAdmin title="Controleer de lijst" />
            </View>

            <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={styles.innerContainer}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Grote flessen €0,25:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => onChangeNumber25(Number(text))}
                            value={number25.toString()}
                            placeholder="Aantal"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Flessen met beugel €0,20:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => onChangeNumber20(Number(text))}
                            value={number20.toString()}
                            placeholder="Aantal"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Kleine flessen/blikjes €0,15:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => onChangeNumber15(Number(text))}
                            value={number15.toString()}
                            placeholder="Aantal"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Bierflessen €0,10:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => onChangeNumber10(Number(text))}
                            value={number10.toString()}
                            placeholder="Aantal"
                            keyboardType="numeric"
                        />
                    </View>

                <Pressable style={styles.confirmButton} onPress={checkvalues}>
                    <Text style={styles.confirmText}>CheckList</Text>
                </Pressable>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFDFD",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    innerContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: "#212529",
        marginRight: 10,
        fontFamily: "Montserrat",
    },
    input: {
        backgroundColor: "#2F4538",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        width: 100,
        textAlign: "center",
        fontSize: 16,
        color: "#FDFDFD",
        fontFamily: "Montserrat",
    },
    confirmButton: {
        marginTop: 24,
        backgroundColor: "#597364",
        borderRadius: 40,
        paddingVertical: 18, // increased from 16
        paddingHorizontal: 32,
        alignItems: "center",
        alignSelf: "stretch",
        minHeight: 56, // better for accessibility
    },
    confirmText: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
});
