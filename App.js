import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import data from "./clustered_dataset.json";

const { height, width } = Dimensions.get("screen");
const geolib = require("geolib");
export default function App() {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const imageURL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=30.05144657259267, 31.233742561566025&destinations=enc:_kjwFjtsbMt%60EgnKcqLcaOzkGari%40naPxhVg%7CJjjb%40cqLcaOzkGari%40naPxhV:&key=AIzaSyBgrNpevYqgI1EXlhXUi_TilZbktNuoH3o`;
  React.useEffect(() => {}, []);
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("error");
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log;
  if (location !== null) {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 1,
        }}
        style={{
          height: height * 0.8,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Me"
        />

        {data.map((item, index) => {
          return (
            <Marker
              coordinate={{
                latitude: item.lat,
                longitude: item.lng,
              }}
              title={item.place_name}
              image={
                item.place_category === "Islamic"
                  ? require("./assets/Images/islamic.png")
                  : item.place_category === "Museum"
                  ? require("./assets/Images/museum.png")
                  : item.place_category === "Pharaonic"
                  ? require("./assets/Images/pharonic.png")
                  : item.place_category === "Christian"
                  ? require("./assets/Images/christian.png")
                  : null
              }
            />
          );
        })}

        {data.filter(ite)}
      </MapView>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
