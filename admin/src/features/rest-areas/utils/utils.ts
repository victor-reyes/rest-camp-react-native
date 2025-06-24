import type { RestAreaWithInfo } from "@/api/supabase";

export const equalById = (a: RestAreaWithInfo, b: RestAreaWithInfo) =>
  a.trafikverket_id === b.trafikverket_id;

export const equalByCoordinates = (a: RestAreaWithInfo, b: RestAreaWithInfo) =>
  a.latitude === b.latitude && a.longitude === b.longitude;
