import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EnviarNota } from "../icons/EnviarNota";
import { getLocalDay } from "../utils/getLocalDay";
import { useJournal } from "../hooks/useJournal";

export default function AgregarNotas({ navigation }) {
  const [currentMonth, setCurrentMonth] = useState("");
  const [inputHeight, setInputHeight] = useState(40); // Altura inicial del TextInput
  const [text, setText] = useState(""); // Estado para almacenar el texto del TextInput
    const { createNewJournal, loading, error, token } = useJournal();

  useEffect(() => {
    const dateString = getLocalDay();
    const fechaObj = new Date(dateString);
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    setCurrentMonth(monthNames[fechaObj.getMonth()]);
  }, []);

  const handleSend = async () => {
    if (!text.trim()) {
        Alert.alert('Error', 'Por favor, escribe algo en tu diario antes de enviarlo.');
        return;
    }

    try {
        const date = new Date();
        console.log("Fecha original:", date);

        // Usamos Intl.DateTimeFormat para convertir a la zona horaria de Lima
        const options = { 
            timeZone: "America/Lima", 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit'
        };

        // Formateamos solo la parte de la fecha
        const limaDate = new Intl.DateTimeFormat('en-US', options).format(date);
        
        console.log("Fecha en Lima (solo fecha):", limaDate);

        // Formato esperado para la fecha: YYYY-MM-DD
        const [month, day, year] = limaDate.split('/'); // Separamos la fecha
        const formattedDate = `${year}-${month}-${day}`; // Reordenamos en el formato YYYY-MM-DD

        console.log("Fecha final en formato YYYY-MM-DD:", formattedDate);

        if (!token) {
            throw new Error('No se ha encontrado el token de autenticación');
        }

        const result = await createNewJournal(text, formattedDate);

        if (result) {
            Alert.alert('Éxito', 'Tu diario ha sido guardado exitosamente.');
            setText('');
        } else {
            throw new Error('Hubo un error al guardar el diario');
        }
    } catch (error) {
        console.error('Error al crear diario:', error);
        Alert.alert('Error', error.message || 'Hubo un problema al crear tu diario');
    }
};

  const abrirMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={abrirMenu}>
          <Ionicons name="menu" size={40} color="black" paddingTop={5} />
        </TouchableOpacity>
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
          value={text} // Asociamos el estado `text` al valor del TextInput
          onChangeText={setText} // Actualizamos el estado `text` con el valor ingresado
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
        />
      </View>
      <TouchableOpacity onPress={handleSend} style={styles.EnviarNota}>
        <EnviarNota height="80" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADC0D1",
    paddingTop: 35,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#0B72D0",
    height: 50,
    paddingLeft: 10,
  },
  separator: {
    width: 4,
    height: 50,
    backgroundColor: "#ADC0D1",
    marginHorizontal: 10,
  },
  title: {
    paddingTop: 10,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "Black",
    textAlign: "left",
    paddingLeft: 20,
  },
  boxContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  boxText: {
    fontSize: 16,
    color: "black",
    textAlign: "left",
  },
  EnviarNota: {
    position: "absolute",
    marginTop: 715,
    marginLeft: 300,
  },
});
