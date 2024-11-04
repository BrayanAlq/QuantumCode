import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGoals } from "../hooks/useGoal"


export default function Recomendacion(){

   return(<View style={styles.container}>
        <View style={styles.header}>
               
                    <Ionicons name="menu" size={40} color="black" paddingTop= {5} />
               
                <View style={styles.separator} />
            </View>

            <View style={styles.title}>
                <Text style={styles.titulo}>Recomendación{"\n"}del día</Text>
            </View>

            <View style={styles.boxContainer}>
                {/* Aquí puedes agregar cualquier contenido que desees dentro del contenedor */}
                <Text style={styles.boxText}>Un consejo importante para tu bienestar es practicar la autocompasión. En momentos de estrés o cuando te sientas abrumado, recuerda tratarte a ti mismo con la misma amabilidad y comprensión que ofrecerías a un amigo. Acepta que está bien no estar bien siempre y que el autocuidado es fundamental. Dedica tiempo a hacer actividades que disfrutes, reflexiona sobre tus logros y permite que tus emociones fluyan sin juzgarte. Este enfoque puede ayudarte a mejorar tu salud mental y a gestionar mejor los desafíos diarios.</Text>
            </View>
            
    </View>) 
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
        alignItems: 'center',
        paddingTop: 35,
    },

    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#0B72D2',
        textAlign: 'center',
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
    
});