import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MenuItem = ({ title, altText, icon, onPress, color = '#000', rightElement }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
                {typeof icon === 'string' ? (
                    <Ionicons name={icon} size={22} color={color} style={styles.icon} />
                ) : (
                    <View style={[styles.icon, { marginRight: 8 }]}>
                        {icon}
                    </View>
                )}
                <Text style={[styles.menuText, { color }]}>{title}</Text>
            </View>
            {rightElement && <View>{rightElement}</View>}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default MenuItem;
