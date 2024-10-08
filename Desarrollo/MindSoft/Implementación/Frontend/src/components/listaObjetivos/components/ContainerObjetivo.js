import { StyleSheet, Text, View } from "react-native";
import { CalendarIcon, EditIcon, PlusIcon, TrashIcon } from "../../../icons";

export function ContainerObjetivo({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer} >
        <CalendarIcon />
        <Text>{item.titulo}</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text>Fecha: {item.fecha}</Text>
        <View style={styles.actionsContainer}>
          <View><PlusIcon /></View>
          <View><EditIcon /></View>
          <View><TrashIcon /></View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
    height: 140,
    marginVertical: 8,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
