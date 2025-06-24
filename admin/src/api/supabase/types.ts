import type { Database } from "./database.types.ts";

export type RestAreaInsert = Database["public"]["Tables"]["rest_areas"]["Insert"];
export type PhotoInsert = Database["public"]["Tables"]["photos"]["Insert"];
export type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];

export type RestAreaWithInfoInsert = RestAreaInsert & {
  services: ServiceInsert[];
  photos: PhotoInsert[];
};

export type RestAreaSelect = Database["public"]["Tables"]["rest_areas"]["Row"];
export type ServiceSelect = Database["public"]["Tables"]["services"]["Row"];
export type PhotoSelect = Database["public"]["Tables"]["photos"]["Row"];

export type RestAreaWithInfo = RestAreaSelect & {
  services: ServiceSelect[];
  photos: PhotoSelect[];
};
