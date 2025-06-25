import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import DataBoxes from "../components/dataBoxes";

const {width} = Dimensions.get("window");
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function ScannedItemsDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const {listItems, totalBottles, totalValue} = route.params;

    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 30, paddingTop: 30}}>
                <View style={styles.header}>
                    <Entypo name="chevron-left" size={35} color="#212529" onPress={navigation.goBack}/>
                    <Text style={styles.pageTitle}>Details</Text>
                </View>

                <DataBoxes
                    title={"Totaal"}
                    body={totalBottles.toString().padStart(5, '0')}
                    subBody={`€${totalValue.toFixed(2).replace('.', ',')}`}
                />
            </View>

            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>#</Text>
                <Text style={styles.headerText}>Type</Text>
                <Text style={styles.headerText}>Subtot.</Text>
            </View>

            <ScrollView style={styles.scrollList}>
                {listItems.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text style={styles.itemText}>{item.quantity}</Text>
                        <Text style={styles.itemText}>{item.itemName}</Text>
                        <Text style={styles.itemText}>
                            €{(item.quantity * item.value).toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    pageTitle: {
        fontFamily: "Montserrat",
        fontSize: scaleFontSize(36),
        fontWeight: "800",
        color: "#212529",
        letterSpacing: -1,
        marginLeft: 15,
    },
    tableHeader: {
        flexDirection: "row",
        paddingHorizontal: 30,
        marginTop: 20,
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: scaleFontSize(16),
    },
    scrollList: {
        marginTop: 10,
        paddingHorizontal: 30,
    },
    itemRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    itemText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(16),
    },
});
