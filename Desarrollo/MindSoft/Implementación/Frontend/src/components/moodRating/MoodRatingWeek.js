import { View, Text, FlatList } from "react-native";

export function MoodRatingWeek() {

  const data = [
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

  const moodIcons = {
    'Muy mal': '😖',
    'Mal': '😢',
    'Normal': '😕',
    'Bien': '🙂',
    'Excelente': '😊',
    'Sorprendido': '😲',
  };


  const dataIcons = data.map((item) => ({
    mood: moodIcons[item.mood] || '',
    total_mood_ratings: item.total_mood_ratings,
  }))

  const totalSteps = Math.max(...dataIcons.map((item) => item.total_mood_ratings))
  const progressPercentage = (item) => Math.round((item.total_mood_ratings / totalSteps) * 100)

  const dataPlusProgress = dataIcons.map((item) => ({
    ...item,
    progress: progressPercentage(item),
  }))

  return (
    <View className="bg-white px-2 py-4 rounded-2xl flex-nowrap">
      <Text className="text-xl font-bold">Estadísticas de Estados de ánimo Semanal</Text>
      <FlatList
        data={dataPlusProgress}
        className="pt-4"
        keyExtractor={(item) => item.mood}
        renderItem={({ item }) => (
          <View className="flex-row  gap-2 items-center pb-4 ">
            <Text className="text-4xl font-bold">{item.mood}</Text>
            <View
              className="bg-gray-300 flex-1  h-7 rounded-full "
            >
              <Text
                className="bg-sky-300 h-full pl-2 rounded-full text-lg "
                style={{ width: `${item.progress}%` }}
              >
                {item.total_mood_ratings}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}
