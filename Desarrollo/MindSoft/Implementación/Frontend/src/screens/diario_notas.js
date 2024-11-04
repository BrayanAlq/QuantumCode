import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { PlusIcon } from '../icons/PlusColorC';
import { useNavigation } from '@react-navigation/native';

export default function Notas() {
    const [currentMonth, setCurrentMonth] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const date = new Date();
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        setCurrentMonth(monthNames[date.getMonth()]);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="menu" size={40} color="black" paddingTop={5} />
                <View style={styles.separator} />
            </View> 
            <View style={styles.title}>
            
                <Text style={styles.titulo}>{currentMonth}
   
                </Text>

            </View>
            <TouchableOpacity
            onPress={() => navigation.navigate('AgregarNotas', { userId: 'ID_DEL_USUARIO' })} // Reemplaza 'ID_DEL_USUARIO' con el ID real 
            >
                <PlusIcon
                height="48"
                style={{ marginTop: -45 }}
                />
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
        paddingTop: 0,
    },
    title: {    
        paddingTop: 20,
    },
    titulo: {
      
        fontSize: 36,
        fontWeight: 'bold',
        color: 'Black',
        textAlign: 'left',
        paddingLeft: 35,
    },
});