import { View, Text, FlatList, StyleSheet } from "react-native";
import { ContainerObjetivo } from "./components";

export default function ListaObjetivos() {
  const data = [
    { id: 1, titulo: "Objetivo 1", fecha: "2021-01-01" },
    { id: 2, titulo: "Objetivo 2", fecha: "2021-01-02" },
    { id: 3, titulo: "Objetivo 3", fecha: "2021-01-03" },
    { id: 4, titulo: "Objetivo 4", fecha: "2021-01-04" },
    { id: 5, titulo: "Objetivo 5", fecha: "2021-01-05" },
    { id: 6, titulo: "Objetivo 6", fecha: "2021-01-06" },
    { id: 7, titulo: "Objetivo 7", fecha: "2021-01-07" },
    { id: 8, titulo: "Objetivo 8", fecha: "2021-01-08" },
    { id: 9, titulo: "Objetivo 9", fecha: "2021-01-09" },
    { id: 10, titulo: "Objetivo 10", fecha: "2021-01-10" },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Objetivos</Text>
      <FlatList
        testID="flatlist"
        style={styles.listaObjetivos}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ContainerObjetivo item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: "#0B72D2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ADC0D1",
    padding: 32,
  },
  listaObjetivos: {
    width: "100%",
    marginVertical: 16,
  },
})
