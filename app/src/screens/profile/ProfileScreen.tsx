import { StyleSheet } from "react-native";
import { useAppSelector } from "@/store";
import Toast from "react-native-toast-message";
import { Profile, SignIn } from "./components";
import { Card } from "@/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { authSlice } from "@/features/auth/auth-slice";

export function ProfileScreen() {
  const session = useAppSelector(authSlice.selectors.selectSession);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Card style={styles.cardContainer}>
          {session ?
            <Profile userId={session.user.id} />
          : <SignIn />}
        </Card>
      </BottomSheetModalProvider>
      <Toast position="bottom" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  cardContainer: {
    minWidth: 320,
    minHeight: 200,
    borderRadius: 24,
    justifyContent: "center",
  },
});
