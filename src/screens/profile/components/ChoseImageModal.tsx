import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback } from "react";
import { View, Text, Linking } from "react-native";
import { Button } from "@/components/Button";
import { FontAwesome5 } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

interface Props {
  onImageSelected: (uri: string) => void;
}

const OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  allowsMultipleSelection: false,
  aspect: [1, 1],
  quality: 1,
};

export function ChoseImageModal({ onImageSelected }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    [],
  );

  const presentBottomSheet = useCallback(() => bottomSheetRef.current?.present(), []);

  const handlePress = async (type: "camera" | "gallery") => {
    const permission =
      type === "camera" ?
        await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      if (permission.canAskAgain) {
        Toast.show({
          type: "info",
          text1: `Behörighet till ${type === "camera" ? "kamera" : "galleriet"} krävs.`,
          bottomOffset: 100,
        });
      } else {
        Toast.show({
          type: "info",
          text1: `Behörighet till ${type === "camera" ? "kamera" : "galleriet"} nekad.`,
          text2: `Pressa på knappen för att gå till inställningar.`,
          bottomOffset: 100,
          onPress: () => Linking.openSettings(),
        });
      }
      return;
    }

    const result =
      type === "camera" ?
        await ImagePicker.launchCameraAsync(OPTIONS)
      : await ImagePicker.launchImageLibraryAsync(OPTIONS);

    if (result.canceled) return;
    const avatarUri = result.assets.map(asset => ({ uri: asset.uri }));
    if (avatarUri.length > 0) {
      onImageSelected(avatarUri[0].uri);
      bottomSheetRef.current?.dismiss();
    }
  };

  return (
    <View>
      <Button title="Ändra profilbild" onPress={presentBottomSheet} />
      <BottomSheetModal ref={bottomSheetRef} enableDynamicSizing backdropComponent={renderBackdrop}>
        <BottomSheetScrollView>
          <View style={{ padding: 16 }}>
            <Text style={{ marginBottom: 8 }}>Välj en bild</Text>
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
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}
