import React, {useLayoutEffect} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';


export default function HomeScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate('QRDetail')}
                    style={{marginRight: 16}}
                >
                    <Ionicons name="qr-code" size={24} color="#2F4538"/>
                </Pressable>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button
                title="Go to Plan Pickup"
                onPress={() => navigation.navigate('PlanPickup')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    qrButton: {
        marginRight: 16,
    },
    qrPlaceholder: {
        width: 24,
        height: 24,
        backgroundColor: '#2F4538',
        borderRadius: 4,
    },
});
