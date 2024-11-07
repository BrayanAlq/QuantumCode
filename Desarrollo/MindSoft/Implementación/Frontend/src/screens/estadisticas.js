import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Estadisticas() {
    const logo = require("../../assets/clipart2905515.png");
    const [dailyRatings, setDailyRatings] = useState([]);
    const [currentRating, setCurrentRating] = useState(0);
    const [estado, setEstado] = useState(new Animated.Value(0)); // Cambié esto para manejar el valor de la animación

    const emojisCalif = [
        { emoji: '😖' },
        { emoji: '😊' },
    ];

    // Generar datos ficticios de calificaciones para los últimos 7 días
    useEffect(() => {
        const mockRatings = Array.from({ length: 7 }, () => Math.floor(Math.random() * 5) + 1);
        setDailyRatings(mockRatings);
        const average = mockRatings.reduce((a, b) => a + b, 0) / mockRatings.length;
        setCurrentRating(average); // Establece el valor del medidor como el promedio

        const prm = 2.26 + ((currentRating.toFixed(2)-1) * 0.62);
        setEstado(new Animated.Value(prm)); // Actualiza el valor de la animación cuando el promedio cambia

    }, [currentRating]); // El useEffect se ejecuta cuando el currentRating cambia

    const animInterpolation = estado.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-90deg', '90deg'], // Cambia los ángulos según el rango que desees
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu" size={40} color="black" paddingTop={5} />
                <View style={styles.separator} />
            </View>

            <View style={styles.boxContainer}>
                <Text style={styles.boxText}>Estadística de calificación del día</Text>
                <Text style={styles.averageText}>Promedio semanal</Text>
                
                <Image source={logo} style={styles.userImage} />

                {/* Indicador con rotación sobre su propio eje */}
                <Animated.View 
                    style={[
                        styles.rotatingIcon, 
                        { transform: [{ rotate: animInterpolation }] }
                    ]}
                >
                    <Ionicons name="navigate-outline" size={60} color="#0B72D0" />
                </Animated.View>

                <View style={styles.boxContainer1}>
                    <Text style={styles.averageText1}>{currentRating.toFixed(1)}</Text>
                </View>

                <View style={styles.emojiRow}>
                    {emojisCalif.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.emojiContainer}>
                            <Text style={styles.emoji1}>{item.emoji}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
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
        top: 210,
        left: 150,
    },
    boxContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        width: '90%',
        alignSelf: 'center',
    },
    boxText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
    },
    averageText: {
        fontSize: 18,
        color: '#0B72D0',
        marginVertical: 10,
    },
    averageText1: {
        fontSize: 18,
        color: 'white',
        marginVertical: 9,
    },
    boxContainer1: {
        backgroundColor: '#0B72D0',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '25%',
        alignSelf: 'center',
    },
    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 35,
    },
    emojiContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: -90,
    },
    emoji1: {
        fontSize: 40,
    },
    userImage: {
        width: 260,
        height: 190,
        marginBottom: 0,
        marginLeft: 5,
        marginTop: 15,
    },
});
