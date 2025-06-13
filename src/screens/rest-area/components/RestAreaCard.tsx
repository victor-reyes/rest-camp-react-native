import { View } from "react-native";
import { Description } from "./Description";
import { Services } from "./Services";
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
        updatedAt={restArea.updatedAt}
        latitude={restArea.latitude}
        longitude={restArea.longitude}
      />
      <Description
        description={restArea.description || undefined}
        locationDescription={restArea.localDescription || undefined}
        status={restArea.status}
      />
      <Services services={restArea.services.map(service => service.name)} />
      <PhotoGallery restAreaId={restArea.id} photos={restArea.photos} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
});
