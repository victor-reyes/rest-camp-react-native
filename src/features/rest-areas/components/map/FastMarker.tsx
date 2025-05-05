import { memo, PropsWithChildren, useEffect, useState } from "react";
import { Marker } from "react-native-maps";

interface Props extends PropsWithChildren {
  latitude: number;
  longitude: number;
  tracksViewChanges?: boolean;
  onPress?: () => void;
}

function FastMarkerComponent({
  latitude,
  longitude,
  tracksViewChanges = false,
  children,
  onPress,
}: Props) {
  const [shouldTrackChanges, setShouldTrackChanges] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldTrackChanges) setShouldTrackChanges(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [tracksViewChanges, shouldTrackChanges]);

  return (
    <Marker
      tracksViewChanges={shouldTrackChanges}
      tracksInfoWindowChanges={false}
      onPress={onPress}
      coordinate={{ latitude, longitude }}>
      {children}
    </Marker>
  );
}

export const FastMarker = memo(FastMarkerComponent);
