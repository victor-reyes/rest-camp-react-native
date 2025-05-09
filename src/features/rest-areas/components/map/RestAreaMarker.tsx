import { memo } from "react";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";

interface Props {
  id: string;
  coords: { latitude: number; longitude: number };
  onRestAreaPress: (id: string) => void;
}
function RestAreaMarkerComponent({ id, coords, onRestAreaPress }: Props) {
  const handlePress = () => onRestAreaPress(id);
  return (
    <FastMarker {...coords} onPress={handlePress}>
      <RestAreaIcon width={32} height={32} />
    </FastMarker>
  );
}

export const RestAreaMarker = memo(RestAreaMarkerComponent);
