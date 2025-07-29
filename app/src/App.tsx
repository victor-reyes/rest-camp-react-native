import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "@/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";
import { Alert } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { client, migrations } from "@/db";
import { Toast } from "@/components";
import { Navigation } from "@/navigation";
import { supabase } from "@/lib";
import { sessionSet, useUserId } from "@/features/auth";
import { profilesApi } from "./features/profiles";

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

  const userId = useUserId();
  useEffect(() => {
    const updateProfile = async () => {
      if (userId) {
        const promise = dispatch(profilesApi.endpoints.fetchProfile.initiate(userId));
        await promise;
        promise.unsubscribe();
      }
    };
    updateProfile();
  }, [dispatch, userId]);

  return null;
}
