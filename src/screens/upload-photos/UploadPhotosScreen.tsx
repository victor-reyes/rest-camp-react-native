import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView, Pressable } from "react-native";
import { Image } from "expo-image";
import { RootStackParamList } from "@/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@/components/Button";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/slices/rest-areas";

type Props = NativeStackScreenProps<RootStackParamList, "UploadPhotos">;

type SelectedPhoto = { uri: string };

export function UploadPhotosScreen({ route }: Props) {
  const { restAreaId } = route.params;
  const navigation = useNavigation();

  const restArea = useAppSelector(state => selectRestAreaById(state, restAreaId));

  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);

  const handleTakePhoto = () => {
    const newPhoto: SelectedPhoto = { uri: `https://picsum.photos/300/200?random=${Date.now()}` };
    setSelectedPhotos(prev => [...prev, newPhoto]);
  };

  const handleChooseFromGallery = () => {
    const newPhoto: SelectedPhoto = {
      uri: `https://picsum.photos/300/200?random=${Date.now() + 1}`,
    };
    setSelectedPhotos(prev => [...prev, newPhoto]);
  };

  const handleRemovePhoto = (uri: string) =>
    setSelectedPhotos(prev => prev.filter(photo => photo.uri !== uri));

  const handleCancel = () => navigation.goBack();
  const handleUpload = () => Alert.alert("Upload", "Upload functionality not implemented yet");

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
            onPress={handleTakePhoto}
          />
          <Button
            title="Galleri"
            fit
            icon={<FontAwesome5 name="images" size={24} color="#155196" />}
            onPress={handleChooseFromGallery}
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
