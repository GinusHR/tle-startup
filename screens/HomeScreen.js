import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Image, Alert } from 'react-native';
import { Entypo, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { getListItemsByListId, getNextAppointmentForUser, getUserLists, getUserWallet, checkIfUserCanPlanPickup } from "../database";
import * as SecureStore from 'expo-secure-store';

import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";
import Header from '../components/header';

const {width, height} = Dimensions.get("window");

const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function HomeScreen({navigation}) {
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

    const formatAppoinmentDate = (isoString) => {
        if (!isoString) return "Geen afspraak";
        const date = new Date(isoString);
        return date.toLocaleString('nl-NL', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}
            >
                <Header title="Home"  a11yLabel={"Startpagina koptekst"}/>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>In te leveren</Text>
                <View style={styles.bottleCounterContainer}>
                    {(() => {
                        const padded = totalBottles.toString().padStart(5, '0');
                        const actual = totalBottles === 0 ? '' : totalBottles.toString();
                        const leadingZeros = padded.slice(0, padded.length - actual.length);
                        return (
                            <Text style={styles.bottleCounter}>
                                <Text style={styles.leadingZeros}>{leadingZeros}</Text>
                                <Text style={styles.bottleCounter}>{actual}</Text>
                            </Text>
                        );
                    })()}
                </View>
            </View>

            <View style={styles.buttonsContainerContainer}>
                <View style={styles.buttonsContainer}>
                    <RoundButton
                        title={"FLESSEN OVERZICHT"}
                        onPress={() => navigation.navigate("details", {
                            listItems,
                            totalValue,
                            totalBottles
                        })}
                        a11yLabel={"Knop om naar de flessen overzicht te gaan"}
                        icon={<FontAwesome5 name="th-list" color="white" alt="knop met een lijst icoon" size={20} />}
                    />
                    {/*<RoundButton*/}
                    {/*    title={"DATA"}*/}
                    {/*    icon={<FontAwesome6 name="chart-simple" size={15} color="white" />}*/}
                    {/*/>*/}
                </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <DataBoxes
                    title={"Saldo"}
                    body={`€ ${(Number(balance) || 0).toFixed(2).replace('.', ',')}`}
                    button={
                        <RoundButton
                            onPress={() => navigation.navigate('Wallet')}
                            icon={<Entypo name="wallet" size={25} color="white" />}
                            a11yLabel={"Knop om naar de wallet te gaan"}
                            alt="Icoon van een portemonee"
                        />
                    }
                />
                <DataBoxes
                    title={"Ophaal moment"}
                    body={formatAppoinmentDate(lastAppointment?.time)}
                    bodyStyle={
                        lastAppointment?.time
                            ? styles.appointmentTextBlack
                            : styles.appointmentTextGrey
                    }
                    button={
                        <RoundButton
                            onPress={async () => {
                                const userData = await SecureStore.getItemAsync('user');
                                const user = JSON.parse(userData);
                                const canSchedule = await checkIfUserCanPlanPickup(user.id);

                                if (canSchedule) {
                                    navigation.navigate('PlanPickup');
                                } else {
                                    Alert.alert(
                                        'Nog niet klaar',
                                        'Je hebt minstens 10 items nodig in je huidige lijst om een afspraak te maken.'
                                    );
                                }
                            }}
                            icon={<FontAwesome5 name="truck" size={17} color="white" />}
                            alt="Icoon van een truck"
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFDFD",
    },
    buttonsContainerContainer: {
        width: "100%",
        marginBottom: height * 0.1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 35,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
    },
    main: {
        alignItems: "center",
        marginTop: height * 0.1,
        color: "#212529",
    },
    title: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(24),
        fontWeight: "bold",
    },
    bottleCounterContainer: {
        flexDirection: 'row',
    },
    bottleCounter: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(36),
        fontWeight: "800",
        color: "#212529",
        marginTop: 10,
    },
    leadingZeros: {
        color: "#BDC5C7",
    },

    appointmentTextGrey: {
        color: '#6B7780',
    },
    appointmentTextBlack: {
        color: '#212529',
    },
})