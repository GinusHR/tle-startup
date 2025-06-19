import {
    Alert,
    Animated,
    Button,
    Dimensions, Platform, Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import {
    Entypo,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    Fontisto,
    Foundation,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";
import {useNavigation} from "@react-navigation/native";

import { getUser, changeWalletValue, getUserWallet } from "../database";
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get("window");

const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

const TransactiesTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabContentText}>Transactie Geschiedenis</Text>
        {/* Add your transactions list here */}
    </View>
);

const UitbetalenTab = ({ userId, balance, setBalance, refreshBalance }) => {
    const [bedrag, setBedrag] = useState('');
    const [rekeningnummer, setRekeningnummer] = useState('');

    const handleUitbetalen = async () => {
        try {
            if (!bedrag || !rekeningnummer) {
                alert("Vul zowel het bedrag als het rekeningnummer in.");
                return;
            }

            const formattedAmount = parseFloat(bedrag.replace(',', '.'));
            const currentBalance = parseFloat(balance);

            if (isNaN(formattedAmount) || formattedAmount <= 0) {
                alert("Ongeldig bedrag.");
                return;
            }

            if (formattedAmount > currentBalance) {
                alert("Onvoldoende saldo.");
                return;
            }

            const updatedBalance = (await getUserWallet(userId) - formattedAmount).toFixed(2);

            await changeWalletValue(updatedBalance, userId);

            refreshBalance()

            setBedrag('');
            setRekeningnummer('');
            alert(`Aanvraag om €${formattedAmount.toFixed(2).replace('.', ',')} uit te betalen naar ${rekeningnummer} is verstuurd.`);

        } catch (error) {
            console.error("Fout tijdens uitbetalen:", error);
            alert("Er is iets misgegaan tijdens het verwerken.");
            setBedrag('');
            setRekeningnummer('');
        }
    };

    return (
        <View style={styles.tabContent}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Bedrag</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 800, fontSize: 18 }}>€ </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={"0,00"}
                                    placeholderTextColor={"#7D8893"}
                                    keyboardType={"numeric"}
                                    onChangeText={setBedrag}
                                    value={bedrag}
                                    onBlur={() => {
                                        const num = parseFloat(bedrag.replace(',', '.'));
                                        if (!isNaN(num)) {
                                            setBedrag(num.toFixed(2).replace('.', ','));
                                        }
                                    }}/>
                            </View>
                        </View>
                        <FontAwesome6 name="euro-sign" size={24} color="#2F4538" />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Ontvanger</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={"Rekeningnummer"}
                                    placeholderTextColor={"#7D8893"}
                                    keyboardType={"default"}
                                    onChangeText={setRekeningnummer}
                                    value={rekeningnummer}  />
                            </View>
                        </View>
                        <MaterialCommunityIcons name="bank" size={24} color="#2F4538" />
                    </View>
                </View>
                <Pressable style={styles.button} onPress={handleUitbetalen}>
                    <Text style={styles.buttonText}>Volgende</Text>
                </Pressable>
            </View>
        </View>
    );
};

const BeloningenTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabContentText}>Jouw Beloningen</Text>
        {/* Add your rewards content here */}
    </View>
);

