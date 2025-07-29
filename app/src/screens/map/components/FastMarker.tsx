import { memo, PropsWithChildren, useEffect, useState } from "react";
import { Marker } from "react-native-maps";

interface Props extends PropsWithChildren {
  latitude: number;
  longitude: number;
  tracksViewChanges?: boolean;
  onPress?: () => void;
}

const ANCHOR = { x: 0.5, y: 0.5 };

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
      anchor={ANCHOR}
      onPress={onPress}
      coordinate={{ latitude, longitude }}>
      {children}
    </Marker>
  );
}

export const FastMarker = memo(FastMarkerComponent);
