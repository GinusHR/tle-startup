import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';

export default function RegisterScreen() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        naam: '',
        achternaam: '',
        telefoon: '',
        email: '',
        wachtwoord: '',
        wachtwoordBevestigen: '',
    });

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
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
            if (formData.wachtwoord !== formData.wachtwoordBevestigen) {
                Alert.alert('Error', 'Wachtwoorden komen niet overeen');
                return;
            }
            setCurrentStep(3);
        }
    };

    const handleLogin = () => {
        // Handle login logic
        Alert.alert('Login', 'Login functionaliteit');
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>STATIESCAN</Text>
            <Text style={styles.headerText}>STATIESCAN</Text>
            <Text style={styles.headerText}>STATIESCAN</Text>
            <Text style={styles.headerText}>STATIESCAN</Text>
            <Text style={styles.headerTextBold}>STATIESCAN</Text>
            <Text style={styles.headerText}>STATIESCAN</Text>
            <Text style={styles.headerText}>STATIESCAN</Text>
            <Text style={styles.headerText}>STATIESCAN</Text>
        </View>
    );

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            <View style={[styles.step, currentStep >= 1 && styles.stepActive]}>
                <Text style={[styles.stepText, currentStep >= 1 && styles.stepTextActive]}>1</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={[styles.step, currentStep >= 2 && styles.stepActive]}>
                <Text style={[styles.stepText, currentStep >= 2 && styles.stepTextActive]}>2</Text>
            </View>
        </View>
    );

    const renderStep1 = () => (
        <View style={styles.formContainer}>
            {renderStepIndicator()}

            <TextInput
                style={styles.input}
                placeholder="Naam"
                placeholderTextColor="#999"
                value={formData.naam}
                onChangeText={(text) => updateFormData('naam', text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Achternaam"
                placeholderTextColor="#999"
                value={formData.achternaam}
                onChangeText={(text) => updateFormData('achternaam', text)}
            />

            <View style={styles.phoneContainer}>
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
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Volgende</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>of</Text>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.formContainer}>
            {renderStepIndicator()}

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Wachtwoord"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.wachtwoord}
                onChangeText={(text) => updateFormData('wachtwoord', text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Wachtwoord bevestigen"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.wachtwoordBevestigen}
                onChangeText={(text) => updateFormData('wachtwoordBevestigen', text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Registreer</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>of</Text>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.formContainer}>
            <Text style={styles.successTitle}>Registratie bijna voltooid.</Text>

            <Text style={styles.successText}>
                We hebben je een bevestigingsmail gestuurd.
                Volg de instructies in de mail om de registratie af te ronden.
            </Text>

            <View style={styles.bottleContainer}>
                <View style={styles.bottle1} />
                <View style={styles.bottle2} />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View style={styles.card}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d5016',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    headerText: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.3)',
        fontWeight: '300',
        letterSpacing: 2,
    },
    headerTextBold: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
    },
    stepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    step: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepActive: {
        backgroundColor: '#2d5016',
    },
    stepText: {
        color: '#999',
        fontWeight: 'bold',
    },
    stepTextActive: {
        color: '#ffffff',
    },
    stepLine: {
        width: 50,
        height: 2,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 10,
    },
    formContainer: {
        width: '100%',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15,
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    countryCode: {
        backgroundColor: '#2d5016',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    countryCodeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    phoneInput: {
        flex: 1,
        marginBottom: 0,
    },
    button: {
        backgroundColor: '#2d5016',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        color: '#999',
        marginBottom: 20,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#2d5016',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    successText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 30,
    },
    bottleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    bottle1: {
        width: 40,
        height: 60,
        backgroundColor: '#c4a484',
        borderRadius: 8,
        marginRight: 15,
    },
    bottle2: {
        width: 35,
        height: 55,
        backgroundColor: '#7fb069',
        borderRadius: 8,
    },
});