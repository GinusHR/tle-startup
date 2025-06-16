import React from "react";
import {Pressable, Text, StyleSheet, View, Dimensions} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import RoundButton from "./roundButton";

const { width, height } = Dimensions.get("window");
const scale = width / 440;
const scaleFontSize = (figmaFontSize) => figmaFontSize * (width / 430);
const DataBoxes = ({ onPress, title, body, subBody, button }) => (
    <View style={style.container}>
        <View style={style.textContainer}>
            <Text style={style.title}>{title}</Text>
            { subBody ? (
                <View style={style.bodySubBodyContainer}>
                    <Text style={style.body}>
                        { body }
                    </Text>
                    <Text style={style.subBody}>
                        { subBody }
                    </Text>
                </View>
            ) : <Text style={style.body}>{body}</Text> }
        </View>
        <View style={style.buttonContainer}>
            { button ? (
                <View style={style.line}/>
            ) : null }
            { button }
        </View>
    </View>
);

const style = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#D9D9D9',
        borderStyle: 'solid',
        borderWidth: 2.5,
        borderRadius: 10,
        padding: width * 0.04,
        paddingRight: 20,
        marginBottom: 30,
    },
    textContainer: {
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodySubBodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: "100%"
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(24),
        fontWeight: 'bold',
    },
    body: {
        fontFamily: 'Montserrat',
        fontSize: scaleFontSize(36),
        fontWeight: '700',
        marginTop: 10,
    },
    subBody: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: scaleFontSize(24),
        color: '#6B7780',
    },
    line: {
        position: 'relative',
        width: 2,
        height: "85%",
        backgroundColor: '#d9D9D9',
        borderRadius: 1,
        marginRight: 20,
    },
})

export default DataBoxes;