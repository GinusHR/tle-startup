import React from "react";
import {Pressable, Text, StyleSheet, View, Dimensions} from "react-native";

const { width, height } = Dimensions.get("window");
const RoundButton = ({ onPress, title, icon}) => (
    <View style={styles.buttonAndTextContainer}>
        <Pressable style={styles.roundButton} onPress={ onPress }>
            { icon }
        </Pressable>
        { title ? (
            <Text style={styles.buttonText}>{ title }</Text>
        ) : null}
    </View>
);

const styles = StyleSheet.create({
    buttonAndTextContainer: {
        alignItems: "center",
    },
    roundButton: {
        width: 35,
        height: 35,
        backgroundColor: "#2F4538",
        borderRadius: 100,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
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