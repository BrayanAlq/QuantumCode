import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModificarObjetivo({ navigation }) {
    const [objetivo, setObjetivo] = useState('');
    const [tiempo, setTiempo] = useState('');

    const modificarObjetivo = () => {
        console.log("Objetivo modificado:", objetivo);
        setObjetivo('');
    };

    const regresar = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Barra de navegación superior */}
            <View style={styles.header}>
                <TouchableOpacity onPress={regresar}>
                    <Ionicons name="menu" size={40} color="black" />
                </TouchableOpacity>
                <View style={styles.separator} />
            </View>

            <View style={styles.title}>
                <Image source={require('./../../assets/modificar-objetivo.png')} style={styles.icon1} resizeMode="contain" />
                <Text style={styles.titleText}>Modificar Objetivo</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={modificarObjetivo} style={styles.checkButton}>
                    <Ionicons name="checkmark-done" size={24} color="black" />
                </TouchableOpacity>
                <TextInput 
                    style={styles.input}
                    placeholder="Modifique su objetivo"
                    value={objetivo}
                    onChangeText={setObjetivo}
                />
                <Text style={styles.dateText}>Fecha: {new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.inputTiempoContainer}>
                <TextInput 
                    style={styles.inputTiempo}
                    placeholder="Nuevo plazo: "
                    value={tiempo}
                    onChangeText={setTiempo}
                />
                <TouchableOpacity style={styles.dropdownButton}>
                    <Ionicons name="caret-down-circle" size={24} color="#FFD166" />
                </TouchableOpacity>
                <Text style={styles.textDia}>días</Text>
            </View>

            <TouchableOpacity 
                style={styles.registrarButton} 
                onPress={modificarObjetivo}
            >
                <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.verListaButton} 
                onPress={regresar}
            >
                <Text style={styles.buttonText}>Ver Lista</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0B72D2',
        height: 51,
        padding: 10,
    },
    separator: {
        width: 2,
        height: 51,
        backgroundColor: 'white',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#ADC0D1',
    },
    title: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 40,
        top: -15,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#0B72D2',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        marginBottom: 30,
        marginLeft: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    checkButton: {
        padding: 10,
    },
    dateText: {
        fontSize: 12,
        position: 'absolute',
        color: 'black',
        bottom: 5,
        right: 20,
    },
    verListaButton: {
        backgroundColor: '#0B72D2',
        marginTop: 50,
        padding: 15, // Aumentar el padding
        borderRadius: 10,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    registrarButton: {
        backgroundColor: '#FFD166',
        marginTop: 10,
        padding: 15, // Aumentar el padding
        borderRadius: 10,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center', // Centrar el texto en el botón
    },
    icon1: {
        width: 150,
        height: 150,
    },
    inputTiempoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 270, // Cambiar a '95%' para mayor espacio
        height: 50,
        marginBottom: 10,
        marginLeft: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 10,
    },
    inputTiempo: {
        width: 150, // Aumentar el ancho para mayor espacio
        height: 50, // Asegurarse de que tenga la misma altura que el contenedor
    },
    dropdownButton: {
        backgroundColor: 'black',
        borderRadius: 80,
        width: 25, // Aumentar el tamaño del botón
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textDia: {
        fontSize: 12,
        color: 'black',
        marginLeft: 10,
    },
});
