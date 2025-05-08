import { View } from "react-native";
import { Description } from "./Description";
import { FacilityEquipmentList } from "./FacilityEquipmentList";
import { ParkingHeader } from "./ParkingHeader";
import { PhotoGallery } from "./PhotoGallery";
import { StyleSheet } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { ParkingItem } from "../../types";

export interface Props {
  parking: ParkingItem;
}

export function ParkingInfoCard({ parking }: Props) {
  return (
    <View style={styles.container}>
      <ParkingHeader
        name={parking.name}
        modifiedTime={parking.modifiedTime}
        latitude={parking.latitude}
        longitude={parking.longitude}
      />
      <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
        <Description
          description={parking.description || undefined}
          locationDescription={parking.localDescription || undefined}
        />
        <FacilityEquipmentList services={parking.services} />
        <PhotoGallery photos={parking.photos} />
        {/* {parking.VehicleCharacteristics.length && (
          <VehicleInfo vehicleInfo={parking.VehicleCharacteristics} />
        )} */}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
});
