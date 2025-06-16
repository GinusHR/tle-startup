import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, Dimensions, Pressable} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import DataBoxes from "../components/dataBoxes";

const { width, height } = Dimensions.get("window");

const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);
export default function ScannedItemsDetails () {
    return (
        <SafeAreaView>
            <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
                <View style={styles.header}>
                    <Entypo name="chevron-left" size={35} color="#212529" onPress={ useNavigation().goBack} />
                    <Text style={styles.pageTitle}>Details</Text>
                </View>
                <DataBoxes
                title={"Totaal"}
                body={"00000"}
                subBody={"$0,00"}/>
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.headerText}>#</Text>
                <Text style={styles.headerText}>Type</Text>
                <Text style={styles.headerText}>Subtot.</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        marginLeft: 15,
    },
    listContainer: {
        flexDirection: "row",
    },
    headerText: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(20),
        fontWeight: "bold",
        flex: 1,
        textAlign: "center"
    },
})