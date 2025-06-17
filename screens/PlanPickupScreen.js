import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, Button, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertAppointment } from '../database';
import RoundButton from '../components/roundButton';
import DataBoxes from "../components/dataBoxes";

export default function PlanPickupScreen() {
    const [isOneTime, setIsOneTime] = useState(true);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [datetimeModalVisible, setDatetimeModalVisible] = useState(false);

    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [addition, setAddition] = useState('');
    const [postal, setPostal] = useState('');
    const [city, setCity] = useState('');

    const [selectedDate, setSelectedDate] = useState(null);

    const navigation = useNavigation();

    const handleCreateAppointment = async () => {
        const address = `${street} ${number}${addition ? ' ' + addition : ''}, ${postal} ${city}`;
        if (!street || !number || !postal || !city || !selectedDate) return;
        await insertAppointment(1, address, selectedDate);
        navigation.goBack();
    };

    const handleDateChange = (event, date) => {
        if (date) {
            const minutes = date.getMinutes();
            if ([0, 15, 30, 45].includes(minutes)) {
                setSelectedDate(date);
            }
        }
    };

    const getTomorrowAtNoon = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(12, 0, 0, 0); // 12:00:00.000
        return tomorrow;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#1C1F1E" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Ophalen</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Ophaal moment</Text>
                    <Text style={styles.placeholder}>
                        {isOneTime ? 'Eenmalig ophalen' : 'Periodiek ophalen'} {/* Placeholder text for the toggle */}
                    </Text>
                </View>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, isOneTime && styles.toggleSelected]}
                        onPress={() => setIsOneTime(true)}
                    >
                        <Text style={[styles.toggleText, isOneTime && styles.toggleTextSelected]}>Eenmalig</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, !isOneTime && styles.toggleSelected]}
                        onPress={() => setIsOneTime(false)}
                    >
                        <Text style={[styles.toggleText, !isOneTime && styles.toggleTextSelected]}>Periodiek</Text>
                    </TouchableOpacity>
                </View>

                <DataBoxes
                    title="Adres"
                    body={
                        street
                            ? `${street} ${number}${addition ? ' ' + addition : ''}, ${postal} ${city}`
                            : 'Klik om in te vullen'
                    }
                    button={
                        <RoundButton
                            icon="home"
                            onPress={() =>
                                navigation.navigate('AddressPicker', {
                                    currentAddress: { street, number, addition, postal, city }
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
                            : 'Kies datum en tijd'
                    }
                    button={
                        <RoundButton
                            icon="calendar"
                            onPress={() =>
                                navigation.navigate('DateTimePicker', {
                                    currentDate: selectedDate
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

                <TouchableOpacity style={styles.button} onPress={handleCreateAppointment}>
                    <Text style={styles.buttonText}>Maak afspraak</Text>
                </TouchableOpacity>
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
        padding: 4,
        marginBottom: 16,
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
    },
    toggleTextSelected: {
        color: '#2F4538',
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
        // marginBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'montserrat-bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    addressTextContainer: {
        flexShrink: 1,
        marginRight: 10,
    },
    pickerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },

    dateTimePicker: {
        width: Platform.OS === 'ios' ? 300 : '100%',
        height: 200,
        color: 'black', // Vooral voor Android
    },
});
