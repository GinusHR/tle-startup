import React, { useState } from 'react';
import {Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DateTimePickerScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const months = [
        'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = [0, 15, 30, 45];

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);

    const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
    const [dayDropdownOpen, setDayDropdownOpen] = useState(false);

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
                {/* Maand dropdown */}
                <View style={styles.dropdownSection}>
                    <Text style={styles.label}>Maand</Text>
                    <TouchableOpacity
                        onPress={() => setMonthDropdownOpen(!monthDropdownOpen)}
                        style={styles.dropdownButton}
                    >
                        <Text style={styles.dropdownText}>
                            {selectedMonth !== null ? months[selectedMonth] : 'Selecteer maand'}
                        </Text>
                        <Ionicons name={monthDropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#1C1F1E" />
                    </TouchableOpacity>
                    {monthDropdownOpen && (
                        <ScrollView style={styles.dropdownList}>
                            {months.map((month, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedMonth(index);
                                        setMonthDropdownOpen(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text>{month}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Dag dropdown */}
                <View style={styles.dropdownSection}>
                    <Text style={styles.label}>Dag</Text>
                    <TouchableOpacity
                        onPress={() => setDayDropdownOpen(!dayDropdownOpen)}
                        style={styles.dropdownButton}
                    >
                        <Text style={styles.dropdownText}>
                            {selectedDay !== null ? selectedDay : 'Selecteer dag'}
                        </Text>
                        <Ionicons name={dayDropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#1C1F1E" />
                    </TouchableOpacity>
                    {dayDropdownOpen && (
                        <ScrollView style={styles.dropdownList}>
                            {days.map(day => (
                                <TouchableOpacity
                                    key={day}
                                    onPress={() => {
                                        setSelectedDay(day);
                                        setDayDropdownOpen(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Tijd */}
                <View style={styles.timePickerContainer}>
                    <Text style={styles.label}>Tijd</Text>
                    <View style={styles.pickerRow}>
                        <Picker
                            selectedValue={selectedHour}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={itemValue => setSelectedHour(itemValue)}
                        >
                            {hours.map(hour => (
                                <Picker.Item
                                    key={hour}
                                    label={hour.toString().padStart(2, '0')}
                                    value={hour}
                                    color="#000"
                                />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={selectedMinute}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={itemValue => setSelectedMinute(itemValue)}
                        >
                            {minutes.map(minute => (
                                <Picker.Item
                                    key={minute}
                                    label={minute.toString().padStart(2, '0')}
                                    value={minute}
                                    color="#000"
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            {/* Bevestig knop */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmText}>Bevestig</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'montserrat-bold',
        marginBottom: 20,
    },
    label: {
        fontFamily: 'montserrat-bold',
        marginBottom: 5,
        fontSize: 16,
    },
    dropdownSection: {
        marginBottom: 20,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dropdownText: {
        fontFamily: 'montserrat-regular',
    },
    dropdownList: {
        maxHeight: 150,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        marginTop: 5,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    timePickerContainer: {
        marginTop: 10,
        marginBottom: 30,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        width: 100,
        height: Platform.OS === 'ios' ? 100 : 40, // ↓ kleiner gemaakt
    },
    pickerItem: {
        fontSize: 18,
        color: '#000', // zwarte tekst
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
