import { Linking, Platform } from "react-native";

export type OpenMapArgs = {
  latitude: number;
  longitude: number;
  label: string;
};

export const openMap = ({ latitude, longitude, label }: OpenMapArgs) => {
  const scheme = Platform.select({
    ios: `maps://?q=${label}&ll=${latitude},${longitude}`,
    android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
  });

  if (scheme) Linking.openURL(scheme).catch(err => console.error("Error opening map: ", err));
};
