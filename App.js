import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View, StyleSheet, Text, Button} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
            name="Login" component={LoginScreen} initialParams={{ onLogin }}
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

const AppTabs = ({ onLogout }) => (
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
                    <AccountScreen />
                    <Button title="Logout" onPress={onLogout} />
                </View>
            )}
        </Tab.Screen>
    </Tab.Navigator>
);


export default function App() {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [fontsLoaded] = useFonts({
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null; // Of een <Loading /> component
    }

    return (
        <NavigationContainer>
            {userIsLoggedIn ? (
                <AppTabs onLogout={() => setUserIsLoggedIn(false)} />
            ) : (
                <AuthNavigator onLogin={() => setUserIsLoggedIn(true)} />
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
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});
