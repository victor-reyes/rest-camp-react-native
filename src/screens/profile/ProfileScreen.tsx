import { StyleSheet, View } from "react-native";
import { useAppSelector } from "@/app/store";
import { selectAuth } from "@/features/auth";
import Toast from "react-native-toast-message";
import { Profile, SignIn } from "./components";
import { Card } from "@/components";

export function ProfileScreen() {
  const { session } = useAppSelector(selectAuth);

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        {session ?
          <Profile userId={session.user.id} email={session.user.email} />
        : <SignIn />}
      </Card>
      <Toast position="bottom" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
