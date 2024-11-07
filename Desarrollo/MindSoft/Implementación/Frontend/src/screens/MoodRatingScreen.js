import { Text, View } from "react-native";
import { ContainerMoodRating } from "../components/moodRating";

export default function MoodRatingScreen() {
  const data = {
    "moods_all": [
      {
        "mood": "Sorprendido",
        "total_mood_ratings": 20
      },
      {
        "mood": "Muy mal",
        "total_mood_ratings": 15
      },
      {
        "mood": "Normal",
        "total_mood_ratings": 10
      },
      {
        "mood": "Bien",
        "total_mood_ratings": 8
      }
    ],
    "moods_week": [
      {
        "mood": "Sorprendido",
        "total_mood_ratings": 4
      },
      {
        "mood": "Muy mal",
        "total_mood_ratings": 3
      },
      {
        "mood": "Normal",
        "total_mood_ratings": 2
      },
      {
        "mood": "Bien",
        "total_mood_ratings": 1
      }
    ]
  }

  const moodIcons = {
    'Muy mal': '😖',
    'Mal': '😢',
    'Normal': '😕',
    'Bien': '🙂',
    'Excelente': '😊',
    'Sorprendido': '😲',
  };

  const addIcons = (data, icones) => {
    return data.map((item) => ({
      mood: icones[item.mood] || '',
      total_mood_ratings: item.total_mood_ratings,
    }))
  }

  const moodAll = addIcons(data.moods_all, moodIcons)
  const moodWeek = addIcons(data.moods_week, moodIcons)

  return (
    <View className="h-full flex py-8 px-6 bg-[#ADC0D1]">
      <Text className="text-xl text-center font-bold pt-4">Estadísticas de Estados de ánimo</Text>
      <ContainerMoodRating title="Semanal" data={moodWeek} />
      <ContainerMoodRating title="Total" data={moodAll} />
    </View>
  )
}
