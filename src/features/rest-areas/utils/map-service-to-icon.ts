import { ServiceIconName } from "../components";
import { Filter } from "../types";

type ServiceName = Filter;
export function mapServiceToIcon(serviceName: ServiceName): ServiceIconName {
  switch (serviceName) {
    case "toilet":
      return "WC";
    case "picnicFacilities":
      return "Picnic";
    case "playground":
      return "Playground";
    case "dumpingStation":
      return "Latrine";
    case "refuseBin":
      return "Trash";
    case "touristInformation":
      return "Info";
    case "restaurant":
      return "Restaurant";
    case "petrolStation":
      return "PetrolStation";
  }
}
