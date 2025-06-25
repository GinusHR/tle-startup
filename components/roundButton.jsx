import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const {height} = Dimensions.get("window");
const RoundButton = ({onPress, title, icon, a11yLabel}) => (
    <View style={styles.buttonAndTextContainer}>
        <TouchableOpacity
            style={styles.roundButton}
            onPress={onPress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={a11yLabel}
        >
            <View accessible={false}
                  style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                {icon}
            </View>
        </TouchableOpacity>
        {title ? (
            <Text style={styles.buttonText}>{title}</Text>
        ) : null}
    </View>
);

const styles = StyleSheet.create({
    buttonAndTextContainer: {
        alignItems: "center",
    },
    roundButton: {
        width: 45,
        height: 45,
        backgroundColor: "#2F4538",
        borderRadius: 100,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 1.5,
    },
    buttonText: {
        position: "relative",
        fontFamily: "Montserrat",
        fontSize: 12,
        fontWeight: "bold",
        color: "#212529",
        marginTop: height * (10 / height),
    },
})

export default RoundButton;