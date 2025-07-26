import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { Navigation } from "./navigation";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "@/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Alert } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { client, migrations } from "@/db/";
import Toast from "react-native-toast-message";
import { supabase } from "./lib/supabase";
import { sessionSet } from "./features/auth";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const db = drizzle(client);

export function App() {
  const { success, error } = useMigrations(db, migrations);
  const [navigationIsReady, setNavigationIsReady] = useState(false);

  useEffect(() => {
    if (success && navigationIsReady) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error("Migration error:", error);
      Alert.alert(
        "Migration error",
        "There was an error during the migration process. Please try again later.",
        [{ text: "OK" }],
      );
    }
  }, [success, error, navigationIsReady]);
  return (
    <Provider store={store}>
      <SystemBars style={"dark"} />
      <Auth />
      <GestureHandlerRootView>
        <Navigation
          linking={{
            enabled: "auto",
            prefixes: [
              // Change the scheme to match your app's scheme defined in app.json
              "helloworld://",
            ],
          }}
          onReady={() => setNavigationIsReady(true)}
        />
      </GestureHandlerRootView>
      <Toast position="bottom" />
    </Provider>
  );
}

function Auth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => dispatch(sessionSet(session)));

    const subscription = supabase.auth.onAuthStateChange((_, session) => {
      dispatch(sessionSet(session));
    }).data.subscription;

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
}
