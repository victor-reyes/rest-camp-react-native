import "dotenv/config";
import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "rastplatser",
  slug: "rastplatser",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  scheme: "rastplatser",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "nordic.rastplatser",
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY,
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "This app requires access to your location to show your position on the map.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "nordic.rastplatser",
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
    permissions: ["ACCESS_FINE_LOCATION"],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-asset",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        image: "./assets/splash-icon.png",
      },
    ],
    "react-native-edge-to-edge",
  ],
});
