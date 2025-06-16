import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login pressed', { email, password });
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    const handleForgotPassword = () => {
        console.log('Forgot password pressed');
    };

    const renderBackgroundText = () => {
        return Array.from({ length: 12 }).map((_, i) => (
            <Text
                key={i}
                style={[styles.backgroundText, { opacity: i === 4 ? 1 : 0.3 }]}
            >
                STATIESCAN
            </Text>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.backgroundContainer}>{renderBackgroundText()}</View>

                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>Image Placeholder</Text>
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Wachtwoord"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>of</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <Text style={styles.registerButtonText}>Registreer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.forgotPasswordButton}
                            onPress={handleForgotPassword}
                        >
                            <Text style={styles.forgotPasswordButtonText}>Wachtwoord vergeten</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F4538',
    },
    scrollContainer: {
        flexGrow: 1,
        minHeight: height,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 60,
    },
    backgroundText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 2,
        marginVertical: 2,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    imageContainer: {
        marginBottom: 40,
    },
    imagePlaceholder: {
        width: width * 0.8,
        height: 120,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        borderWidth: 3,
        borderColor: '#4a90e2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: '#666',
        fontSize: 16,
    },
    formContainer: {
        width: width * 0.8,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        padding: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    inputContainer: {
        marginBottom: 20,
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#2c3e2c',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 15,
        fontSize: 16,
        color: '#666',
    },
    registerButton: {
        backgroundColor: '#2c3e2c',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    forgotPasswordButton: {
        backgroundColor: '#2c3e2c',
        paddingVertical: 15,
        borderRadius: 8,
    },
    forgotPasswordButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
