import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function AddressPickerScreen() {
    const navigation = useNavigation();

    const [step, setStep] = useState(0); // 0 = start, 1 = formulier
    const [postal, setPostal] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [addressDetails, setAddressDetails] = useState(null);

    const handleFetchAddress = () => {
        // Simuleer autocomplete resultaat
        if (postal && houseNumber) {
            setAddressDetails({
                street: 'Voorbeeldstraat',
                number: houseNumber,
                city: 'Amsterdam',
                postal: postal.toUpperCase()
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Entypo name="chevron-left" size={35} color="#212529" onPress={() => navigation.goBack()} />
                    <Text style={styles.pageTitle}>Adres</Text>
                </View>

                {step === 0 && (
                    <TouchableOpacity style={styles.card} onPress={() => setStep(1)}>
                        <Text style={styles.cardText}>Nieuw adres invoeren</Text>
                    </TouchableOpacity>
                )}

                {step === 1 && (
                    <>
                        <Text style={styles.label}>Postcode</Text>
                        <TextInput
                            style={styles.input}
                            value={postal}
                            onChangeText={setPostal}
                            placeholder="1234 AB"
                            autoCapitalize="characters"
                        />

                        <Text style={styles.label}>Huisnummer</Text>
                        <TextInput
                            style={styles.input}
                            value={houseNumber}
                            onChangeText={setHouseNumber}
                            placeholder="12"
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.button} onPress={handleFetchAddress}>
                            <Text style={styles.buttonText}>Haal adres op</Text>
                        </TouchableOpacity>

                        {addressDetails && (
                            <View style={styles.addressBox}>
                                <Text style={styles.addressText}>
                                    {`${addressDetails.street} ${addressDetails.number}, ${addressDetails.postal} ${addressDetails.city}`}
                                </Text>
                            </View>
                        )}
                    </>
                )}
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
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    pageTitle: {
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(36),
        fontWeight: '800',
        color: '#212529',
        letterSpacing: -1,
        marginLeft: 15,
    },
    card: {
        backgroundColor: '#F6F6F6',
        padding: 20,
        borderRadius: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    cardText: {
        fontSize: 18,
        fontFamily: 'montserrat-bold',
        color: '#2F4538',
    },
    label: {
        marginTop: 20,
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: '#212529',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 12,
        borderRadius: 8,
        fontFamily: 'montserrat-regular',
        marginTop: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2F4538',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'montserrat-bold',
        fontSize: 16,
    },
    addressBox: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
    },
    addressText: {
        fontFamily: 'montserrat-regular',
        fontSize: 16,
        color: '#2F4538',
    },
});
