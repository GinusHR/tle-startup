import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, Dimensions, Platform, StatusBar,} from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

import RoundButton from "../components/roundButton";
import DataBoxes from "../components/dataBoxes";
import Header from '../components/header';

const { width, height } = Dimensions.get("window");
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function HomeScreen({ navigation }) {
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
                            onPress={() => navigation.navigate('Wallet')}
                            icon={<FontAwesome5 name="th-list" size={15} color="white" />}
                        />
                    }
                />
                <DataBoxes
                    title={"Ophaal moment"}
                    body={"Onbekend"}
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
});
