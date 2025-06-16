import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PlanPickupScreen() {
    const [isOneTime, setIsOneTime] = useState(true);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header met terugknop */}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#1C1F1E" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Ophalen</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Ophaal moment</Text>
                    <Text style={styles.placeholder}>Onbekend</Text>
                </View>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            isOneTime && styles.toggleSelected,
                        ]}
                        onPress={() => setIsOneTime(true)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                isOneTime && styles.toggleTextSelected,
                            ]}
                        >
                            Eenmalig
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            !isOneTime && styles.toggleSelected,
                        ]}
                        onPress={() => setIsOneTime(false)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                !isOneTime && styles.toggleTextSelected,
                            ]}
                        >
                            Periodiek
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Adress</Text>
                            <Text style={styles.placeholder}>Stad</Text>
                        </View>
                        <Ionicons name="home" size={24} color="#2F4538" />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Datum</Text>
                            <Text style={styles.placeholder}>Tijd</Text>
                        </View>
                        <Ionicons name="calendar" size={24} color="#2F4538" />
                    </View>
                </View>

                <Text style={styles.disclaimer}>
                    Door op "Maak afspraak" te klikken, ga je akkoord met de{' '}
                    <Text style={styles.link}>voorwaarden van de StatieScan ophaalservice</Text>.
                </Text>

                <Text style={styles.paragraph}>
                    Je stemt ermee in dat StatieScan op het door jou gekozen tijdstip statiegeldverpakkingen komt ophalen op het opgegeven adres. Je bent ervoor verantwoordelijk dat de verpakkingen correct worden aangeboden en dat jij of iemand namens jou aanwezig is op het moment van de afspraak. Indien er op het afgesproken tijdstip niemand aanwezig is of de aangeboden goederen niet klaarstaan volgens de instructies, behoudt StatieScan zich het recht voor om een boete of gemiste-ophaalvergoeding in rekening te brengen. Deze maatregel is bedoeld om onnodige ritten en kosten te voorkomen. Raadpleeg de volledige servicevoorwaarden voor meer informatie.
                </Text>

                <TouchableOpacity style={styles.button}>
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
        marginBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'montserrat-bold',
    },
});
