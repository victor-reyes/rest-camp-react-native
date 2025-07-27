import { View, StyleSheet } from "react-native";
import { ReviewForm, ReviewFormData } from "./components";
import { useReview, useSubmitReview } from "@/features/reviews";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/types";
import { useUserId } from "@/features/auth";
import { Toast } from "@/components";
import { useCallback } from "react";
import { ActivityIndicator } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "AddReview">;
const DEFAULT_VALUES: ReviewFormData = { score: 0, recension: undefined };

export function AddReviewModal({ route }: Props) {
  const { restAreaId, reviewId } = route.params;
  const userId = useUserId();
  const { submitReview, isSubmitting } = useSubmitReview(userId);
  const { review, isLoading } = useReview(reviewId);
  const navigation = useNavigation();

  const navigateToProfileAndHideToast = useCallback(() => {
    Toast.hide();
    navigation.navigate("Profile");
  }, [navigation]);

  const handleSubmit = async (data: ReviewFormData) => {
    if (!userId) {
      showNavigateToProfileToast(navigateToProfileAndHideToast);
      return;
    }

    const result = await submitReview({
      restAreaId,
      score: data.score,
      recension: data.recension || null,
    });

    if (result.success) {
      showSuccessToast();
      navigation.goBack();
    } else {
      showErrorToast(result.error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ?
        <ActivityIndicator size="large" color="#0000ff" />
      : <ReviewForm
          onSubmit={handleSubmit}
          loading={isSubmitting}
          defaultValues={review || DEFAULT_VALUES}
          isEdit={!!reviewId}
        />
      }
      <Toast />
    </View>
  );
}

function showSuccessToast() {
  Toast.show({
    type: "success",
    text1: "Recension skickad!",
    text2: `Tack för din recension!`,
    position: "top",
  });
}

function showErrorToast(message: string) {
  Toast.show({
    type: "error",
    text1: "Fel",
    text2: message,
  });
}

function showNavigateToProfileToast(onPress: () => void) {
  Toast.show({
    type: "info",
    text1: "Behörighet krävs",
    text2: "Du måste vara inloggad för att lämna en recension.",
    buttonTitle: "Gå till profil",

    onPress,
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
