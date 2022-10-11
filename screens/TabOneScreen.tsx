import {
  StyleSheet,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { createTask, getTaskList } from "../utils/db";
import { useState, useEffect } from "react";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [list_data, set_list_data]: any = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let items: any = [];
    try {
      items = await getTaskList();
    } catch (error) {
      Alert.alert("Error", "No ha sido posible obtener la lista ");
    }
    set_list_data(items);
  }

  function getRandomCoords() {
    const min = 0.1;
    const max = 0.5;
    const randomLat = Math.random() * (max - min) + min;
    const randomLng = Math.random() * (max - min) + min;
    // ub de bogota
    const latitude = 4.60971;
    const longitude = -74.08175;
    return {
      lat: latitude + randomLat,
      lng: longitude + randomLat,
    };
  }

  async function createNewTask() {
    try {
      const { lat, lng } = getRandomCoords();
      const random = Math.floor(Math.random() * 1000)
      await createTask(random, false, lat, lng);
      Alert.alert("Exito", "Se ha creado ");

    } catch (error) {
      Alert.alert("Error", "No ha sido posible obtener la lista ");
    }
    fetchData();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableHighlight
        onPress={createNewTask}
        style={styles.btnClickContain}
        // underlayColor="black"
      >
        <View style={styles.btnContainer}>
          <FontAwesome name="plus" size={25} />
          <Text style={styles.btnText}> Crear Tarea</Text>
        </View>
      </TouchableHighlight>
      <Button onPress={createNewTask} title="Crear tarea" />
      {/* <Button title='Limpiar Tareas'/> */}
      {/* <Button title='Actualizar'/> */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <ScrollView>
        {list_data &&
          list_data.map((data: any) => (
            <View key={data.id}>
              <Text>
                Tareas {data.id}:
                {data.compled == "false" ? (
                  <FontAwesome name="mars-stroke" size={20} />
                ) : (
                  <FontAwesome name="check" size={20} />
                )}
              </Text>
            </View>
          ))}
      </ScrollView>

      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  btnClickContain: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flexDirection: "row",
    height: 50,
    width: 200,
    padding: 5,
    marginVertical: 5,
  },

  btnText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
    marginTop: 2,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
