import {
    Alert,
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    Platform
} from 'react-native';

import React, { useRef, useState, useEffect } from 'react';
import {
    Entypo,
    FontAwesome6,
    MaterialCommunityIcons
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { changeWalletValue, getUserWallet } from "../database";
import * as SecureStore from 'expo-secure-store';

import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get("window");
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

const TransactiesTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabContentText}>Transactie Geschiedenis</Text>
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
            refreshBalance();

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
                        <View accessible={false}>
                            <Text style={styles.label}>Bedrag</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: '800', fontSize: 18 }}>€ </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={"0,00"}
                                    placeholderTextColor={"#7D8893"}
                                    keyboardType={"numeric"}
                                    onChangeText={setBedrag}
                                    value={bedrag}
                                    accessibilityLabel={"Bedrag"}
                                    onBlur={() => {
                                        const num = parseFloat(bedrag.replace(',', '.'));
                                        if (!isNaN(num)) {
                                            setBedrag(num.toFixed(2).replace('.', ','));
                                        }
                                    }} />
                            </View>
                        </View>
                        <FontAwesome6 name="euro-sign" size={24} color="#2F4538" alt="Icoon van een euroteken" />
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
                                    value={rekeningnummer}
                                    accessibilityLabel={"Rekeningnummer"}
                                    autoComplete="off"
                                />
                            </View>
                        </View>
                        <MaterialCommunityIcons name="bank" size={24} color="#2F4538" alt="Icoon van een bank gebouw"/>
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
    </View>
);

export default function Wallet() {
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState("transacties");
    const [balance, setBalance] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
    const tabWidth = useRef(0);

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
                const wallet = await getUserWallet(user.id);
                setBalance(wallet ? Number(wallet) : 0);
            }
        };
        fetchUserData();
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case "transacties": return <TransactiesTab />;
            case "uitbetalen": return <UitbetalenTab userId={userId} balance={balance} setBalance={setBalance} refreshBalance={refreshBalance} />;
            case "beloningen": return <BeloningenTab />;
            default: return <UitbetalenTab />;
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
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "#fff" }}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 50 }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Entypo name="chevron-left" size={35} color="#212529" onPress={useNavigation().goBack} />
                        <Text style={styles.pageTitle}>Saldo</Text>
                    </View>

                    <DataBoxes
                        title={"Huidige saldo"}
                        body={`€ ${(Number(balance) || 0).toFixed(2).replace('.', ',')}`}
                    />

                    {/* Tabs */}
                    <View style={styles.toggleContainer}
                          onLayout={(e) => {
                              const fullWidth = e.nativeEvent.layout.width;
                              tabWidth.current = fullWidth / 3;
                          }}
                    >
                        <Animated.View
                            style={[
                                styles.slider,
                                { transform: [{ translateX }] },
                            ]}
                        />
                        {["transacties", "uitbetalen", "beloningen"].map((tab, index) => (
                            <TouchableOpacity
                                key={tab}
                                style={styles.toggleTouchable}
                                onPress={() => handleTabPress(tab, index)}
                            >
                                <Text style={[
                                    styles.toggleText,
                                    activeTab === tab && styles.toggleTextSelected,
                                ]}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {renderTabContent()}
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
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
        width: 200,
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
    tabContent: {
        marginBottom: 20,
    },
    tabContentText: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
    },
});
