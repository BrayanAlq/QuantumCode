import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePromedio } from "../hooks/usePromedio";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { getLocalDay } from "../utils/getLocalDay";

export default function Estadisticas() {
  const logo = require("../../assets/clipart2905515.png");
  const [dailyRatings, setDailyRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [estado, setEstado] = useState(new Animated.Value(0)); // Inicializa estado de animación
  const { rating_week, rating_all, error, loading, fetchStatRating } =
    usePromedio();
  const navigation = useNavigation();
  const route = useRoute();
  const fecha = getLocalDay();

  const promedioSemana = rating_week?.average_rating || 0;

  const emojisCalif = [{ emoji: "😖" }, { emoji: "😊" }];

  useEffect(() => {
    fetchStatRating(fecha);
  }, [fecha]);

  useFocusEffect(
    React.useCallback(() => {
      fetchStatRating(fecha);
    }, [route])
  );

  // Usar useEffect para actualizar el estado de la animación cuando el promedio cambie
  useEffect(() => {
    const prm = 2.26 + (promedioSemana.toFixed(2) - 1) * 0.62;
    setEstado(new Animated.Value(prm));
  }, [promedioSemana]); // Solo se ejecutará cuando promedioSemana cambie

  const animInterpolation = estado.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-90deg", "90deg"], // Cambia los ángulos según el rango que desees
  });

  const abrirMenu = () => {
    navigation.openDrawer();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={abrirMenu}>
          <Ionicons name="menu" size={40} color="black" paddingTop={5} />
        </TouchableOpacity>

        <View style={styles.separator} />
      </View>

      <Text style={styles.titulo}>Mis estadísticas</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Estadisticas2")}
      >
        <Text style={styles.buttonText}>Ver Estadísticas de Emociones</Text>
      </TouchableOpacity>

      <View style={styles.boxContainer}>
        <Text style={styles.boxText}>Estadística de calificación del día</Text>
        <Text style={styles.averageText}>Promedio semanal</Text>

        <Image source={logo} style={styles.userImage} />

        {/* Indicador con rotación sobre su propio eje */}
        <Animated.View
          style={[
            styles.rotatingIcon,
            { transform: [{ rotate: animInterpolation }] },
          ]}
        >
          <Ionicons name="navigate-outline" size={60} color="#0B72D0" />
        </Animated.View>

        <View style={styles.boxContainer1}>
          <Text style={styles.averageText1}>{promedioSemana.toFixed(1)}</Text>
        </View>

        <View style={styles.emojiRow}>
          {emojisCalif.map((item, index) => (
            <TouchableOpacity key={index} style={styles.emojiContainer}>
              <Text style={styles.emoji1}>{item.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ADC0D1",
    paddingTop: 35,
    paddingHorizontal: 0,
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

  rotatingIcon: {
    position: "absolute",
    top: 210,
    left: 150,
  },
  boxContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
  titulo: {
    padding: 10,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#0B72D0",
  },
  averageText: {
    fontSize: 18,
    color: "#0B72D0",
    marginVertical: 10,
    fontWeight: "bold",
  },
  averageText1: {
    fontSize: 18,
    color: "white",
    marginVertical: 9,
  },
  boxContainer1: {
    backgroundColor: "#0B72D0",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    marginTop: 10,
    width: "25%",
    alignSelf: "center",
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 35,
  },
  emojiContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: -90,
  },
  emoji1: {
    fontSize: 40,
  },
  userImage: {
    width: 260,
    height: 190,
    marginBottom: 0,
    marginLeft: 5,
    marginTop: 15,
  },
  button: {
    backgroundColor: "#0B72D0",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
