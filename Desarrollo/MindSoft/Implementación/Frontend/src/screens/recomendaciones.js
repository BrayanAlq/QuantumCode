import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Componente para cada tarjeta
const MessageCard = ({ type, text }) => {
  return (
    <View
      style={[
        styles.card,
        type === "mensaje" ? styles.mensaje : styles.recomendacion,
      ]}
    >
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

const Recomendaciones = () => {
  // Datos de ejemplo
  const data = [
    {
      id: "1",
      type: "mensaje",
      text: "Si te cansas, aprende a descansar, no a renunciar.Si te cansas, aprende a descansar, no a renunciar.Si te cansas, aprende a descansar, no a renunciar.",
    },
    {
      id: "2",
      type: "recomendacion",
      text: "Una mente entusiasta encuentra oportunidades en todas partes.",
    },
    {
      id: "3",
      type: "mensaje",
      text: "Al final gana quien todas las mañanas se levanta.",
    },
    {
      id: "4",
      type: "recomendacion",
      text: "Tu velocidadvelocidadvelocidadvelocidadvelocidadvelocidadvelocidad no importa, adelante es adelante.",
    },
    {
      id: "5",
      type: "mensaje",
      text: "No pongas tu arma en silencio solo porque tu enemigo sonríe.",
    },
    {
      id: "6",
      type: "recomendacion",
      text: "La distancia no se mide en kilómetros, se mide en intentos.stancia no se mide en kilómetros, se mide en intentos.",
    },
    // Más tarjetas...
  ];

  // Dividir los elementos en dos columnas
  const column1 = data.filter((_, index) => index % 2 === 0);
  const column2 = data.filter((_, index) => index % 2 !== 0);

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      <Text style={styles.title}>Recomendaciones</Text>

      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          {column1.map((item) => (
            <MessageCard key={item.id} type={item.type} text={item.text} />
          ))}
        </View>
        <View style={styles.column}>
          {column2.map((item) => (
            <MessageCard key={item.id} type={item.type} text={item.text} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    padding: 10,
    backgroundColor: "#ADC0D1",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  mensaje: {
    backgroundColor: "#D5F5E3",
  },
  recomendacion: {
    backgroundColor: "#F9E79F",
  },
  cardText: {
    fontSize: 16,
  },
});

export default Recomendaciones;
