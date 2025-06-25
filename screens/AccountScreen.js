import React from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Header from '../components/header';
import HeaderAdmin from '../components/headerAdmin';

const {width} = Dimensions.get("window");
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);

export default function AccountScreen({onLogout, currentUser}) {
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    paddingHorizontal: 30,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}
            >
                {currentUser?.role === 1 ? (
                    <HeaderAdmin title="Account"/>
                ) : (
                    <Header title="Account"/>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <MenuItem title="Account" icon="person-outline" color={'#1D1F21'} altText="Icoon van een man"/>
                    <MenuItem title="Help" icon="help-circle-outline" color={'#1D1F21'}
                              altText="Icoon van een een vraagteken in een cirkel"/>
                    <MenuItem title="Leren" icon="book-outline" color={'#1D1F21'} altText="Icoon van een open boek"/>
                </View>

                <View style={styles.card}>
                    <MenuItem title="Over ons" icon="information-circle-outline" color={'#1D1F21'}
                              altText="Icoon van een informatie I in een cirkel"/>
                    <MenuItem title="FAQ’s" icon="chatbubble-ellipses-outline" color={'#1D1F21'}
                              altText="Icoon van een spraakwolk met 3 puntjes"/>
                    <MenuItem title="Algemene voorwaarden" icon="document-text-outline" color={'#1D1F21'}
                              altText="Icoon van papier met lijnen die dienen als tekst"/>
                </View>

                <View style={styles.logoutCard}>
                    <MenuItem
                        title="Uitloggen"
                        icon="log-out-outline"
                        color={'#1D1F21'}
                        onPress={onLogout}
                        altText="Icoon van een pijltje die uit de deur gaat"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const MenuItem = ({title, altText, icon, onPress, color, rightElement}) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
                <Ionicons name={icon} size={22} color={color} style={styles.icon} alt={altText}/>
                <Text style={[styles.menuText, {color}]}>{title}</Text>
            </View>
            {rightElement && <View>{rightElement}</View>}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    pageTitle: {
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(36),
        fontWeight: '800',
        color: '#212529',
        letterSpacing: -1,
    },
    card: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 20,
    },
    logoutCard: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 30,
        marginBottom: 60,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    menuText: {
        fontSize: 16,
        fontFamily: 'montserrat-regular',
    },
});
