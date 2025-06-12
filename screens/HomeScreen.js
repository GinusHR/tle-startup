import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View>
           <Pressable onPress={
                   () => {
                     navigation.navigate('Admin')
                   }
                 } style={[styleSheet.mainBtn, styleSheet.btnYellow]}  >
                   <Text>To Admin</Text>
                 </Pressable>
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