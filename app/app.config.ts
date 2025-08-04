import "dotenv/config";
import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    eas: {
      projectId: "1c04ee02-bc1e-49fc-b2ac-28406cdd765d",
    },
  },
  name: "Rastplatser",
  slug: "Rastplatser",
  version: "1.1.3",
  orientation: "portrait",
  icon: "./assets/ios-light.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  scheme: "rastplatser",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "nordic.rastplatser",
    usesAppleSignIn: true,
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY,
    },
    infoPlist: {
      NSLocationWhenInUseUsageDescription: `
      Appen behöver tillgång till din plats för att kunna visa rastplatser nära dig och navigera kartan till din position.
      `.trim(),
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
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
    [
      "react-native-maps",
      {
        iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY,
        androidGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    ],
    "expo-asset",
    "expo-apple-authentication",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#155196",
        image: "./assets/icon.png",
      },
    ],
    [
      "react-native-edge-to-edge",
      {
        android: { parentTheme: "Default", enforceNavigationBarContrast: false },
      },
    ],
    "expo-sqlite",
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme: "com.googleusercontent.apps.532615947113-g9n0sdnut1e5po072f6v4al0d6mhdg53",
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "Appen behöver tillgång till dina foton för att ladda upp bilder på rastplatser.",
        cameraPermission: "Appen behöver tillgång till kameran för att ta bilder på rastplatser.",
      },
    ],
    "react-native-compressor",
  ],
});
