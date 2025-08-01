import { Service } from "@/features/services";
import { HWC } from "./HWC";
import { Info } from "./Info";
import { Latrine } from "./Latrine";
import { PetrolStation } from "./PetrolStation";
import { Picnic } from "./Picnic";
import { Playground } from "./Playground";
import { Restaurant } from "./Restaurant";
import { Trash } from "./Trash";
import { SvgProps } from "react-native-svg";

type ServiceIconName = Service;
interface Props extends SvgProps {
  name: ServiceIconName;
  size?: number;
}

export function ServiceIcon({ name, size = 24, ...rest }: Props) {
  switch (name) {
    case "toilet":
      return <HWC width={size} height={size} {...rest} />;
    case "touristInformation":
      return <Info width={size} height={size} {...rest} />;
    case "dumpingStation":
      return <Latrine width={size} height={size} {...rest} />;
    case "picnicFacilities":
      return <Picnic width={size} height={size} {...rest} />;
    case "playground":
      return <Playground width={size} height={size} {...rest} />;
    case "petrolStation":
      return <PetrolStation width={size} height={size} {...rest} />;
    case "restaurant":
      return <Restaurant width={size} height={size} {...rest} />;
    case "refuseBin":
      return <Trash width={size} height={size} {...rest} />;
  }
}
