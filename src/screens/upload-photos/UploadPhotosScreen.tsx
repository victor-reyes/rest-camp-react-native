import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Image } from "expo-image";
import { RootStackParamList } from "@/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@/components/Button";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/slices/rest-areas";

import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, "UploadPhotos">;

type SelectedPhoto = { uri: string };

const OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

const ERROR = {
  type: "error",
  text1: "Fel vid uppladdning",
  text2: "Kunde inte ladda upp bilden till servern.",
};

export function UploadPhotosScreen({ route }: Props) {
  const { restAreaId } = route.params;
  const navigation = useNavigation();

  const restArea = useAppSelector(state => selectRestAreaById(state, restAreaId));

  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);

  const handlePress = async (type: "camera" | "gallery") => {
    const result =
      type === "camera" ?
        await ImagePicker.launchCameraAsync(OPTIONS)
      : await ImagePicker.launchImageLibraryAsync(OPTIONS);

    if (result.canceled) return;
    const newPhotos: SelectedPhoto[] = result.assets.map(asset => ({ uri: asset.uri }));
    setSelectedPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = (uri: string) =>
    setSelectedPhotos(prev => prev.filter(photo => photo.uri !== uri));

  const [uploading, setUploading] = useState(false);
  const handleCancel = () => navigation.goBack();
  const handleUpload = async () => {
    setUploading(true);
    for (const photo of selectedPhotos) {
      const arrayBuffer = await fetch(photo.uri).then(res => res.arrayBuffer());
      const fileExt = photo.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `id${restAreaId}-${Date.now()}.${fileExt}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("photos")
        .upload(path, arrayBuffer, { contentType: "image/jpeg" });

      if (storageError) {
        Toast.show(ERROR);
        console.error("Error uploading photo:", storageError);
        setUploading(false);
        return;
      }

      const url = supabase.storage.from("photos").getPublicUrl(storageData.path).data.publicUrl;

      const { error: insertError } = await supabase.from("photos").insert({
        rest_area_id: restAreaId,
        url,
        thumbnail_url: url,
      });
      if (insertError) {
        Toast.show(ERROR);
        console.error("Error inserting photo:", insertError);
        return;
      }
    }
    Toast.show({
      type: "success",
      text1: "Uppladdning klar",
      text2: `Bilderna har laddats upp till rastplatsen ${name}.`,
    });
    setUploading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>
          <Text>Ladda upp bilder för rastplats</Text>
          <Text style={{ fontWeight: "bold" }}> {restArea?.name || "Rastplats Namn"}</Text>
        </Text>

        <View style={styles.actionButtons}>
          <Button
            title="Kamera"
            fit
            icon={<FontAwesome5 name="camera" size={24} color="#155196" />}
            onPress={() => handlePress("camera")}
          />
          <Button
            title="Galleri"
            fit
            icon={<FontAwesome5 name="images" size={24} color="#155196" />}
            onPress={() => handlePress("gallery")}
          />
        </View>
      </View>

      <ScrollView style={styles.photosContainer} showsVerticalScrollIndicator={false}>
        {selectedPhotos.length > 0 && (
          <View style={styles.photosSection}>
            <Text style={styles.sectionTitle}>Valda bilder ({selectedPhotos.length})</Text>
            <View style={styles.photosGrid}>
              {selectedPhotos.map(photo => (
                <View key={photo.uri} style={styles.photoContainer}>
                  <Image source={{ uri: photo.uri }} style={styles.photo} contentFit="cover" />
                  <Pressable
                    style={({ pressed, hovered }) => [
                      styles.removeButton,
                      { transform: hovered ? [{ scale: 1.1 }] : [{ scale: 1 }] },
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                    onPress={() => handleRemovePhoto(photo.uri)}>
                    <Feather name="x" size={18} color="#fff" />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}

        {selectedPhotos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Inga bilder valda än</Text>
            <Text style={styles.emptyStateSubtext}>
              Använd knapparna ovan för att lägga till bilder från kamera eller galleri
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomActions}>
        <View style={styles.bottomButton}>
          <Button title="Avbryt" onPress={handleCancel} />
        </View>
        <View style={styles.bottomButton}>
          <Button
            disabled={selectedPhotos.length === 0}
            title={`Ladda upp${selectedPhotos.length > 0 ? ` (${selectedPhotos.length})` : ""}`}
            onPress={handleUpload}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    gap: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  photosContainer: {
    flex: 1,
    padding: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  photosSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  photoContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomActions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  bottomButton: {
    flex: 1,
  },
});
