import { Text, View } from "react-native";
import { MoodRatingTotal, MoodRatingWeek } from "../components/moodRating";

export default function MoodRatingScreen() {
  return (
    <View className="h-full flex py-8 px-6 bg-[#ADC0D1]">
      <Text className="text-xl text-center font-bold py-4">Estadísticas de Estados de ánimo</Text>
      <MoodRatingWeek />
      <MoodRatingTotal />
    </View>
  )
}
