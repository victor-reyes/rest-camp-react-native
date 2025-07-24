import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRef, useCallback, PropsWithChildren } from "react";
import { View, Text, Linking } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { Pressable } from "react-native-gesture-handler";

interface Props extends Required<PropsWithChildren> {
  onImageSelected: (uri: string) => void;
}

const OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  allowsMultipleSelection: false,
  aspect: [1, 1],
  quality: 1,
};

export function ChoseImageModal({ onImageSelected, children }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    [],
  );

  const presentBottomSheet = useCallback(() => bottomSheetRef.current?.present(), []);

  const handlePress = useCallback(
    async (type: "camera" | "gallery") => {
      const permission = await getPermissionFor(type);

      if (permission.granted) {
        const avatarUri = await getImageUriFromPicker(type);
        if (avatarUri) onImageSelected(avatarUri);
      } else {
        const toastShowParams = getToastShowParamsFor(type, permission.canAskAgain);
        Toast.show(toastShowParams);
      }

      bottomSheetRef.current?.dismiss();
    },
    [onImageSelected],
  );

  return (
    <View>
      <Pressable onPress={presentBottomSheet}>{children}</Pressable>
      <BottomSheetModal ref={bottomSheetRef} enableDynamicSizing backdropComponent={renderBackdrop}>
        <BottomSheetView style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
          <ChooseButton onPress={handlePress} title="Välj från galleriet" type="gallery" />
          <ChooseButton onPress={handlePress} title="Ta en foto" type="camera" />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

async function getPermissionFor(type: "camera" | "gallery") {
  return type === "camera" ?
      await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();
}

function getToastShowParamsFor(type: "camera" | "gallery", canAskAgain: boolean) {
  let toast: ToastShowParams = { type: "info", bottomOffset: 100 };
  if (canAskAgain)
    toast.text1 = `Behörighet till ${type === "camera" ? "kamera" : "galleriet"} krävs.`;
  else {
    toast.text1 = `Behörighet till ${type === "camera" ? "kamera" : "galleriet"} nekad.`;
    toast.text2 = `Pressa på knappen för att gå till inställningar.`;
    toast.onPress = () => Linking.openSettings();
  }
  return toast;
}

async function getImageUriFromPicker(type: "camera" | "gallery") {
  const result =
    type === "camera" ?
      await ImagePicker.launchCameraAsync(OPTIONS)
    : await ImagePicker.launchImageLibraryAsync(OPTIONS);

  if (result.canceled) return;
  return result.assets[0].uri;
}

const ChooseButton = ({
  onPress,
  title,
  type,
}: {
  onPress: (type: "camera" | "gallery") => void | Promise<void>;
  title: string;
  type: "camera" | "gallery";
}) => {
  const handlePress = useCallback(() => onPress(type), [onPress, type]);
  return (
    <Pressable
      onPress={handlePress}
      style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <FontAwesome5 name={type === "camera" ? "camera" : "images"} size={24} color="#155196" />
      <Text style={{ fontSize: 16, color: "#155196" }}>{title}</Text>
      <MaterialIcons name="navigate-next" size={24} color="black" />
    </Pressable>
  );
};
