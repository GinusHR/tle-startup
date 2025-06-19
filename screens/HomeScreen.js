import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {FontAwesome5, FontAwesome6, Ionicons} from '@expo/vector-icons';
import {getNextAppointmentForUser} from "../database";
import * as SecureStore from 'expo-secure-store';

import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";
import Header from '../components/header';

const {width, height} = Dimensions.get("window");
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);
export default function HomeScreen({navigation}) {
    const [lastAppointment, setLastAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            const userData = await SecureStore.getItemAsync("user");
            if (userData) {
                const user = JSON.parse(userData);
                const appointment = await getNextAppointmentForUser(user.id);
                setLastAppointment(appointment);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchAppointment);
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
                <Text style={styles.bottleCounter}>00000</Text>
            </View>

            <View style={styles.buttonsContainerContainer}>
                <View style={styles.buttonsContainer}>
                    <RoundButton
                        title={"DETAILS"}
                        onPress={() => navigation.navigate("details")}
                        icon={<FontAwesome5 name="th-list" size={15} color="white" />}
                    />
                    <RoundButton
                        title={"DATA"}
                        icon={<FontAwesome6 name="chart-simple" size={15} color="white" />}
                    />
                </View>
            </View>

            <View style={{ paddingHorizontal: 30 }}>
                <DataBoxes
                    title={"Saldo"}
                    body={"€0"}
                    button={
                        <RoundButton
                            icon={<FontAwesome5 name="th-list" size={15} color="white" />}
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
        justifyContent: "space-between",
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