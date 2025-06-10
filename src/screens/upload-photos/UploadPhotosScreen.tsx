import { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { RootStackParamList } from "@/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@/components/Button";
import { FontAwesome5, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById, useAddPhotoMutation } from "@/slices/rest-areas";

import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParamList, "UploadPhotos">;

type SelectedPhoto = { uri: string; status?: "pending" | "uploaded" | "error" };

const NUM_COLS = 3;
const ASPECT: [number, number] = [4, 3];
const OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: ASPECT,
  quality: 1,
};

const StatusIndicator = ({ status }: { status?: "pending" | "uploaded" | "error" }) => {
  switch (status) {
    case "pending":
      return (
        <View style={styles.statusIndicator}>
          <ActivityIndicator size={16} color="#fff" />
        </View>
      );
    case "uploaded":
      return (
        <View style={[styles.statusIndicator, styles.successIndicator]}>
          <AntDesign name="check" size={16} color="#fff" />
        </View>
      );
    case "error":
      return (
        <View style={[styles.statusIndicator, styles.errorIndicator]}>
          <AntDesign name="exclamation" size={16} color="#fff" />
        </View>
      );
    default:
      return null;
  }
};

export function UploadPhotosScreen({ route }: Props) {
  const { restAreaId } = route.params;
  const navigation = useNavigation();

  const [addPhoto, { isLoading: isUploading }] = useAddPhotoMutation();

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

  const handleSetStatus = (uri: string, status: "pending" | "uploaded" | "error") =>
    setSelectedPhotos(prev =>
      prev.map(photo => (photo.uri === uri ? { ...photo, status } : photo)),
    );

  const handleCancel = () => navigation.goBack();
  const handleUpload = async () => {
    await Promise.all(
      selectedPhotos.map(async ({ uri }) => {
        handleSetStatus(uri, "pending");

        const { error } = await addPhoto({ restAreaId, uri });

        handleSetStatus(uri, error ? "error" : "uploaded");
      }),
    );

    setSelectedPhotos(photos => photos.filter(photo => photo.status !== "uploaded"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.description}>
          <Text>Ladda upp bilder för rastplats</Text>
          <Text style={{ fontWeight: "bold" }}> {restArea?.name || "Rastplats Namn"}</Text>
        </Text>

        <View style={styles.actionButtons}>
          <Button
            title="Kamera"
            fit
            disabled={isUploading}
            icon={<FontAwesome5 name="camera" size={24} color="#155196" />}
            onPress={() => handlePress("camera")}
          />
          <Button
            title="Galleri"
            fit
            disabled={isUploading}
            icon={<FontAwesome5 name="images" size={24} color="#155196" />}
            onPress={() => handlePress("gallery")}
          />
        </View>
      </View>

      <FlatList
        data={selectedPhotos}
        keyExtractor={item => item.uri}
        numColumns={NUM_COLS}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: item.uri }}
              style={[styles.photo, { opacity: item.status === "pending" ? 0.5 : 1 }]}
              contentFit="cover"
            />
            <StatusIndicator status={item.status} />
            {!isUploading && (
              <Pressable
                style={({ pressed }) => [styles.removeButton, { opacity: pressed ? 0.7 : 1 }]}
                onPress={() => handleRemovePhoto(item.uri)}>
                <Feather name="x" size={18} color="#fff" />
              </Pressable>
            )}
          </View>
        )}
        contentContainerStyle={{ padding: 8 }}
        columnWrapperStyle={{ justifyContent: "space-between", width: `${100 / NUM_COLS}%` }}
        ListHeaderComponent={
          selectedPhotos.length > 0 ?
            <Text style={styles.sectionTitle}>Valda bilder ({selectedPhotos.length})</Text>
          : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Inga bilder valda än</Text>
            <Text style={styles.emptyStateSubtext}>
              Använd knapparna ovan för att lägga till bilder från kamera eller galleri
            </Text>
          </View>
        }
      />

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
    </View>
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

  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  photoContainer: {
    padding: 4,
  },
  photo: {
    width: "100%",
    aspectRatio: ASPECT[0] / ASPECT[1],
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "rgba(237, 13, 13, 0.88)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  statusIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.88)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  successIndicator: {
    backgroundColor: "#4CAF50",
  },
  errorIndicator: {
    backgroundColor: "#F44336",
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
