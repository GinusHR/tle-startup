import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Home</Text>
            <Button
                title="Go to Plan Pickup"
                onPress={() => navigation.navigate('PlanPickup')}
            />
        </View>
    );
}

const styleSheet = StyleSheet.create({
    mainBtn: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnYellow: {
    backgroundColor: "yellow",
  },
})