import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePromedio } from '../hooks/usePromedio';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { LineChart } from 'react-native-chart-kit'; // Importa LineChart
import { Dimensions } from 'react-native'; // Para el tamaño del gráfico
import * as SecureStore from 'expo-secure-store';
import { useDailyRating } from '../hooks/useDailyRating';

export default function Estadisticas() {
    const logo = require("../../assets/clipart2905515.png");
    const [dailyRatings, setDailyRatings] = useState([]);
    const [currentRating, setCurrentRating] = useState(0);
    const [estado, setEstado] = useState(new Animated.Value(0)); // Inicializa estado de animación
    const { rating_week, rating_all, error, loading, fetchStatRating } = usePromedio();
    const { fetchDailyRatings } = useDailyRating();
    const [loadingData, setLoadingData] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();

    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const día = String(fechaActual.getDate()).padStart(2, '0');
    const fecha = `${año}-${mes}-${día}`;
    
    const promedioSemana = rating_week?.average_rating || 0;

    const emojisCalif = [
        { emoji: '😖' },
        { emoji: '😊' },
    ];

    // Vamos a simular los datos de calificaciones diarias (en formato que mencionaste):
    const dailyRatingsData = [
        { daily_rating_id: 1, rating: 1, date: '2024-10-16', user_id: 1 },
        { daily_rating_id: 2, rating: 3, date: '2024-11-07', user_id: 1 },
        { daily_rating_id: 3, rating: 3, date: '2024-11-08', user_id: 1 },
        { daily_rating_id: 4, rating: 3, date: '2024-11-09', user_id: 1 },
    ];

    useEffect(() => {
        const obtenerCalificacionesDiarias = async () => {
            try {
                const token = await SecureStore.getItemAsync('authToken');
                if (!token) {
                    console.log('No se pudo obtener el token de autenticación');
                    return;
                }
    
                const data = await fetchDailyRatings(token);
    
                if (data && Array.isArray(data)) {
                    setDailyRatings(data);  // Asegúrate de actualizar el estado
                    setLoadingData(false);   // Datos obtenidos, se puede ocultar el indicador de carga
                }
            } catch (error) {
                console.log('Error al obtener las calificaciones diarias:', error);
                setLoadingData(false);   // En caso de error, también se oculta el indicador de carga
            }
        };
    
        obtenerCalificacionesDiarias();
    }, []);

    useEffect(() => {
        fetchStatRating(fecha);
    }, [fecha]);

    useFocusEffect(
        React.useCallback(() => {
            fetchStatRating(fecha);
        }, [route])
    );

    // Usar useEffect para actualizar el estado de la animación cuando el promedio cambie
    useEffect(() => {
        const prm = 2.26 + ((promedioSemana.toFixed(2)-1) * 0.62);
        setEstado(new Animated.Value(prm));
    }, [promedioSemana]); // Solo se ejecutará cuando promedioSemana cambie

    const animInterpolation = estado.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-90deg', '90deg'], // Cambia los ángulos según el rango que desees
    });

    const abrirMenu = () => {
        navigation.openDrawer();
    };

    const processDataForChart = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            console.log('Datos vacíos o inválidos:', data);
            return {};  // Retorna un objeto vacío si no hay datos
        }
    
        // Ordena las fechas para que se muestren correctamente
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    
        // Limita a los últimos 7 días
        const limitedData = sortedData.slice(-7);
    
        // Inicializa un objeto para almacenar las calificaciones por fecha
        const aggregatedData = {};
    
        limitedData.forEach(item => {
            const { date, rating } = item;
            if (!aggregatedData[date]) {
                aggregatedData[date] = [];
            }
            aggregatedData[date].push(rating); // Agrega la calificación al array de esa fecha
        });
    
        // Crea el objeto para el gráfico
        const chartData = {
            labels: Object.keys(aggregatedData),
            datasets: [
                {
                    data: Object.keys(aggregatedData).map((date) => {
                        const ratings = aggregatedData[date];  // Obtener todas las calificaciones de una fecha
                        const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
                        return average;
                    }),
                    color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,  // Definir color como función
                    strokeWidth: 2, 
                },
            ],
        };
    
        return chartData;
    };

    // Solo procesamos los datos si ya tenemos algo en dailyRatings
    const chartData = dailyRatings.length > 0 ? processDataForChart(dailyRatings) : null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={abrirMenu}>
                    <Ionicons name="menu" size={40} color="black" paddingTop={5} />
                </TouchableOpacity>
                    
                <View style={styles.separator} />

            </View>

            <Text style={styles.titulo}>Mis estadísticas</Text>

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
                    <Text style={styles.averageText1}>{promedioSemana.toFixed(1)}</Text>
                </View>

                <View style={styles.emojiRow}>
                    {emojisCalif.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.emojiContainer}>
                            <Text style={styles.emoji1}>{item.emoji}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/* Indicador de carga si los datos aún no se han cargado */}
            {loadingData ? (
                <ActivityIndicator size="large" color="#0B72D0" />
            ) : (
                <View style={styles.boxContainer}>
                    <Text style={styles.boxText}>Estadísticas de calificaciones diarias totales</Text>
                    {/* Contenedor con desplazamiento horizontal */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                        {chartData ? (
                            <LineChart
                                data={chartData}
                                width={chartData.labels.length * 150} // Aumenta el tamaño total del gráfico
                                height={300} // Altura del gráfico
                                chartConfig={{
                                    backgroundColor: '#fff',
                                    backgroundGradientFrom: '#fff',
                                    backgroundGradientTo: '#fff',
                                    decimalPlaces: 2, // Decimales
                                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Color de la línea
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de las etiquetas
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                bezier // Usa curva Bezier para líneas suaves
                                style={styles.chartStyle}
                            />
                        ) : (
                            <Text>No hay suficientes datos para mostrar el gráfico.</Text>
                        )}
                    </ScrollView>
                </View>
            )}
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
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
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
        textAlign: 'center',
    },
    titulo: {
        padding: 10,
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0B72D0',
    },
    averageText: {
        fontSize: 18,
        color: '#0B72D0',
        marginVertical: 10,
        fontWeight: 'bold',
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
