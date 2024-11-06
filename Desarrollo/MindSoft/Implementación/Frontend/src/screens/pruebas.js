import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Pruebas() {
    const estado = { valor: new Animated.Value(2.5) }; // Inicia desde 0

    // Interpolación de rotación sobre el propio eje
    const animInterpolation = estado.valor.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-90deg', '90deg'], // Cambia los ángulos según el rango que desees
    });


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu" size={40} color="black" paddingTop={5} />
                <View style={styles.separator} />
            </View>

            {/* Indicador con rotación sobre su propio eje */}
            <Animated.View 
                style={[
                    styles.rotatingIcon, 
                    { transform: [{ rotate: animInterpolation }] }
                ]}
            >
                <Ionicons name="navigate-outline" size={60} color="black" />
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ADC0D1',
        paddingTop: 35,
        paddingHorizontal: 0,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#0B72D0',
        height: 50,
        paddingLeft: 10,
    },
    separator: {
        width: 4,
        height: 50,
        backgroundColor: '#ADC0D1',
        marginHorizontal: 10,
    },
    rotatingIcon: {
        position: "absolute",
        top: 200,
        left: 180,
    },
});
