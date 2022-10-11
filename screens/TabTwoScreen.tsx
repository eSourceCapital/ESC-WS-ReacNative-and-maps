import { StyleSheet, Alert } from "react-native";
import { Marker } from "react-native-maps";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import { getTaskList } from "../utils/db";

export default function TabTwoScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapas</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <MapView
        style={{ height: "70%", width: "100%" }}
        provider="google"
        showsUserLocation={true}
        initialRegion={{
          // latitude de bogota
          latitude: 4.60971,
          // longitud de bogota
          longitude: -74.08175,
          latitudeDelta: 0.0922, // defecto
          // longitud delta = latitud delta + (ancho / alto)
          longitudeDelta: 0.0922 + 0.1,
        }}
      >
        <Marker
          title="Ciudad de Bogota"
          coordinate={{
            latitude: 4.60971,
            longitude: -74.08175,
          }}
        />
        {list_data &&
          list_data.map((item: any, index: number) => {
            return (
              <Marker
                key={item.id}
                title={"Ciudad de Bogota (" + item.id + "):" + item.completed}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng,
                }}
              />
            );
          })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
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
