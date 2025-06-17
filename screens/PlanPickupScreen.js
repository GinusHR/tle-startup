import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {insertAppointment} from '../database';
import RoundButton from '../components/roundButton';
import DataBoxes from "../components/dataBoxes";

export default function PlanPickupScreen() {
    const [isOneTime, setIsOneTime] = useState(true);
    const [confirmedAddress, setConfirmedAddress] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const navigation = useNavigation();

    const handleCreateAppointment = async () => {
        if (!confirmedAddress || !selectedDate) return;
        await insertAppointment(1, confirmedAddress, selectedDate);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.pageWrapper}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Ionicons name="chevron-back" size={28} color="#1C1F1E"/>
                            </TouchableOpacity>
                            <Text style={styles.title}>Ophalen</Text>
                        </View>

                        <DataBoxes
                            title="Adres"
                            body={confirmedAddress ? confirmedAddress : '...'}
                            bodyStyle={{ fontSize: 18 }}
                            button={
                                <RoundButton
                                    icon={<Ionicons name="home" size={16} color="white"/>}
                                    onPress={() =>
                                        navigation.navigate('AddressPicker', {
                                            onAddressSelected: (address) => setConfirmedAddress(address),
                                        })
                                    }
                                />
                            }
                        />

                        <DataBoxes
                            title="Datum"
                            body={
                                selectedDate
                                    ? selectedDate.toLocaleString('nl-NL', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : '...'
                            }
                            bodyStyle={{ fontSize: 18 }}
                            button={
                                <RoundButton
                                    icon={<Ionicons name="calendar-clear" size={15} color="white"/>}
                                    onPress={() =>
                                        navigation.navigate('DateTimePicker', {
                                            currentDate: selectedDate,
                                            onDateSelected: (date) => setSelectedDate(date),
                                        })
                                    }
                                />
                            }
                        />

                        <Text style={styles.disclaimer}>
                            Door op "Maak afspraak" te klikken, ga je akkoord met de{' '}
                            <Text style={styles.link}>voorwaarden van de StatieScan ophaalservice</Text>.
                        </Text>

                        <Text style={styles.paragraph}>
                            Je stemt ermee in dat StatieScan op het door jou gekozen tijdstip
                            statiegeldverpakkingen komt ophalen op het opgegeven adres. Je
                            bent ervoor verantwoordelijk dat de verpakkingen correct worden
                            aangeboden en dat jij of iemand namens jou aanwezig is op het
                            moment van de afspraak. Indien er op het afgesproken tijdstip
                            niemand aanwezig is of de aangeboden goederen niet klaarstaan
                            volgens de instructies, behoudt StatieScan zich het recht voor om een
                            boete of gemiste-ophaalvergoeding in rekening te brengen. Deze
                            maatregel is bedoeld om onnodige ritten en kosten te voorkomen.
                            Raadpleeg de volledige servicevoorwaarden voor meer informatie.
                        </Text>
                    </View>
                </ScrollView>

                <View style={styles.fixedButtonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateAppointment}>
                        <Text style={styles.buttonText}>Maak afspraak</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 26,
        fontFamily: 'montserrat-bold',
    },
    disclaimer: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
        fontFamily: 'montserrat-regular',
    },
    link: {
        color: '#2F4538',
        fontFamily: 'montserrat-bold',
        textDecorationLine: 'underline',
    },
    paragraph: {
        fontSize: 12,
        color: '#444',
        marginBottom: 20,
        fontFamily: 'montserrat-regular',
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
    pageWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollContainer: {
        paddingBottom: 30,
    },
    fixedButtonContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#fff',
    },
});
