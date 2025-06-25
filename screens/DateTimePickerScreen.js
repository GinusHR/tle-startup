import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MonthDayDropdowns from '../components/MonthDayDropdowns';
import TimePicker from '../components/TimePicker';

export default function DateTimePickerScreen() {
    const navigation = useNavigation();
    const route = useRoute();

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

        const pad = (num) => String(num).padStart(2, '0');

        const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; // "2025-06-18"
        const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`; // "13:30"

        console.log('Geselecteerde lokale datum+tijd:', formattedDate, formattedTime);

        if (route.params?.onDateSelected) {
            route.params.onDateSelected({
                date: formattedDate,
                time: formattedTime,
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
        backgroundColor: '#FDFDFD',
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
