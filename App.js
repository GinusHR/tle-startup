import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { useFonts } from 'expo-font';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

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
import Wallet from "./screens/WalletScreen";

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
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <HomeStack.Screen name="QRDetail" component={QRDetailScreen} options={{ title: 'Details' }} />
        <HomeStack.Screen name="PlanPickup" component={PlanPickupScreen} options={{ title: 'Afspraak maken' }} />
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
            name="Wallet"
            component={Wallet}
            options={{
                title: 'Wallet',
                presentation: 'card',
                animation: 'slide_from_right',
            }}/>
    </HomeStack.Navigator>
);

const AppTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          // headerShown: true,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Scan') iconName = 'camera-outline';
            else if (route.name === 'Account') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
            tabBarStyle: {
              backgroundColor: '#2F4538',
            },
            tabBarActiveTintColor: '#597364',
            tabBarInactiveTintColor: '#FDFDFD',
        })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false, headerTitle: '' , headerShadowVisible: false, unmountOnBlur: true }} component={HomeNavigator} />
      <Tab.Screen name="Scan" options={{ headerTitle: '' , headerShadowVisible: false}} component={ScanScreen} />
      <Tab.Screen name="Account" options={{ headerTitle: '' , headerShadowVisible: false}}  component={AccountScreen} />
    </Tab.Navigator>
);


export default function App() {
    const [fontsLoaded] = useFonts({
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null; // Of een <Loading /> component
    }

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
