import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    SafeAreaView, Dimensions, ImageBackground, Alert, ActivityIndicator
} from 'react-native';

import BackgroundImage from '../assets/images/background.png';

import { insertUser } from "../database";

const { width } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        naam: '',
        achternaam: '',
        telefoon: '',
        email: '',
        wachtwoord: '',
        wachtwoordBevestigen: '',
    });

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.naam || !formData.achternaam || !formData.telefoon) {
                Alert.alert('Error', 'Vul alle velden in');
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            if (!formData.email || !formData.wachtwoord || !formData.wachtwoordBevestigen) {
                Alert.alert('Error', 'Vul alle velden in');
                return;
            }

            if (!validateEmail(formData.email)) {
                Alert.alert('Error', 'Vul een geldig email adres in');
                return;
            }

            if (!validatePassword(formData.wachtwoord)) {
                Alert.alert('Error', 'Wachtwoord moet minimaal 6 tekens bevatten');
                return;
            }

            if (formData.wachtwoord !== formData.wachtwoordBevestigen) {
                Alert.alert('Error', 'Wachtwoorden komen niet overeen');
                return;
            }

            handleRegister();

        }
    };

    const handleRegister = async () => {
        setIsLoading(true);

        try {
            const fullName = `${formData.naam} ${formData.achternaam}`;
            await insertUser(fullName, formData.email, formData.wachtwoord);

            console.log('Gebruiker succesvol geregistreerd:', formData.email);
            setCurrentStep(3);
        } catch (error) {
            console.error('Registratie error:', error);
            Alert.alert('Registratie mislukt', 'Er ging iets mis, probeer opnieuw.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    // const renderHeader = () => (
    //     <View style={styles.headerContainer}>
    //         {Array.from({ length: 4 }).map((_, i) => (
    //             <Text key={`top-${i}`} style={styles.headerText}>STATIESCAN</Text>
    //         ))}
    //         <Text style={styles.headerTextBold}>STATIESCAN</Text>
    //         {Array.from({ length: 3 }).map((_, i) => (
    //             <Text key={`bottom-${i}`} style={styles.headerText}>STATIESCAN</Text>
    //         ))}
    //     </View>
    // );

    const renderStep1 = () => (
        <>
            <TextInput
                style={styles.input}
                placeholder="Naam"
                placeholderTextColor="#999"
                value={formData.naam}
                onChangeText={(text) => updateFormData('naam', text)}
                editable={!isLoading}
            />
            <TextInput
                style={styles.input}
                placeholder="Achternaam"
                placeholderTextColor="#999"
                value={formData.achternaam}
                onChangeText={(text) => updateFormData('achternaam', text)}
                editable={!isLoading}
            />
            <View style={styles.countryPhoneContainer}>
                <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+31</Text>
                </View>
                <TextInput
                    style={[styles.input, styles.phoneInput]}
                    placeholder="Telefoon"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={formData.telefoon}
                    onChangeText={(text) => updateFormData('telefoon', text)}
                    editable={!isLoading}
                />
            </View>
            <TouchableOpacity
                style={[styles.button, isLoading && styles.disabledButton]}
                onPress={handleNext}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Volgende</Text>
            </TouchableOpacity>
        </>
    );

    const renderStep2 = () => (
        <>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
            />
            <TextInput
                style={styles.input}
                placeholder="Wachtwoord"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.wachtwoord}
                onChangeText={(text) => updateFormData('wachtwoord', text)}
                editable={!isLoading}
            />
            <TextInput
                style={styles.input}
                placeholder="Wachtwoord bevestigen"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.wachtwoordBevestigen}
                onChangeText={(text) => updateFormData('wachtwoordBevestigen', text)}
                editable={!isLoading}
            />
            <TouchableOpacity
                style={[styles.button, isLoading && styles.disabledButton]}
                onPress={handleNext}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FDFDFD" />
                ) : (
                    <Text style={styles.buttonText}>Registreer</Text>
                )}
            </TouchableOpacity>
        </>
    );

    const renderStep3 = () => (
        <>
            <Text style={styles.successTitle}>Registratie voltooid.</Text>
            <Text style={styles.successText}>
                Ga naar het login scherm om in te loggen!
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </>
    );

    return (
        <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                {/*{renderHeader()}*/}
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}
                        {currentStep !== 3 && (
                            <>
                                <View style={styles.dividerContainer}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>of</Text>
                                    <View style={styles.dividerLine} />
                                </View>
                                <TouchableOpacity
                                    style={[styles.secondaryButton, isLoading && styles.disabledButton]}
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(11, 20, 8, 0.57)',
        zIndex: 1,
    },
    container: {
        flex: 1,
        zIndex: 2,
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
    },
    headerText: {
        fontSize: 30,
        color: '#FDFDFD',
        fontWeight: '300',
        letterSpacing: 2,
    },
    headerTextBold: {
        fontSize: 30,
        color: '#FDFDFD',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 120,
    },
    formContainer: {
        width: width * 0.85,
        backgroundColor: '#FDFDFD',
        borderRadius: 12,
        padding: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    countryPhoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    countryCode: {
        backgroundColor: '#2B3D25',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    countryCodeText: {
        color: '#FDFDFD',
        fontWeight: 'bold',
        fontSize: 14,
    },
    phoneInput: {
        flex: 1,
        marginBottom: 0,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#2B3D25',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#1F3A3D',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#FDFDFD',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondaryButton: {
        backgroundColor: '#1F3A3D',
        paddingVertical: 15,
        borderRadius: 8,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#70746F',
    },
    dividerText: {
        marginHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#70746F',
    },
    successTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        textAlign: 'center',
        marginBottom: 20,
    },
    successText: {
        fontSize: 14,
        color: '#212529',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 30,
    },
});
