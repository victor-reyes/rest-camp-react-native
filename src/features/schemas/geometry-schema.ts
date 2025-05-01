import { z } from "zod";

function parseWGS84Point(pointStr: string) {
  const match = pointStr.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/)!;
  return {
    longitude: parseFloat(match[1]),
    latitude: parseFloat(match[2]),
  };
}

const GeometrySchema = z
  .object({
    SWEREF99TM: z.string(),
    WGS84: z.string(),
  })
  .transform(data => {
    const longLat = parseWGS84Point(data.WGS84);
    return { ...data, ...longLat };
  });
const ParkingAccessSchema = z
  .object({
    SWEREF99TM: z.string(),
    WGS84: z.string(),
  })
  .transform(data => {
    const longLat = parseWGS84Point(data.WGS84);
    return { ...data, ...longLat };
  });

type ParkingAccess = z.infer<typeof ParkingAccessSchema>;
type Geometry = z.infer<typeof GeometrySchema>;

export { GeometrySchema, ParkingAccessSchema, Geometry, ParkingAccess };
