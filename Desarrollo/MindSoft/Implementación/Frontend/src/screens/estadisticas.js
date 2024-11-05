import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; // Agregamos TouchableOpacity
import { Ionicons } from '@expo/vector-icons';
import RNSpeedometer from 'react-native-speedometer'; // Importa el componente de medidor de velocidad

export default function Estadisticas() {
    const [dailyRatings, setDailyRatings] = useState([]);
    const [currentRating, setCurrentRating] = useState(0); // Estado para el valor del medidor
    const [selectedFeeling, setSelectedFeeling] = useState(null); // Agregamos estado para el sentimiento seleccionado

    const emojisCalif = [
        { emoji: '😖' }, // Agregamos una propiedad label
        { emoji: '😊' },
    ];

    const handleSelect = (emoji) => {
        setSelectedFeeling(emoji); // Cambia el estado del sentimiento seleccionado
    };

    useEffect(() => {
        // Generar datos ficticios de calificaciones para los últimos 7 días
        const mockRatings = Array.from({ length: 7 }, () => Math.floor(Math.random() * 5) + 1);
        setDailyRatings(mockRatings);
        const average = mockRatings.reduce((a, b) => a + b, 0) / mockRatings.length;
        setCurrentRating(average); // Establece el valor del medidor como el promedio
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu" size={40} color="black" paddingTop={5} />
                <View style={styles.separator} />
            </View>

            <View style={styles.boxContainer}>
                <Text style={styles.boxText}>Estadística de calificación del día</Text>
                <Text style={styles.averageText}>Promedio semanal</Text>
                
                {/* Componente de medidor de velocidad */}
                <RNSpeedometer value={currentRating} size={200} />

                <View style={styles.boxContainer1}>
                    <Text style={styles.averageText1}>{currentRating.toFixed(1)}</Text>
                </View>

                <View style={styles.emojiRow}>
                    {emojisCalif.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelect(item.emoji)} style={styles.emojiContainer}>
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
    boxContainer: {
        backgroundColor: 'white', // Color de fondo blanco
        borderRadius: 10, // Bordes redondeados
        padding: 20, // Espacio interno
        alignItems: 'center', // Centra el contenido
        marginTop: 20, // Espacio entre el título y el contenedor
        shadowColor: '#000', // Color de sombra
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // Elevación para Android
        width: '90%', // Ancho del contenedor
        alignSelf: 'center', // Centra el contenedor en la pantalla
    },
    boxText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left', // Centra el texto dentro del contenedor
    },
    averageText: {
        fontSize: 18,
        color: '#0B72D0',
        marginVertical: 10,
    },
    averageText1: {
        fontSize: 18,
        color: 'white',
        marginVertical: 10,
       
    },
    boxContainer1: {
        backgroundColor: '#0B72D0', // Color de fondo
        borderRadius: 10, // Bordes redondeados
        padding: 5, // Espacio interno
        alignItems: 'center', // Centra el contenido
        marginTop: 10, // Espacio entre el título y el contenedor
        width: '25%', // Ancho del contenedor para que no se expanda
        alignSelf: 'center', // Centra el contenedor
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
});
