import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRecomendaciones } from "../hooks/userRecomendaciones";
import { Ionicons } from '@expo/vector-icons';

// Componente para cada tarjeta
const MessageCard = ({ type, text }) => {
  return (
    <View
      style={[
        styles.card,
        type === "animo" ? styles.animo : styles.recomendations,
      ]}
    >
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
};

const Recomendaciones = ({ navigation }) => {
  const { recomendaciones, fetchRecomendaciones, isLoading, error } =
    useRecomendaciones();

  // Llama al hook al montar la pantalla
  useEffect(() => {
    fetchRecomendaciones();
  }, []);
  console.log(recomendaciones, error, isLoading);
  const abrirMenu = () => {
    navigation.openDrawer(); 
};

  return (
    <View style={styles.containerMain}>
    <View style={styles.header}>
      <TouchableOpacity onPress={abrirMenu}>
        <Ionicons name="menu" size={40} color="black" paddingTop={5} />
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Recomendaciones</Text>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          {recomendaciones
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => (
              <MessageCard key={index} type={item.title} text={item.content} />
            ))}
        </View>
        <View style={styles.column}>
          {recomendaciones
            .filter((_, index) => index % 2 !== 0)
            .map((item, index) => (
              <MessageCard key={index} type={item.title} text={item.content} />
            ))}
        </View>
      </View>
    </ScrollView>
  </View>
);
};

const styles = StyleSheet.create({

  containerMain: {
    backgroundColor: "#ADC0D1",
    paddingTop:35,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0B72D0',
    height: 50,
    alignItems: 'center',
    paddingLeft: 10,
  },
  separator: {
    width: 4,
    height: 50,
    backgroundColor: '#ADC0D1',
    marginHorizontal: 10,
  },
  scrollContent: {
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: '#0B72D2',
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
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
  animo: {
    backgroundColor: "#D5F5E3",
  },
  recomendations: {
    backgroundColor: "#F9E79F",
  },
  cardText: {
    fontSize: 16,
  },
});

export default Recomendaciones;
