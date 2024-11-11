import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ContainerMoodRating } from "../components/moodRating";
import { useStoredMoodRaing } from "../hooks/useStoredMoodRaing";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function MoodRatingScreen() {
  const { moodRating: data, loading, error } = useStoredMoodRaing();
  const navigation = useNavigation();

  const moodIcons = {
    Deprimido: "😔",
    Inseguro: "😟",
    Ansioso: "😬",
    Enojado: "😠",
    Exhausto: "😵‍💫",
    Eufórico: "🤩",
    Aliviado: "😌",
    Sorprendido: "😲",
    Feliz: "😁",
  };

  const addIcons = (moodData, icons) => {
    if (!moodData || moodData.message) return [];
    return moodData.map((item) => ({
      mood: icons[item.mood] || "",
      total_mood_ratings: item.total_mood_ratings,
    }));
  };

  const moodsAll = data?.moods_all ? addIcons(data.moods_all, moodIcons) : [];
  const moodsWeek = data?.moods_week ? addIcons(data.moods_week, moodIcons) : [];

  const abrirMenu = () => {
    navigation.openDrawer();
  };
  const navigateToEstadisticas = () => {
    navigation.navigate("Estadisticas");
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.header}>
        <TouchableOpacity onPress={abrirMenu}>
          <Ionicons name="menu" size={40} color="black" paddingTop={5} />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
      <ScrollView>
        <View className="h-full flex py-8 px-6 bg-[#ADC0D1] pt-[-10]">
          <Text className="text-xl text-center font-bold text-[#0B72D0] pt-4">
            Estadísticas de Estados de ánimo
          </Text>
          <TouchableOpacity onPress={navigateToEstadisticas} style={styles.button}>
            <Text style={styles.buttonText}>Ver Estadísticas de calificación diaria</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text className="text-red-500 text-center">{error}</Text>}
          {!loading && !error && (
            <>
              {data?.moods_week?.message ? (
                <Text className="text-center text-red-500">{data.moods_week.message}</Text>
              ) : (
                <ContainerMoodRating title="Semanal" data={moodsWeek} className="mt-10" />
              )}
              {data?.moods_all?.message ? (
                <Text className="text-center text-red-500">{data.moods_all.message} </Text>
              ) : (
                <ContainerMoodRating className="mt-10" title="Total" data={moodsAll} />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: "#ADC0D1",
    paddingTop: 35,
    flex: 1,
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
  button: {
    marginTop: 20,
    backgroundColor: '#0B72D0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

});
