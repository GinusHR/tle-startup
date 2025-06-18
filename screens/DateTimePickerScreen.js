import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import MonthDayDropdowns from '../components/MonthDayDropdowns';
import TimePicker from '../components/TimePicker';
export default function DateTimePickerScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = [0, 15, 30, 45];

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const handleConfirm = () => {
        const date = new Date();

        if (selectedMonth === null || selectedDay === null) return;

        date.setMonth(selectedMonth);
        date.setDate(selectedDay);
        date.setHours(selectedHour);
        date.setMinutes(selectedMinute);
        date.setSeconds(0);
        date.setMilliseconds(0);

        console.log('Geselecteerde datum:', date.toISOString());

        // ✅ Callback aanroepen om de datum terug te sturen
        if (route.params?.onDateSelected) {
            route.params.onDateSelected(date);
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

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
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
