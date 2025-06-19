import React, { useState } from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import MonthDayDropdowns from '../components/MonthDayDropdowns';
import TimePicker from '../components/TimePicker';

export default function DateTimePickerScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const now = new Date();
    const isoString = now.toISOString(); // "2025-06-18T13:30:00.000Z"
    const [datum, tijdMetMs] = isoString.split('T');
    const tijd = tijdMetMs.slice(0, 5); // "13:30"

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const handleConfirmDateTime = () => {
        if (selectedMonth === null || selectedDay === null) return;

        const date = new Date();
        date.setMonth(selectedMonth);
        date.setDate(selectedDay);
        date.setHours(selectedHour);
        date.setMinutes(selectedMinute);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const formattedDate = date.toISOString(); // bv: "2025-06-18T13:30:00.000Z"

        const [datum, tijd] = formattedDate.split('T'); // "2025-06-18", "13:30:00.000Z"

        console.log('✅ Geselecteerde datum:', formattedDate);

        // ✅ Geef de gekozen tijd terug aan het vorige scherm
        if (route.params?.onDateSelected) {
            route.params.onDateSelected({
                date: datum,            // "2025-06-18"
                time: tijd.slice(0, 5), // "13:30"
            });
        }

        navigation.goBack();
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={28} color="#1C1F1E" />
            </TouchableOpacity>

            <Text style={styles.title}>Kies datum en tijd</Text>

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <MonthDayDropdowns
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                />

                <TimePicker
                    selectedHour={selectedHour}
                    setSelectedHour={setSelectedHour}
                    selectedMinute={selectedMinute}
                    setSelectedMinute={setSelectedMinute}
                />
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDateTime}>
                <Text style={styles.confirmText}>Bevestig</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontFamily: 'montserrat-bold',
        color: '#1C1F1E',
        marginBottom: 24,
    },
    confirmButton: {
        backgroundColor: '#2F4538',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'montserrat-bold',
    },
});
