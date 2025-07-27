import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Review } from "./Review";
import { ScrollView } from "react-native-gesture-handler";
import { Score } from "@/screens/rest-area/components/Score";
import { Button } from "@/components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
import { useCallback } from "react";
import { useReviews } from "@/features/reviews";
import { selectUserId } from "@/features/auth";
import { useAppSelector } from "@/store";
import { onNeedAuthorizationProps } from "@/screens/rest-area";

interface Props {
  restAreaId: string;
  onNeedAuthorization: ({ reason, description }: onNeedAuthorizationProps) => void;
}

export function LatestReviews({ restAreaId, onNeedAuthorization }: Props) {
  const userId = useAppSelector(selectUserId);
  const { reviews, isFetching, isLoading } = useReviews(restAreaId, userId);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleAddReviewPress = useCallback(() => {
    if (!userId) {
      onNeedAuthorization({
        reason: "Behöver autentisering",
        description: "Logga in för att skriva en recension.",
      });
      return;
    }
    navigation.navigate("AddReview", { restAreaId });
  }, [navigation, onNeedAuthorization, restAreaId, userId]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#155196" }}>
            Recensioner{isFetching && " (uppdateras...)"}
          </Text>
          <Button
            title="Skriv en recension"
            fit
            style={{ backgroundColor: "#15519622", borderWidth: 0, paddingVertical: 6 }}
            textColor="#155196"
            iconSize={18}
            icon={<FontAwesome name="pencil-square-o" size={18} color="#155196" />}
            onPress={handleAddReviewPress}
          />
        </View>

        <Score restAreaId="ra1" onClick={() => {}} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal>
        {reviews?.map(review => (
          <Review
            key={review.id}
            review={review}
            numberOfLines={4}
            style={{ width: width * 0.66, maxWidth: 320 }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 12 },
  scrollViewContainer: { gap: 8, height: 200, paddingVertical: 24, paddingHorizontal: 12 },
});
