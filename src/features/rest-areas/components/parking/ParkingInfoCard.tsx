import { View } from "react-native";
import { Description } from "./Description";
import { FacilityEquipmentList } from "./FacilityEquipmentList";
import { ParkingHeader } from "./ParkingHeader";
import { PhotoGallery } from "./PhotoGallery";
import { VehicleInfo } from "./VehicleInfo";
import { StyleSheet } from "react-native";
import { Parking } from "@/features/rest-areas/api/schemas";
import { ScrollView } from "react-native-gesture-handler";

export interface Props {
  parking: Parking;
}

export function ParkingInfoCard({ parking }: Props) {
  return (
    <View style={styles.container}>
      <ParkingHeader
        name={parking.Name}
        modifiedTime={parking.ModifiedTime}
        {...parking.Geometry}
      />
      <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
        <Description
          description={parking.Description}
          locationDescription={parking.LocationDescription}
          distanceToNearestCity={parking.DistanceToNearestCity}
        />
        <FacilityEquipmentList facilities={parking.Facility} equipments={parking.Equipment} />
        {parking.Photo?.length && <PhotoGallery photos={parking.Photo} />}
        {parking.VehicleCharacteristics.length && (
          <VehicleInfo vehicleInfo={parking.VehicleCharacteristics} />
        )}
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
