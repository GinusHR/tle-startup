import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView,
} from 'react-native';
import { ImageBackground, Image } from 'react-native';
import BackgroundImage from '../assets/images/background.png';
import BottleImage from '../assets/images/bottle.png';


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

    const renderHeader = () => (
        <View style={styles.backgroundContainer}>
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


    return (
        <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                    {renderHeader()}

                    <View style={styles.contentContainer}>

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
        ...StyleSheet.absoluteFillObject, // makes the overlay cover the whole screen
        backgroundColor: 'rgba(11, 20, 8, 0.57)', // 57% opacity over dark green
        zIndex: 1,
    },
    container: {
        flex: 1,
        zIndex: 2, // above the overlay
    },
    backgroundContainer: {
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
        paddingTop: 100,
    },
    bottleImage: {
        width: width * 0.8,
        height: 120,
        marginBottom: 20,
    },
    backgroundText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FDFDFD',
        letterSpacing: 2,
        marginVertical: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
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
        backgroundColor: '#FDFDFD',
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
        borderBottomColor: '#2B3D25',
        color: '#8E8E8E',
    },
    loginButton: {
        backgroundColor: '#1F3A3D',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FDFDFD',
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
        backgroundColor: '#70746F',
    },
    dividerText: {
        marginHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#70746F',
    },
    registerButton: {
        backgroundColor: '#1F3A3D',
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
        backgroundColor: '#1F3A3D',
        paddingVertical: 15,
        borderRadius: 8,
    },
    forgotPasswordButtonText: {
        color: '#FDFDFD',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
