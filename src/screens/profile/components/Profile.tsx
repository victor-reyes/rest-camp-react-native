import { useAppDispatch } from "@/app/store";
import { Avatar, Button } from "@/components";
import { signOut } from "@/features/auth";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useProfile } from "@/features/profiles/hooks/useProfile";
import { ModalFormInput } from "./ModalFormInput";
import {
  ProfileUpdate,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "@/features/profiles";
import { ChoseImageModal } from "./ChoseImageModal";
import Toast from "react-native-toast-message";

interface Props {
  userId: string;
}
export function Profile({ userId }: Props) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => dispatch(signOut());

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
  if (isLoading) return <ActivityIndicator size="large" color="#155196" />;
  if (isError) return <Text>Något gick fel. Försök igen.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar avatarUrl={profile?.avatarUrl} size={96} />
        <ChoseImageModal
          onImageSelected={avatarUrl => handleUpdateProfile({ avatarUrl })}
          disabled={isUploadingAvatar || isUpdating}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.name}>{profile?.fullName}</Text>
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
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
