import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View, StyleSheet, Text, Button, ActivityIndicator} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { initDatabase } from "./database";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import QRDetailScreen from './screens/QRDetailsScreen';
import PlanPickupScreen from './screens/PlanPickupScreen';
import ScanScreen from './screens/ScanScreen';
import AccountScreen from './screens/AccountScreen';
import DbTestScreen from "./screens/test-screen/DbTestScreen";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
        <HomeStack.Screen name="QRDetail" component={QRDetailScreen} options={{ title: 'Details' }} />
        <HomeStack.Screen name="PlanPickup" component={PlanPickupScreen} options={{ title: 'Afspraak maken' }} />
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
                backgroundColor: '#2F4538'
            },
            tabBarActiveTintColor: '#597364',
            tabBarInactiveTintColor: '#FDFDFD',
        })}
    >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Account">
            {() => (
                <View style={styles.container}>
                    <AccountScreen currentUser={currentUser} />
                    <Button title="Logout" onPress={onLogout} />
                </View>
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
        const initializeDatabase = async () => {
            try {
                await initDatabase();
                setIsDbInitialized(true);
                console.log("Database geïnitialiseerd")
            } catch (error) {
                console.error("Database initialisatie mislukt", error)
            }
        };
        initializeDatabase();
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        setUserIsLoggedIn(true);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setUserIsLoggedIn(false);
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
                <AuthNavigator onLogin={handleLogin()} />
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