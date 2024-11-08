import { ActivityIndicator, Text, View } from "react-native";
import { ContainerMoodRating } from "../components/moodRating";
import { useStoredMoodRaing } from "../hooks/useStoredMoodRaing";

export default function MoodRatingScreen() {
  const { moodRating: data, loading, error } = useStoredMoodRaing();

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

  return (
    <View className="h-full flex py-8 px-6 bg-[#ADC0D1]">
      <Text className="text-xl text-center font-bold pt-4">
        Estadísticas de Estados de ánimo
      </Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text className="text-red-500 text-center">{error}</Text>}
      {!loading && !error && (
        <>
          {data?.moods_week?.message ? (
            <Text className="text-center text-red-500">{data.moods_week.message}</Text>
          ) : (
            <ContainerMoodRating title="Semanal" data={moodsWeek} />
          )}
          {data?.moods_all?.message ? (
            <Text className="text-center text-red-500">{data.moods_all.message}</Text>
          ) : (
            <ContainerMoodRating title="Total" data={moodsAll} />
          )}
        </>
      )}
    </View>
  );
}
