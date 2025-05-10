import { HWC } from "./HWC";
import { Info } from "./Info";
import { Latrine } from "./Latrine";
import { PetrolStation } from "./PetrolStation";
import { Picnic } from "./Picnic";
import { Playground } from "./Playground";
import { Restaurant } from "./Restaurant";
import { Trash } from "./Trash";
import { WC } from "./WC";

export type ServiceIconName =
  | "HWC"
  | "Info"
  | "Latrine"
  | "Picnic"
  | "Playground"
  | "PetrolStation"
  | "Restaurant"
  | "Trash"
  | "WC";
interface Props {
  name: ServiceIconName;
  size?: number;
  color?: string;
}

export function ServiceIcon({ name, size = 24 }: Props) {
  switch (name) {
    case "HWC":
      return <HWC width={size} height={size} />;
    case "Info":
      return <Info width={size} height={size} />;
    case "Latrine":
      return <Latrine width={size} height={size} />;
    case "Picnic":
      return <Picnic width={size} height={size} />;
    case "Playground":
      return <Playground width={size} height={size} />;
    case "PetrolStation":
      return <PetrolStation width={size} height={size} />;
    case "Restaurant":
      return <Restaurant width={size} height={size} />;
    case "Trash":
      return <Trash width={size} height={size} />;
    case "WC":
      return <WC width={size} height={size} />;
  }
}
