import type { RestAreaWithInfo } from "@/api/supabase";

export const equalByTrafikverketId = (a: RestAreaWithInfo, b: RestAreaWithInfo) =>
  a.trafikverket_id === b.trafikverket_id;

export const equalByCoordinates = (a: RestAreaWithInfo, b: RestAreaWithInfo) =>
  a.latitude === b.latitude && a.longitude === b.longitude;

export const sortByUpdatedAt = (a: RestAreaWithInfo, b: RestAreaWithInfo) => {
  if (a.updated_at === b.updated_at) return 0;
  return a.updated_at > b.updated_at ? -1 : 1;
};
