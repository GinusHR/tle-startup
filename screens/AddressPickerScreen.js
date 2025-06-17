import React, {useState} from 'react';
import {Dimensions, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {updateUserAddress} from '../database';

const {width, height} = Dimensions.get('window');
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function AddressPickerScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const [step, setStep] = useState(0);
    const [postal, setPostal] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [addressDetails, setAddressDetails] = useState(null);

    const handleFetchAddress = async () => {
        if (!postal || !houseNumber) return;

        Keyboard.dismiss();

        try {
            const response = await fetch(
                `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${postal}+${houseNumber}&fq=type:adres`
            );
            const data = await response.json();

            if (data.response.numFound > 0) {
                const doc = data.response.docs[0];
                const straat = doc.straatnaam || 'Onbekend';
                const huisnr = doc.huisnummer || houseNumber;
                const woonplaats = doc.woonplaatsnaam || 'Onbekend';
                const pc = doc.postcode || postal;

                setAddressDetails({
                    street: straat,
                    number: huisnr,
                    city: woonplaats,
                    postal: pc
                });
            } else {
                setAddressDetails(null);
                alert('Adres niet gevonden. Controleer je invoer.');
            }
        } catch (err) {
            console.error("Fout bij ophalen adres:", err);
            alert('Er ging iets mis bij het ophalen van het adres.');
        }
    };

    const handleConfirmAddress = async () => {
        try {
            Keyboard.dismiss();
            const userId = 1;

            if (addressDetails) {
                const {street, number, postal, city} = addressDetails;
                const formattedAddress = `${street} ${number}, ${postal} ${city}`;

                await updateUserAddress(userId, formattedAddress);

                if (route.params?.onAddressSelected) {
                    route.params.onAddressSelected(formattedAddress);
                }

                navigation.goBack();
            } else {
                console.warn("Geen geldig adres om op te slaan.");
            }
        } catch (error) {
            console.error("Fout bij bevestigen adres:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Entypo name="chevron-left" size={35} color="#212529" onPress={() => navigation.goBack()}/>
                    <Text style={styles.pageTitle}>Adres</Text>
                </View>

                {step === 0 && (
                    <TouchableOpacity style={styles.card} onPress={() => setStep(1)}>
                        <Text style={styles.cardText}>Adres invoeren</Text>
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

                        {addressDetails && (
                            <TouchableOpacity style={styles.button} onPress={handleConfirmAddress}>
                                <Text style={styles.buttonText}>Bevestigen</Text>
                            </TouchableOpacity>
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
