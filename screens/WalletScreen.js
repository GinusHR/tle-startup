import {Animated, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import {Entypo, FontAwesome5, FontAwesome6, Ionicons} from "@expo/vector-icons";
import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";
import {useNavigation} from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

const TransactiesTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabContentText}>Transactie Geschiedenis</Text>
        {/* Add your transactions list here */}
    </View>
);

const UitbetalenTab = () => {
    const [bedrag, setBedrag] = useState('');
    const [rekeningnummer, setRekeningnummer] = useState('');

    const handleUitbetalen = () => {
        if (!bedrag || !rekeningnummer) {
            alert("Vul zowel het bedrag als het rekeningnummer in.");
            return;
        }

        // Hier zou je een API-call doen of iets verwerken
        alert(`Aanvraag om €${bedrag} uit te betalen naar ${rekeningnummer} is verstuurd.`);

        // Reset
        setBedrag('');
        setRekeningnummer('');
    };

    return (
        <View style={styles.tabContent}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Bedrag</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>$ </Text>
                                <TextInput
                                    placeholder={"0,00"}
                                    keyboardType={"numeric"}
                                    onChangeText={setBedrag}  />
                            </View>
                        </View>
                        <Ionicons name="home" size={24} color="#2F4538" />
                    </View>
                </View>
                <View>
                    <Text>Rekening nummer</Text>
                </View>
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
    const [activeTab, setActiveTab] = useState("transacties");
    const translateX = useRef(new Animated.Value(0)).current;
    const tabWidth = useRef(0);

    const renderTabContent = () => {
        switch (activeTab) {
            case "transacties":
                return <TransactiesTab />;
            case "uitbetalen":
                return <UitbetalenTab />;
            case "beloningen":
                return <BeloningenTab />;
            default:
                return <TransactiesTab />;
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
                    body={"€ 0,00"}/>

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
    placeholder: {
        color: '#7D8893',
        fontSize: 18,
        fontFamily: 'montserrat-bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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