import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EnviarNota } from '../icons/EnviarNota';

export default function AgregarNotas() {
    const [currentMonth, setCurrentMonth] = useState('');
    const [inputHeight, setInputHeight] = useState(40); // Altura inicial del TextInput

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
                <Text style={styles.titulo}>{currentMonth}</Text>
            </View>
            <View style={[styles.boxContainer, { height: inputHeight + 20 }]}>
                <TextInput
                    style={[styles.boxText, { height: inputHeight }]}
                    placeholder="Escriba sobre su día"
                    multiline
                    onContentSizeChange={(event) => 
                        setInputHeight(event.nativeEvent.contentSize.height)
                    }
                />
            </View>
            <TouchableOpacity
            >
                <EnviarNota
                height="80"
                style={{ marginTop: 490, marginLeft: 290 }}
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
    },
    title: {    
        paddingTop: 10,
    },
    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'Black',
        textAlign: 'left',
        paddingLeft: 20,
    },
    boxContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
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
});
