import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { PlusIcon } from '../icons/PlusColorC';
import { useNavigation } from '@react-navigation/native';

export default function Notas() {
    const [notasPorMes, setNotasPorMes] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const mockNotas = [
            { journal_id: 1, description: "Pasé tiempo con amigos y disfrutamos de una cena en casa.", date: "2024-01-02", user_id: 101 },
            { journal_id: 2, description: "Me tomé el día para descansar y recargar energías.", date: "2024-11-04", user_id: 101 },
            { journal_id: 3, description: "Asistí a una conferencia sobre desarrollo personal, fue muy interesante.", date: "2024-11-09", user_id: 101 },
            { journal_id: 4, description: "Hoy fue un día productivo en el trabajo. Me siento motivado.", date: "2024-11-02", user_id: 101 },
            { journal_id: 5, description: "Hice una caminata en el parque y disfruté de la naturaleza.", date: "2024-09-08", user_id: 101 },
            { journal_id: 6, description: "Reflexioné sobre mis logros de la semana y estoy agradecido por todo lo aprendido.", date: "2024-09-09", user_id: 101 },
            { journal_id: 7, description: "Vi una película inspiradora que me motivó a seguir mis sueños.", date: "2024-10-06", user_id: 101 },
            { journal_id: 8, description: "Tuve una reunión productiva con mi equipo de trabajo, logramos avanzar en el proyecto.", date: "2024-10-10", user_id: 101 }
        ];

        // Ordenar las notas por fecha (de más nueva a más antigua)
        mockNotas.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Agrupar notas por mes
        const groupedNotas = mockNotas.reduce((acc, nota) => {
            const date = new Date(nota.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const key = month; // Crear clave solo con el Mes

            if (!acc[key]) {
                acc[key] = []; // Si no existe, inicializar como un array vacío
            }
            acc[key].push(nota); // Agregar nota al mes correspondiente

            return acc;
        }, {});

        setNotasPorMes(groupedNotas);
    }, []);

    // Función para renderizar cada nota
    const renderItem = ({ item }) => (
        <View style={styles.nota} key={item.journal_id}>
            <Text style={styles.textoNota}>{item.description}</Text>
            <Text style={styles.fechaNota}>{item.date}</Text>
        </View>
    );

    // Función para renderizar la lista agrupada
    const renderNotasPorMes = () => {
        return Object.entries(notasPorMes).map(([mes, notas]) => (
            <View key={mes}>
                <Text style={styles.mesTitulo}>{mes}</Text>
                {notas.map(nota => renderItem({ item: nota }))} 
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
                data={Object.keys(notasPorMes)} // Usar las claves de notasPorMes para el FlatList
                keyExtractor={item => item} // La clave será el nombre del mes
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.mesTitulo}>{item}</Text>
                        {notasPorMes[item].map(nota => renderItem({ item: nota }))} 
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
