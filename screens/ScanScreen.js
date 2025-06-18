import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Pressable } from 'react-native';

export default function ScanScreen({navigation}) {
  
    return (
        <View>
            <Text>Scan</Text>
            <Pressable onPress={
                    () => {
                      useRoute
                      navigation.navigate('CheckList')
                    }
                  } style={[styleSheet.mainBtn, styleSheet.btnYellow ]}  >
                    <Text>CheckList</Text>
                  </Pressable>
        </View>
    );
}
const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20
  },
  mainBtn: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnGreen: {
    backgroundColor: "#0BCD4C",
  },
  btnYellow: {
    backgroundColor: "yellow",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});