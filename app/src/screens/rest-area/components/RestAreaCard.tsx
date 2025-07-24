import { View } from "react-native";
import { Description } from "./Description";
import { Services } from "./Services";
import { ParkingHeader } from "./RestAreaHeader";
import { PhotoGallery } from "./PhotoGallery";
import { StyleSheet } from "react-native";
import { useGetRestAreaQuery } from "@/features/rest-areas";
import { LatestReviews } from "@/screens/reviews";

export interface Props {
  id: string;
}

export function RestAreaCard({ id }: Props) {
  const { data: restArea } = useGetRestAreaQuery(id);
  if (!restArea) return null;

  return (
    <View style={styles.container}>
      <ParkingHeader
        id={id}
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

      <Services restAreaId={id} />
      <PhotoGallery restAreaId={id} />
      <LatestReviews restAreaId={id} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
});