export default function Wallet() {
    const [userId, setUserId] = useState(null)
    const [activeTab, setActiveTab] = useState("transacties");
    const [balance, setBalance] = useState(0)
    const translateX = useRef(new Animated.Value(0)).current;
    const tabWidth = useRef(0);

    // const [newAmount, setNewAmount] = useState('')
    // const [bankNumber, setNewBankNumber] = useState('')

    const handleSubmit = async () => {
        if (!newAmount) {
            Alert.alert("Fout", "Vul een bedrag in.");
            return;
        }
        Alert.alert("Formulier verzonden", `Naam: ${newAmount}`);
        await changeWalletValue(newAmount, userId);
        const updatedBalance = await getUserWallet(userId);
        setBalance(updatedBalance);
        setNewAmount('');
    };

    const refreshBalance = async () => {
        if (userId) {
            const updatedBalance = await getUserWallet(userId);
            setBalance(Number(updatedBalance));
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            if (userData) {
                const user = JSON.parse(userData);
                setUserId(user.id);
                let wallet = await getUserWallet(user.id)

                const walletNumber = wallet ? Number(wallet) : 0;

                setBalance(walletNumber)
                console.log("Raw balance:", balance, "Type:", typeof balance);
                console.log('Opgehaalde userId uit SecureStore:', user.id);
            } else {
                console.warn('Geen gebruiker gevonden in SecureStore');
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (balance !== null) {
            console.log("Geüpdatete balance:", balance, "Type:", typeof balance);
        }
    }, [balance]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "transacties":
                return <TransactiesTab />;
            case "uitbetalen":
                return <UitbetalenTab userId={userId} balance={balance} setBalance={setBalance} refreshBalance={refreshBalance}/>;
            case "beloningen":
                return <BeloningenTab />;
            default:
                return <UitbetalenTab />;
        }
    };

    const animateSlider = (index) => {
        Animated.spring(translateX, {
            toValue: index * tabWidth.current,
            useNativeDriver: true,
        }).start();
    };

    const handleTabPress = (tabName, index) => {
        setActiveTab(tabName);
        animateSlider(index);
    };

    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 30 }}>

                {/*Header*/}

                <View style={styles.header}>
                    <Entypo name="chevron-left" size={35} color="#212529" onPress={ useNavigation().goBack} />
                    <Text style={styles.pageTitle}>Saldo</Text>
                </View>
                <DataBoxes
                    title={"Huidige saldo"}
                    body={`€ ${balance.toFixed(2).replace('.', ',')}`}/>

                {/*<View style={styles.container}>*/}
                {/*    <Text style={styles.label}>Naam</Text>*/}
                {/*    <TextInput*/}
                {/*        style={styles.input}*/}
                {/*        value={newAmount}*/}
                {/*        onChangeText={setNewAmount}*/}
                {/*        placeholder="Voer een nieuwe bedrag in"*/}
                {/*    />*/}

                {/*    <Button title="Verstuur" onPress={handleSubmit} />*/}
                {/*</View>*/}

                {/*3 Tabs: Transacties, Uitbetalen, Beloningen.*/}

                <View style={styles.toggleContainer}
                    onLayout={(e) => {
                        const fullWidth = e.nativeEvent.layout.width;
                        tabWidth.current = fullWidth / 3;
                    }}
                >
                    <Animated.View
                        style={[
                            styles.slider,
                            {
                                transform: [{ translateX }],
                            },
                        ]}
                    />

                    <TouchableOpacity
                        style={styles.toggleTouchable}
                        onPress={() => handleTabPress("transacties", 0)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                activeTab === "transacties" && styles.toggleTextSelected,
                            ]}
                        >
                            Transacties
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.toggleTouchable}
                        onPress={() => handleTabPress("uitbetalen", 1)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                activeTab === "uitbetalen" && styles.toggleTextSelected,
                            ]}
                        >
                            Uitbetalen
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.toggleTouchable}
                        onPress={() => handleTabPress("beloningen", 2)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                activeTab === "beloningen" && styles.toggleTextSelected,
                            ]}
                        >
                            Beloningen
                        </Text>
                    </TouchableOpacity>
                </View>

                {/*Paginas worden gerendered in verband met de tabs*/}

                <View>
                    { renderTabContent() }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
        borderWidth: 2.5,
        borderRadius: 10,
        padding: width * 0.04,
        paddingRight: 20,
        marginBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    pageTitle: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(36),
        fontWeight: "800",
        color: "#212529",
        letterSpacing: -1,
    },
    card: {
        backgroundColor: '#F6F6F6',
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 16,
    },
    label: {
        fontFamily: 'montserrat-bold',
        marginBottom: 4,
    },
    input: {
        color: '#2F4538',
        fontSize: 18,
        fontFamily: 'montserrat-bold',
        width: '200',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2F4538',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'montserrat-bold',
    },

    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#2F4538',
        borderRadius: 999,
        padding: 5,
        marginBottom: 30,
        overflow: 'hidden',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#2F4538',
    },
    toggleSelected: {
        backgroundColor: '#fff',
    },
    toggleText: {
        color: '#fff',
        fontFamily: 'montserrat-bold',
        fontSize: scaleFontSize(12),
    },
    toggleTextSelected: {
        color: '#2F4538',
        fontFamily: 'montserrat-bold',
    },
    slider: {
        position: 'absolute',
        height: '100%',
        top: 5,
        left: 5,
        bottom: 5,
        backgroundColor: '#fff',
        borderRadius: 999,
        zIndex: 0,
        width: '31.5%'
    },
    toggleTouchable: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },


})