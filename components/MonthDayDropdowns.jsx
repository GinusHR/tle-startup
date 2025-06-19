import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const months = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function MonthDayDropdowns({ selectedMonth, setSelectedMonth, selectedDay, setSelectedDay }) {
    const [monthOpen, setMonthOpen] = useState(false);
    const [dayOpen, setDayOpen] = useState(false);

    return (
        <View style={styles.dropdownRow}>
            {/* Maand dropdown */}
            <View style={styles.dropdownSection}>
                <Text style={styles.label}>Maand</Text>
                <TouchableOpacity
                    onPress={() => setMonthOpen(!monthOpen)}
                    style={styles.dropdownButton}
                >
                    <Text style={styles.dropdownText}>
                        {selectedMonth !== null ? months[selectedMonth] : 'Selecteer Maand'}
                    </Text>
                    <Ionicons name={monthOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#1C1F1E" />
                </TouchableOpacity>
                {monthOpen && (
                    <ScrollView style={styles.dropdownList}>
                        {months.map((month, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedMonth(index);
                                    setMonthOpen(false);
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
            <View style={[styles.dropdownSection, { marginLeft: 12 }]}>
                <Text style={styles.label}>Dag</Text>
                <TouchableOpacity
                    onPress={() => setDayOpen(!dayOpen)}
                    style={styles.dropdownButton}
                >
                    <Text style={styles.dropdownText}>
                        {selectedDay !== null ? selectedDay : 'Selecteer Dag'}
                    </Text>
                    <Ionicons name={dayOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#1C1F1E" />
                </TouchableOpacity>
                {dayOpen && (
                    <ScrollView style={styles.dropdownList}>
                        {days.map(day => (
                            <TouchableOpacity
                                key={day}
                                onPress={() => {
                                    setSelectedDay(day);
                                    setDayOpen(false);
                                }}
                                style={styles.dropdownItem}
                            >
                                <Text>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    dropdownSection: {
        flex: 1,
    },
    label: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: '#1C1F1E',
        marginBottom: 8,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#1C1F1E',
        paddingVertical: 8,
    },
    dropdownText: {
        fontFamily: 'montserrat-regular',
        color: '#6B7780',
        fontSize: 16,
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
});
