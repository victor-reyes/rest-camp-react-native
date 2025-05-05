import { FastMarker } from "./FastMarker";
import { RestAreaIcon } from "./RestAreaIcon";

interface Props {
  coords: { latitude: number; longitude: number };
  count: number;
  onClusterPress: (coords: { latitude: number; longitude: number }) => void;
}

export function ClusterMarker({ coords, count, onClusterPress }: Props) {
  const handlePress = () => onClusterPress(coords);
  return (
    <FastMarker {...coords} onPress={handlePress}>
      <RestAreaIcon numberOfRestAreas={count} width={40} height={40} />
    </FastMarker>
  );
}
