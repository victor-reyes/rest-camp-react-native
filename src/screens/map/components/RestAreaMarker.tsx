import { memo } from "react";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";
import { Status } from "@/features/rest-areas";

interface Props {
  id: string;
  coords: { latitude: number; longitude: number };
  onRestAreaPress: (id: string) => void;
  status: Status;
}
function RestAreaMarkerComponent({ id, coords, onRestAreaPress, status }: Props) {
  const handlePress = () => onRestAreaPress(id);
  return (
    <FastMarker {...coords} onPress={handlePress}>
      <RestAreaIcon width={32} height={32} color={getColor(status)} />
    </FastMarker>
  );
}

const getColor = (status: Status) => {
  switch (status) {
    case "inOperation":
      return "#155196";
    case "limitedOperation":
      return "#FFC107";
    case "outOfService":
      return "#DC3545";
    default:
      return "#6C757D";
  }
};

export const RestAreaMarker = memo(RestAreaMarkerComponent);
