import { View } from "react-native";
import { Description } from "./Description";
import { FacilityEquipmentList } from "./FacilityEquipmentList";
import { ParkingHeader } from "./RestAreaHeader";
import { PhotoGallery } from "./PhotoGallery";
import { StyleSheet } from "react-native";
import { RestArea } from "@/slices/rest-areas";

export interface Props {
  restArea: RestArea;
}

export function RestAreaCard({ restArea }: Props) {
  return (
    <View style={styles.container}>
      <ParkingHeader
        name={restArea.name}
        modifiedTime={restArea.modifiedTime}
        latitude={restArea.latitude}
        longitude={restArea.longitude}
      />
      <Description
        description={restArea.description || undefined}
        locationDescription={restArea.localDescription || undefined}
      />
      <FacilityEquipmentList services={restArea.services} />
      <PhotoGallery photos={restArea.photos} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
});
