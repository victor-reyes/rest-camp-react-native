import { useState } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";

const { width, height } = Dimensions.get("window");

export function useMapDimensions() {
  const [mapDimensions, setMapDimensions] = useState({ width, height });
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== mapDimensions.width || height !== mapDimensions.height)
      setMapDimensions({ width, height });
  };

  return { mapDimensions, onLayout };
}
