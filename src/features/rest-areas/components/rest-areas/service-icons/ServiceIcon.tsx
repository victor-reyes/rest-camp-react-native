import { Filter } from "@/features/rest-areas/types";
import { HWC } from "./HWC";
import { Info } from "./Info";
import { Latrine } from "./Latrine";
import { PetrolStation } from "./PetrolStation";
import { Picnic } from "./Picnic";
import { Playground } from "./Playground";
import { Restaurant } from "./Restaurant";
import { Trash } from "./Trash";

type ServiceIconName = Filter;
interface Props {
  name: ServiceIconName;
  size?: number;
  color?: string;
}

export function ServiceIcon({ name, size = 24 }: Props) {
  switch (name) {
    case "toilet":
      return <HWC width={size} height={size} />;
    case "touristInformation":
      return <Info width={size} height={size} />;
    case "dumpingStation":
      return <Latrine width={size} height={size} />;
    case "picnicFacilities":
      return <Picnic width={size} height={size} />;
    case "playground":
      return <Playground width={size} height={size} />;
    case "petrolStation":
      return <PetrolStation width={size} height={size} />;
    case "restaurant":
      return <Restaurant width={size} height={size} />;
    case "refuseBin":
      return <Trash width={size} height={size} />;
  }
}
