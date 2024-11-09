import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { PlusIcon } from '../icons/PlusColorC';
import { useNavigation } from '@react-navigation/native';
import { useJournal } from '../hooks/useJournal';

export default function Notas() {
    const [notasPorMes, setNotasPorMes] = useState({});
    const [mockNotas, setMockNotas] = useState([]);
    const navigation = useNavigation();
    const { getJournals, journals, loading, error } = useJournal();
    
    // Mapa de los meses con número
    const month_number = {
        "Enero": "01",
        "Febrero": "02",
        "Marzo": "03",
        "Abril": "04",
        "Mayo": "05",
        "Junio": "06",
        "Julio": "07",
        "Agosto": "08",
        "Septiembre": "09",
        "Octubre": "10",
        "Noviembre": "11",
        "Diciembre": "12"
    };

    // Función para convertir la fecha a formato "YYYY-MM-DD"
    const parseDate = (dateString, month, year) => {
        console.log("Fecha recibida:", dateString);  // Log para verificar qué fecha estamos recibiendo
    
        if (!dateString || typeof dateString !== 'string') {
            console.error("Fecha no válida:", dateString);
            return null;
        }

        // Modificamos la expresión regular para aceptar letras con tildes
        const match = dateString.match(/^(\d{1,2})\s([A-Za-záéíóúÁÉÍÓÚ]+)$/);
        if (match) {
            const day = match[1];   // Día (por ejemplo "09" o "8")
            const weekday = match[2].toLowerCase();   // Día de la semana (por ejemplo "domingo", "lunes", "sábado", etc.)

            console.log("Día:", day, "Día de la semana:", weekday);

            // Convertimos el mes a su número correspondiente
            const monthNumber = month_number[month];
            console.log("Mes detectado:", monthNumber);

            if (monthNumber && day) {
                // Para asegurar que el día siempre tenga 2 dígitos
                const dayFormatted = day.padStart(2, '0');  // Añade un cero a la izquierda si es necesario
                return `${year}-${monthNumber}-${dayFormatted}`;
            } else {
                console.error("Mes o día no válido:", weekday, day);
                return null;
            }
        } else {
            console.error("Formato de fecha no válido:", dateString);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getJournals();
            } catch (err) {
                console.error("Error al obtener los journals:", err);
            }
        };
        fetchData();
    }, []);

        useEffect(() => {
            if (journals && journals.length > 0) {
                console.log("Journals completos:", JSON.stringify(journals, null, 2));
        
                const sortedNotas = journals.flatMap(journal => {
                    console.log("Journal:", journal);
        
                    return journal.months.flatMap(month => {
                        console.log("Month:", month);
                        const monthName = month.month;
        
                        return month.journals.map(nota => {
                            console.log("Nota:", nota);
        
                            const fechaConvertida = parseDate(nota.date, monthName, "2024");
        
                            return {
                                ...nota,
                                journal_id: journal.id,
                                month: monthName,
                                date: fechaConvertida,
                            };
                        });
                    });
                }).sort((a, b) => new Date(b.date) - new Date(a.date));
        
                // Agrupar las notas por mes
                const groupedNotas = sortedNotas.reduce((acc, nota) => {
                    const dateString = nota.date;
                    console.log("Fecha recibida en agrupamiento:", dateString);

                    if (!dateString) {
                        console.error("Fecha inválida:", dateString);
                        return acc;
                    }
        
                    const monthNumber = dateString.split('-')[1];
                    const monthNameInSpanish = Object.keys(month_number).find(key => month_number[key] === monthNumber);

                    if (!acc[monthNameInSpanish]) {
                        acc[monthNameInSpanish] = [];
                    }
                    acc[monthNameInSpanish].push(nota);
                    return acc;
                }, {});
        
                setNotasPorMes(groupedNotas);
            }
        }, [journals]);

    // Función para renderizar cada nota
    const renderItem = ({ item }) => (
        <View style={styles.nota}>
            <Text style={styles.textoNota}>{item.description}</Text>
            <Text style={styles.fechaNota}>{item.date}</Text>
        </View>
    );
    
    // Función para renderizar la lista agrupada
    const renderNotasPorMes = () => {
        return Object.entries(notasPorMes).map(([mes, notas]) => (
          <View key={mes}>
            <Text style={styles.mesTitulo}>{mes}</Text>
            {notas.map(nota => (
              <View key={nota.journal_id}>
                {renderItem({ item: nota })}
              </View>
            ))}
          </View>
        ));
    };

    const abrirMenu = () => {
        navigation.openDrawer(); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} >
            <TouchableOpacity onPress={abrirMenu}>
                <Ionicons name="menu" size={40} color="black" paddingTop={5} />
            </TouchableOpacity>
                
                <View style={styles.separator} />
            </View>

            <View style={styles.title}>
                <Text style={styles.titulo}>2024</Text>
            </View>

            <FlatList
              data={Object.keys(notasPorMes)}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <View key={item}>
                  <Text style={styles.mesTitulo}>{item}</Text>

                  {notasPorMes[item].map((nota) => (
                    <View key={nota.journal_id}>
                      {renderItem({ item: nota })}
                    </View>
                  ))}
                </View>
              )}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate('AgregarNotas', { userId: 'ID_DEL_USUARIO' })}
                style={styles.plusIconContainer}
            >
                <PlusIcon height="65" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADC0D1',
        paddingTop: 35,
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
    title: {    
        paddingTop: 10,
        alignItems: "center",
    },
    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'Black',
        textAlign: 'left',
        paddingLeft: 0,
    },
    mesTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    nota: {
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 8,
    },
    textoNota: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    fechaNota: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    plusIconContainer: {
        position: 'absolute',
        bottom: 29,
        backgroundColor: 'transparent',
        left: 3,
    },
});
