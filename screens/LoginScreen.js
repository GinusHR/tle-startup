import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    ActivityIndicator,
    ImageBackground,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import BackgroundImage from '../assets/images/background.png';
import { getUser } from '../database';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { onLogin } = route.params;

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Vul alle velden in');
            return;
        }

        setIsLoading(true);
        try {
            const user = await getUser(email, password);
            if (user) {
                await SecureStore.setItemAsync('user', JSON.stringify({
                    id: user.id,
                    email: user.email
                }));
                onLogin({ id: user.id, email: user.email });
            } else {
                Alert.alert('Login mislukt', 'Email of wachtwoord is incorrect');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Er is een fout opgetreden bij het inloggen');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = () => navigation.navigate('Register');
    const handleForgotPassword = () =>
        Alert.alert('Wachtwoord vergeten', 'Deze functie wordt binnenkort toegevoegd');

    return (
        <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
            <View style={styles.overlay} />

            <View style={[styles.decorationContainer, { paddingTop: insets.top + 10 }]}>
                {Array.from({ length: 15 }, (_, i) => (
                    <Text
                        key={i}
                        style={i % 2 === 0 ? styles.headerText : styles.headerTextBold}
                    >
                        STATIESCAN
                    </Text>
                ))}
            </View>

            <View style={[styles.container, { paddingTop: insets.top }]}>
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
                                editable={!isLoading}
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
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, isLoading && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FDFDFD" />
                            ) : (
                                <Text style={styles.loginButtonText}>Login</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>of</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, isLoading && styles.disabledButton]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            <Text style={styles.registerButtonText}>Registreer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.forgotPasswordButton, isLoading && styles.disabledButton]}
                            onPress={handleForgotPassword}
                            disabled={isLoading}
                        >
                            <Text style={styles.forgotPasswordButtonText}>Wachtwoord vergeten</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        zIndex: 0,
    },
    decorationContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 1,
    },
    headerText: {
        fontSize: 30,
        color: '#FDFDFD',
        fontWeight: '300',
        opacity: 0.5,
        letterSpacing: 2,
    },
    headerTextBold: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.8,
        letterSpacing: 2,
    },
    container: {
        flex: 1,
        zIndex: 2,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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
        paddingVertical: Platform.OS === 'ios' ? 12 : 10,
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
    disabledButton: {
        opacity: 0.6,
    },
});
