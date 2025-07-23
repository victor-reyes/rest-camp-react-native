import { useAppDispatch } from "@/app/store";
import { Avatar, Button } from "@/components";
import { signOut } from "@/features/auth";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useProfile } from "@/features/profiles/hooks/useProfile";
import { ModalFormInput } from "./ModalFormInput";
import { ProfileUpdate, useUpdateProfileMutation } from "@/features/profiles";
import { useEffect, useState } from "react";
import equal from "fast-deep-equal";
import { ChoseImageModal } from "./ChoseImageModal";
import { useUploadPhotoMutation } from "@/features/photos";

interface Props {
  userId: string;
}
export function Profile({ userId }: Props) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => dispatch(signOut());

  const { profile, isLoading, isError } = useProfile(userId);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] = useUploadPhotoMutation();

  const [updatedProfile, setUpdatedProfile] = useState(profile);
  useEffect(() => {
    if (profile) {
      setUpdatedProfile(profile);
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    if (!updatedProfile || !updatedProfile.fullName || isUpdating) return;

    if (updatedProfile.avatarUrl && updatedProfile.avatarUrl !== profile?.avatarUrl) {
      uploadPhoto(updatedProfile.avatarUrl);
    }

    try {
      const profileUpdate: ProfileUpdate = {
        id: updatedProfile.id,
        fullName: updatedProfile.fullName,
        location: updatedProfile.location,
        avatarUrl: updatedProfile.avatarUrl,
      };

      await updateProfile(profileUpdate).unwrap();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (isError) return <Text>Något gick fel. Försök igen.</Text>;

  const hasUpdate = updatedProfile && !equal(updatedProfile, profile);
  return (
    <View style={styles.container}>
      {isUpdating && <ActivityIndicator size="small" color="#0000ff" />}
      {hasUpdate && (
        <Button
          fit
          title="Spara ändringar"
          onPress={handleUpdateProfile}
          disabled={isUpdating}
          style={{ marginBottom: 16 }}
        />
      )}
      <View>
        <Avatar avatarUrl={updatedProfile?.avatarUrl} size={96} />
        <ChoseImageModal
          onImageSelected={avatarUrl => setUpdatedProfile(prev => ({ ...prev!, avatarUrl }))}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.name}>{updatedProfile?.fullName}</Text>
        <ModalFormInput
          label="Namn (offentligt för andra användare)"
          value={updatedProfile?.fullName || ""}
          onChange={fullName => setUpdatedProfile(prev => ({ ...prev!, fullName }))}
          placeholder="Ditt namn"
        />
      </View>
      <Button
        title="Logga ut"
        onPress={handleSignOut}
        icon={<Feather name="log-out" size={24} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center",
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
