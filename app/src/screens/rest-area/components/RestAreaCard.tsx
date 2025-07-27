import { View } from "react-native";
import { Description } from "./Description";
import { Services } from "./Services";
import { ParkingHeader } from "./RestAreaHeader";
import { PhotoGallery } from "./PhotoGallery";
import { StyleSheet } from "react-native";
import { useGetRestAreaQuery } from "@/features/rest-areas";
import { LatestReviews } from "@/screens/reviews";
import { useCallback } from "react";
import { Toast } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { onNeedAuthorizationProps } from "../types";

export interface Props {
  id: string;
}

export function RestAreaCard({ id }: Props) {
  const { data: restArea } = useGetRestAreaQuery(id);
  const navigation = useNavigation();
  const navigateToProfileAndHideToast = useCallback(() => {
    Toast.hide();
    navigation.navigate("Profile");
  }, [navigation]);
  const handleOnNeedAuthorization = useCallback(
    ({ reason, description }: onNeedAuthorizationProps) =>
      showNavigateToProfileToast(reason, description, navigateToProfileAndHideToast),
    [navigateToProfileAndHideToast],
  );

  if (!restArea) return null;

  return (
    <View style={styles.container}>
      <ParkingHeader
        id={id}
        name={restArea.name}
        updatedAt={restArea.updatedAt}
        latitude={restArea.latitude}
        longitude={restArea.longitude}
      />

      <Description
        description={restArea.description || undefined}
        locationDescription={restArea.localDescription || undefined}
        status={restArea.status}
      />

      <Services restAreaId={id} />
      <PhotoGallery restAreaId={id} onNeedAuthorization={handleOnNeedAuthorization} />
      <LatestReviews restAreaId={id} onNeedAuthorization={handleOnNeedAuthorization} />
    </View>
  );
}

function showNavigateToProfileToast(title: string, description: string, onPress: () => void) {
  Toast.show({
    type: "error",
    visibilityTime: 5000,
    text1: title,
    text2: description,
    buttonTitle: "Logga in",
    onPress,
  });
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
});
