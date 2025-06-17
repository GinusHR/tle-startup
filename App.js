import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';

import { getAllUsers, initDatabase} from "./database";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import QRDetailScreen from './screens/QRDetailsScreen';
import PlanPickupScreen from './screens/PlanPickupScreen';
import ScanScreen from './screens/ScanScreen';
import AccountScreen from './screens/AccountScreen';
import AdminScreen from "./screens/AdminScreen";
import CameraScreen from "./screens/CameraScreen";
import DbTestScreen from "./screens/test-screen/DbTestScreen";
import ScannedItemsDetails from "./screens/ScannedItemsDetails";
import AddressPickerScreen from "./screens/AddressPickerScreen";
import DateTimePickerScreen from "./screens/DateTimePickerScreen";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

if (!__DEV__) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
}

const AuthNavigator = ({ onLogin }) => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ onLogin }}
        />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
);

const HomeNavigator = () => (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{title: 'Home', headerShown: false}}/>
        <HomeStack.Screen name="QRDetail" component={QRDetailScreen} options={{title: 'Details'}}/>
        <HomeStack.Screen name="PlanPickup" component={PlanPickupScreen} options={{title: 'Afspraak maken'}}/>
        <HomeStack.Screen name="Admin" component={AdminScreen}/>
        <HomeStack.Screen name="Camera" component={CameraScreen}/>
        <HomeStack.Screen
            name="details"
            component={ScannedItemsDetails}
            options={{
                title: 'Details',
                presentation: 'modal',
                animation: 'slide_from_right',
            }}
        />
        <HomeStack.Screen
            name="AddressPicker"
            component={AddressPickerScreen}
            options={{
                title: 'Adres',
                presentation: 'modal',
                animation: 'slide_from_right',
            }}
        />
        <HomeStack.Screen
            name="DateTimePicker"
            component={DateTimePickerScreen}
            options={{
                title: 'Datum & Tijd',
                presentation: 'modal',
                animation: 'slide_from_right',
            }}
      />
    </HomeStack.Navigator>
);

const AppTabs = ({ onLogout, currentUser }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                if (route.name === 'Home') {
                    return <MaterialIcons name="dashboard" size={size} color={color} />;
                } else if (route.name === 'Scan') {
                    return <MaterialIcons name="camera" size={size} color={color} />;
                } else if (route.name === 'Account') {
                    return <Ionicons name="person" size={size} color={color} />;
                }
            },
            tabBarStyle: {
                backgroundColor: '#2F4538',
            },
            tabBarActiveTintColor: '#597364',
            tabBarInactiveTintColor: '#FDFDFD',
        })}
    >
        <Tab.Screen name="Home" options={{ headerShown: false, headerTitle: '' , headerShadowVisible: false}} component={HomeNavigator} />
        <Tab.Screen name="Scan" options={{ headerTitle: '' , headerShadowVisible: false}} component={ScanScreen} />
        <Tab.Screen name="Account" options={{ headerTitle: '', headerShadowVisible: false }}>
            {() => (
                <AccountScreen currentUser={currentUser} onLogout={onLogout} />
            )}
        </Tab.Screen>
    </Tab.Navigator>
);


export default function App() {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isDbInitialized, setIsDbInitialized] = useState(false)
    const [fontsLoaded] = useFonts({
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await SecureStore.getItemAsync('user');
                if (savedUser) {
                    setCurrentUser(JSON.parse(savedUser));
                    setUserIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Fout bij het ophalen van gebruiker uit SecureStore", error);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                await initDatabase();
                setIsDbInitialized(true);
                console.log("Database geïnitialiseerd");
            } catch (error) {
                console.error("Database initialisatie mislukt", error);
            }
        };
        initializeDatabase();
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        setUserIsLoggedIn(true);
    };

    const handleLogout = async () => {
        setCurrentUser(null);
        setUserIsLoggedIn(false);
        await SecureStore.deleteItemAsync('user')
    };

    if (!fontsLoaded) {
        return null; // Of een <Loading /> component
    }

    if (!isDbInitialized) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#2F4538" />
                <Text style={styles.loadingText}>Laden...</Text>
            </View>
        )
    }

    return (
        <NavigationContainer>
            {userIsLoggedIn ? (
                <AppTabs onLogout={handleLogout} currentUser={currentUser} />
            ) : (
                <AuthNavigator onLogin={handleLogin} />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#2F4538',
    },
});
