import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View, StyleSheet, Text, ActivityIndicator, Alert} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import {getAllUsers, initDatabase} from "./database";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import QRDetailScreen from './screens/QRDetailsScreen';
import PlanPickupScreen from './screens/PlanPickupScreen';
import ScanScreen from './screens/ScanScreen';
import AccountScreen from './screens/AccountScreen';
import ScannedItemsDetails from "./screens/ScannedItemsDetails";

import AdminScreen from './screens/adminscreens/AdminScreen';
import CameraScreen from './screens/adminscreens/CameraScreen';
import CheckListScreen from './screens/adminscreens/CheckListScreen';

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
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
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
      <HomeStack.Screen name="QRDetail" component={QRDetailScreen} options={{ title: 'Details' }} />
      <HomeStack.Screen name="PlanPickup" component={PlanPickupScreen} options={{ title: 'Afspraak maken' }} />
      <HomeStack.Screen name="details" component={ScannedItemsDetails} options={{ title: 'Details', presentation: 'modal', animation: 'slide_from_right',}} />
    </HomeStack.Navigator>
);

const AdminNavigator = () => (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
        <AdminStack.Screen name="AdminMain" component={AdminScreen}/>
         <AdminStack.Screen name="Camera" component={CameraScreen}/>
        <AdminStack.Screen name="CheckList" component={CheckListScreen}/>
   </AdminStack.Navigator>
)

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
        <Tab.Screen name="Home" options={{ headerShown: false, headerTitle: '' , headerShadowVisible: false}} component={HomeNavigator} />
        <Tab.Screen name="Scan" options={{ headerTitle: '' , headerShadowVisible: false}} component={ScanScreen} />
        <Tab.Screen name="Account" options={{ headerTitle: '', headerShadowVisible: false }}>
            {() => (
                <AccountScreen currentUser={currentUser} onLogout={onLogout} />
            )}
        </Tab.Screen>
    </Tab.Navigator>
);

const AdminTabs = ({ onLogout, currentUser }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                if (route.name === 'Admin') {
                    return <MaterialIcons name="admin-panel-settings" size={size} color={color} />;
                } else if (route.name === 'Camera') {
                    return <MaterialIcons name="camera" size={size} color={color} />;
                } else if (route.name === 'CheckList') {
                    return <MaterialIcons name="checklist" size={size} color={color} />;
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
        <Tab.Screen name="Admin" options={{ headerShown: false, headerTitle: '', headerShadowVisible: false}} component={AdminNavigator} />
        <Tab.Screen name="Camera" options={{ headerTitle: '', headerShadowVisible: false}} component={CameraScreen} />
        <Tab.Screen name="CheckList" options={{ headerTitle: '', headerShadowVisible: false}} component={CheckListScreen} />
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

    if (!fontsLoaded || !isDbInitialized) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#2F4538" />
                <Text style={styles.loadingText}>Laden...</Text>
            </View>
        )
    }

    const renderAppNavigation = () => {
        if (currentUser && currentUser.role === 1) {
            return <AdminTabs onLogout={handleLogout} currentUser={currentUser} />;
        } else {
            return <AppTabs onLogout={handleLogout} currentUser={currentUser} />;
        }
    };

    return (
        <NavigationContainer>
            {userIsLoggedIn ? (
                renderAppNavigation()
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
