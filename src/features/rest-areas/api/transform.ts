import { Response } from "./schemas";

export async function transformToSql(responce: Response) {
  const data = responce.RESPONSE.RESULT[0].Parking || [];

  const parkings = data.map(item => {
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
      modifiedTime: new Date(item.ModifiedTime),
    };
  });
  const services = data.flatMap(item => {
    const { Equipment, Facility } = item;

    return [...Equipment, ...(Facility || [])].map(service => ({
      name: service.Type,
      parkingId: item.Id,
    }));
  });

  const photos = data.flatMap(item =>
    (item.Photo || []).map(photo => ({
      url: photo.Url,
      description: photo.Title,
      parkingId: item.Id,
    })),
  );

  return { parkings, services, photos };
}
