import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import QRDetailScreen from './screens/QRDetailsScreen';
import PlanPickupScreen from './screens/PlanPickupScreen';
import ScanScreen from './screens/ScanScreen';
import AccountScreen from './screens/AccountScreen';

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
);

const HomeNavigator = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <HomeStack.Screen name="QRDetail" component={QRDetailScreen} options={{ title: 'Details' }} />
      <HomeStack.Screen name="PlanPickup" component={PlanPickupScreen} options={{ title: 'Afspraak maken' }} />
    </HomeStack.Navigator>
);

const AppTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Scan') iconName = 'camera-outline';
            else if (route.name === 'Account') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
);


export default function App() {
  const userIsLoggedIn = true; // ← veranderen dit later naar een echte auth-check

  return (
      <NavigationContainer>
        {userIsLoggedIn ? <AppTabs /> : <AuthNavigator />}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
