import React from "react";
import MapView, { MarkerAnimated, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useGetParkingsQuery } from "@/features/rest-areas/rest-areas-api";

export default function Map() {
  const { data: parkings } = useGetParkingsQuery();
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
        {parkings?.map(parking => {
          return (
            <MarkerAnimated
              key={parking.Id}
              coordinate={parking.Geometry}
              title={parking.Name}
              description={parking.Description}
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
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
