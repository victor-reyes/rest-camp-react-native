import { Photo, RestAreaApiResponse, Service } from "../types";

export async function transformToSql(responce: RestAreaApiResponse) {
  const data = responce.RESPONSE.RESULT[0].Parking || [];

  const restAreas = data.map(item => {
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
      modifiedTime: new Date(item.ModifiedTime).getTime(),
    };
  });
  const services: Service[] = data.flatMap(item => {
    const { Equipment, Facility } = item;

    return [...Equipment, ...(Facility || [])].map(service => ({
      name: service.Type,
      restAreaId: item.Id,
    }));
  });

  const photos: Photo[] = data.flatMap(item =>
    (item.Photo || []).map(photo => ({
      url: photo.Url,
      description: photo.Title,
      restAreaId: item.Id,
    })),
  );

  return { restAreas, services, photos };
}
