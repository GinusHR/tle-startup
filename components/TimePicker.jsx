import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TimePicker({ selectedHour, setSelectedHour, selectedMinute, setSelectedMinute }) {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = [0, 15, 30, 45];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tijd</Text>
            <View style={styles.pickerRow}>
                <Picker
                    selectedValue={selectedHour}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={setSelectedHour}
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
                <Text style={styles.separator}>:</Text>
                <Picker
                    selectedValue={selectedMinute}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={setSelectedMinute}
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
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontFamily: 'montserrat-bold',
        marginBottom: 10,
        color: '#1C1F1E',
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    picker: {
        width: 100,
        height: Platform.OS === 'ios' ? 100 : 50,
    },
    pickerItem: {
        fontSize: 18,
        color: '#000',
    },
    separator: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1C1F1E',
    },
});
