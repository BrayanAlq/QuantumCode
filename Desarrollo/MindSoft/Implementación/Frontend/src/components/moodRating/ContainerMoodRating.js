import { View, Text, FlatList } from "react-native";

export function ContainerMoodRating({ title, data }) {
  const totalSteps = Math.max(...data.map((item) => item.total_mood_ratings))
  const progressPercentage = (item) => Math.round((item.total_mood_ratings / totalSteps) * 100)

  const dataPlusProgress = data.map((item) => ({
    ...item,
    progress: progressPercentage(item),
  }))

  return (
    <View className="bg-white px-4 mt-8 py-4 rounded-2xl flex-nowrap">
      <Text className="text-base font-bold">Estadísticas de Estados de ánimo {title}</Text>
      <FlatList
        data={dataPlusProgress}
        className="pt-4"
        keyExtractor={(item) => item.mood}
        renderItem={({ item }) => (
          <View className="flex-row gap-2 items-center pb-4 ">
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
