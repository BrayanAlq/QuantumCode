import { Text, View } from "react-native";
import { CalendarIcon, EditIcon, TrashIcon, CheckIcon } from "../../../icons";

export function ContainerObjetivo({ item }) {
  return (
    <View className="rounded-xl justify-between p-4 bg-white w-full h-36 mb-4">
      <View className="flex-row gap-2">
        <CalendarIcon className="text-black" />
        <Text>{item.titulo}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text>Fecha: {item.fecha}</Text>
        <View className="flex-row gap-2">
          <CheckIcon className="text-black" />
          <EditIcon className="text-black" />
          <TrashIcon className="text-black" />
        </View>
      </View>
    </View>
  )
}
