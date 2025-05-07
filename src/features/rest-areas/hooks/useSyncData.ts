import { useEffect } from "react";
import { useGetParkingsQuery } from "../api";
import { db, parkings, photos, services } from "@/db";

export function useSyncData() {
  const { data } = useGetParkingsQuery();
  useEffect(() => {
    console.log("useSyncData", "fuck");
    if (data) {
      db.transaction(
        async tx => {
          await tx.transaction(async ts => {});
          await tx.delete(parkings);
          await tx.delete(services);
          await tx.delete(photos);

          const parkingsData = data.map(item => {
            const carSpaces = item.VehicleCharacteristics.find(
              vc => vc.VehicleType === "car",
            )?.NumberOfSpaces;

            const truckSpaces = item.VehicleCharacteristics.find(
              vc => vc.VehicleType === "lorry",
            )?.NumberOfSpaces;

            const localDescription = [item.LocationDescription, item.DistanceToNearestCity]
              .filter(Boolean)
              .join(" ");

            return {
              id: item.Id,
              name: item.Name,
              latitude: item.Geometry.latitude,
              longitude: item.Geometry.longitude,
              description: item.Description,
              localDescription: localDescription,
              status: item.OpenStatus,
              numberOfCarSpaces: carSpaces,
              numberOfTruckSpaces: truckSpaces,
            };
          });
          const servicesData = data.flatMap(item => {
            const { Equipment, Facility } = item;

            return [...Equipment, ...(Facility || [])].map(service => ({
              name: service.Type,
              parkingId: Number(item.Id),
            }));
          });

          const photosData = data.flatMap(item =>
            (item.Photo || []).map(photo => ({
              url: photo.Url,
              description: photo.Title,
              parkingId: Number(item.Id),
            })),
          );

          await tx.insert(parkings).values(parkingsData);
          await tx.insert(services).values(servicesData);
          await tx.insert(photos).values(photosData);
        },
        { behavior: "exclusive" },
      );
    }
  }, [data]);
}
