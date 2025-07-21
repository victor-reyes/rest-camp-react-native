import equal from "fast-deep-equal";
import { useCallback, useState } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";

const { width, height } = Dimensions.get("window");

export function useMapDimensions() {
  const [mapDimensions, setMapDimensions] = useState({ width, height });
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      if (!equal(mapDimensions, { width, height })) setMapDimensions({ width, height });
    },
    [mapDimensions],
  );

  return { mapDimensions, onLayout };
}
