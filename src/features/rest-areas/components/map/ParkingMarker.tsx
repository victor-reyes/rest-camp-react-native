import { memo } from "react";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";

interface Props {
  id: string;
  coords: { latitude: number; longitude: number };
  onParkingPress: (id: string) => void;
}
function ParkingMarkerComponent({ id, coords, onParkingPress }: Props) {
  const handlePress = () => onParkingPress(id);
  return (
    <FastMarker {...coords} onPress={handlePress}>
      <RestAreaIcon width={32} height={32} />
    </FastMarker>
  );
}

export const ParkingMarker = memo(ParkingMarkerComponent);
