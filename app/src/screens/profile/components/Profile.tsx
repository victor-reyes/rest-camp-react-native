import { useAppDispatch } from "@/store";
import { Avatar, Button, Toast } from "@/components";
import { signOut } from "@/features/auth";
import { Text, View, StyleSheet, ActivityIndicator, BackHandler, Alert } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useProfile } from "@/features/profiles";
import { ModalFormInput } from "./ModalFormInput";
import {
  ProfileUpdate,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "@/features/profiles";
import { ChoseImageModal } from "./ChoseImageModal";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

interface Props {
  userId: string;
}
export function Profile({ userId }: Props) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => dispatch(signOut());
  const navigation = useNavigation();

  const { profile, isLoading, isError } = useProfile(userId);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();

  const handleUpdateProfile = async (update: ProfileUpdate) => {
    if (isUpdating || isUploadingAvatar || !profile) return;

    if (update.avatarUrl && isLocalUri(update.avatarUrl)) {
      const { data: avatarUrl, error } = await uploadAvatar({
        uri: update.avatarUrl,
        userId,
      });

      if (error) {
        console.error("Failed to upload avatar:", error);
        showToast("avatar");
        return;
      }

      if (avatarUrl) update.avatarUrl = avatarUrl;
    }

    const { error } = await updateProfile({ id: userId, profile: update });
    if (error) {
      console.error("Failed to update profile:", error);
      showToast("profile");
      return;
    }
    showToast("success");
  };

  useEffect(() => {
    const canGoBack = !!profile?.fullName;
    navigation.setOptions({ gestureEnabled: canGoBack, headerBackVisible: canGoBack });
    return () => navigation.setOptions({ gestureEnabled: true, headerBackVisible: true });
  }, [navigation, profile?.fullName]);

  useEffect(() => {
    const onBackPress = () => {
      if (!profile?.fullName) {
        Alert.alert(
          "Du behöver ange ditt namn",
          "För att fortsätta, vänligen ange ditt namn i profilen.",
          [{ text: "Ok", onPress: () => {} }],
          { cancelable: true, userInterfaceStyle: "light" },
        );

        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => backHandler.remove();
  }, [profile?.fullName]);

  if (isLoading) return <ActivityIndicator size="large" color="#155196" />;
  if (isError) return <Text>Något gick fel. Försök igen.</Text>;

  return (
    <View style={styles.container}>
      <ChoseImageModal onImageSelected={avatarUrl => handleUpdateProfile({ avatarUrl })}>
        <View style={styles.avatarContainer}>
          <Avatar avatarUrl={profile?.avatarUrl} size={120} />
          <Button
            title="Ändra"
            style={styles.triggerButton}
            iconSize={16}
            icon={<FontAwesome5 name="camera" size={16} color="black" />}
          />
        </View>
      </ChoseImageModal>

      <View style={styles.row}>
        <Text style={[styles.name, !profile?.fullName ? { color: "#aaa", fontSize: 12 } : {}]}>
          {profile?.fullName ?? "Ange ditt namn"}
        </Text>
        {profile && (
          <ModalFormInput
            label="Namn (offentligt för andra användare)"
            defaultValue={profile?.fullName}
            onSave={fullName => handleUpdateProfile({ fullName })}
            placeholder="Ditt namn"
          />
        )}
      </View>
      <Button
        title="Logga ut"
        onPress={handleSignOut}
        icon={<Feather name="log-out" size={24} />}
      />
      {isUploadingAvatar && (
        <View style={styles.avatarLoadingOverlay}>
          <ActivityIndicator size={72} color="#155196" />
          <Text style={styles.loadingText}>Sparar profil...</Text>
        </View>
      )}
    </View>
  );
}

const isLocalUri = (uri: string) => uri.startsWith("file://") || uri.startsWith("content://");

const showToast = (type: "success" | "avatar" | "profile") => {
  if (type === "success") {
    Toast.show({
      type: "success",
      text1: "Profil uppdaterad",
      text2: "Dina ändringar har sparats.",
    });
    return;
  }
  Toast.show({
    type: "error",
    text1: "Fel",
    text2: `Kunde inte ${type === "avatar" ? "ladda upp bilden" : "spara profilen"}. Försök igen.`,
  });
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center",
  },
  triggerButton: {
    marginTop: -20,
    zIndex: 1,
    width: "auto",
    borderRadius: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  avatarLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    zIndex: 1,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#155196",
    textAlign: "center",
  },
  row: {
    alignItems: "baseline",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
