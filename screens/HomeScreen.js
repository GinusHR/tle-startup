import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, Image} from 'react-native';
import {Entypo, FontAwesome5, FontAwesome6, Ionicons} from '@expo/vector-icons';
import {getListItemsByListId, getNextAppointmentForUser} from "../database";
import * as SecureStore from 'expo-secure-store';

import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";
import Header from '../components/header';
import { changeWalletValue, getUserWallet } from "../database";

const {width, height} = Dimensions.get("window");

const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function HomeScreen({navigation}) {
    const [lastAppointment, setLastAppointment] = useState(null);
    const [user, setUser] = useState(null)
    const [totalBottles, setTotalBottles] = useState(0);
    const [totalValue, setTotalValue] = useState(0)
    const [listItems, setListItems] = useState([])

    useEffect(() => {
        const fetchAppointmentAndLists = async () => {
            const userData = await SecureStore.getItemAsync("user");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);

                const appointment = await getNextAppointmentForUser(parsedUser.id);
                setLastAppointment(appointment);


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
        if (!isoString) return "Onbekend";
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
                    paddingHorizontal: 30,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}
            >
                <Header title="Home" />
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>In te leveren</Text>
                <Text style={styles.bottleCounter}>{totalBottles.toString().padStart(5, '0')}</Text>
            </View>

            <View style={styles.buttonsContainerContainer}>
                <View style={styles.buttonsContainer}>
                    <RoundButton
                        title={"DETAILS"}
                        onPress={() => navigation.navigate("details", {
                            listItems,
                            totalValue,
                            totalBottles
                        })}
                        icon={<FontAwesome5 name="th-list" size={15} color="white" />}
                    />
                    {/*<RoundButton*/}
                    {/*    title={"DATA"}*/}
                    {/*    icon={<FontAwesome6 name="chart-simple" size={15} color="white" />}*/}
                    {/*/>*/}
                </View>
            </View>

            <View style={{ paddingHorizontal: 30 }}>
                <DataBoxes
                    title={"Saldo"}
                    body={"€0"}
                    button={
                        <RoundButton
                            onPress={() => navigation.navigate('Wallet')}
                            icon={<Entypo name="wallet" size={15} color="white" />}
                        />
                    }
                />
                <DataBoxes
                    title={"Ophaal moment"}
                    body={formatAppoinmentDate(lastAppointment?.time)}
                    button={
                        <RoundButton
                            onPress={() => navigation.navigate('PlanPickup')}
                            icon={<FontAwesome5 name="th-list" size={15} color="white" />}
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
    bottleCounter: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(36),
        fontWeight: "800",
        color: "#212529",
        marginTop: 10,
    },
})