import { View } from "react-native";
import { Description } from "./Description";
import { FacilityEquipmentList } from "./FacilityEquipmentList";
import { ParkingHeader } from "./ParkingHeader";
import { PhotoGallery } from "./PhotoGallery";
import { StyleSheet } from "react-native";

import { Parking } from "../../types";

export interface Props {
  parking: Parking;
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
      <Description
        description={parking.description || undefined}
        locationDescription={parking.localDescription || undefined}
      />
      <FacilityEquipmentList services={parking.services} />
      <PhotoGallery photos={parking.photos} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
});
