import { memo } from "react";
import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";

interface Props {
  latitude: number;
  longitude: number;
  count: number;
  onClusterPress: (coords: { latitude: number; longitude: number }) => void;
}

function ClusterMarkerComponent({ latitude, longitude, count, onClusterPress }: Props) {
  const handlePress = () => onClusterPress({ latitude, longitude });
  return (
    <FastMarker latitude={latitude} longitude={longitude} onPress={handlePress}>
      <RestAreaIcon numberOfRestAreas={count} width={40} height={40} />
    </FastMarker>
  );
}

export const ClusterMarker = memo(ClusterMarkerComponent);
