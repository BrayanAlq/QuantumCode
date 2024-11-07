import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGoals } from "../hooks/useGoal"

export default function ModificarObjetivo({ navigation,route }) {
    const { goalId, title, date, time } = route.params;
    const [objetivo, setObjetivo] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { updateGoal } = useGoals();

    useEffect(() => {
        setObjetivo(title);
        setTiempo(time.toString());
    }, [title, time]);

    const handleSelectTiempo = (value) => {
        setTiempo(value);
        setModalVisible(false);
    };

    const cantidadOptions = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

    const modificarObjetivo = async () => {
        try {
            const updatedData = {
                goal_id: goalId,
                goal_name: objetivo,
                duration_days: parseInt(tiempo, 10),
            };
            await updateGoal(updatedData);
            
            Alert.alert('Éxito', 'Objetivo modificado correctamente');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'No se pudo modificar el objetivo: ' + error.message);
        }
    };
    

    const regresar = () => {
        navigation.navigate('SeguimientoObjetivo');
    };

    const abrirMenu = () => {
        navigation.openDrawer(); 
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={abrirMenu}> 
                    <Ionicons name="menu" size={40} color="black" />
                </TouchableOpacity>
                <View style={styles.separator} />
            </View>

            <View style={styles.title}>
                <Image source={require('./../../assets/modificar-objetivo.png')} style={styles.icon1} resizeMode="contain" />
                <Text style={styles.titleText}>Modificar Objetivo</Text>
            </View>
            
            <View style={styles.inputContainer}>
                <Ionicons
                  style={styles.check}
                  name="checkmark-done"
                  size={24}
                  color="black"
                />
                <TextInput 
                  style={styles.input}
                  placeholder="Modifique su objetivo"
                  value={objetivo}
                  onChangeText={setObjetivo}
                />
                <Text style={styles.dateText}>Fecha: {new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.inputTiempoContainer}>
                <Text
                    style={styles.text}
                >
                Nuevo plazo:
                </Text>
                <TextInput 
                    style={styles.inputTiempo}
                    placeholder="Ej. 5"
                    value={tiempo}
                    onChangeText={setTiempo}
                    keyboardType="numeric"
                />
                <TouchableOpacity 
                    style={styles.dropdownButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="caret-down-circle" size={24} color="#FFD166" />
                </TouchableOpacity>
                <Text style={styles.text}>días</Text>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                      data={cantidadOptions}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity 
                          style={styles.optionButton} 
                          onPress={() => handleSelectTiempo(item)}
                        >
                      <Text style={styles.text}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    <TouchableOpacity 
                      style={styles.closeButton} 
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.text}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADC0D1',
    },

    header: {
        flexDirection: 'row',
        backgroundColor: '#0B72D2',
        height: 50,
        padding: 10,
    },

    separator: {
        width: 4,
        height: 50,
        backgroundColor: '#ADC0D1',
        marginHorizontal: 10,
    },

    title: {
        alignItems: 'center',
    },
    
    titleText: {
        fontSize: 40,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#0B72D2',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: 'auto',
        marginBottom: 20,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    input: {
        height: 50,
        width: 'auto',
        marginBottom: 20,
    },

    check: {
        padding: 10,
    },

    dateText: {
        fontSize: 15,
        position: 'absolute',
        color: 'black',
        bottom: 5,
        right: 10,
    },
    verListaButton: {
        backgroundColor: '#0B72D2',
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    registrarButton: {
        backgroundColor: '#FFD166',
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    icon1: {
        width: 150,
        height: 150,
    },
    inputTiempoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: 'auto',
        height: 50,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },

    inputTiempo: {
        marginLeft: 10,
    },

    dropdownButton: {
        backgroundColor: 'black',
        borderRadius: 80,
        width: 25, // Aumentar el tamaño del botón
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    
    text: {
        fontSize: 15,
        color: 'black',
    },

    modalContainer: {
        flex: 1,
        width: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionButton: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 80,
    },

    closeButton: {
        padding: 10,
        backgroundColor: '#0B72D2',
        borderRadius: 10,
    },
});