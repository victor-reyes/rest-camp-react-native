import { formatRating } from "@/lib/formatters";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useScore } from "@/features/reviews";

interface Props {
  restAreaId: string;
  onClick: () => void;
}

export function Score({ onClick, restAreaId }: Props) {
  const { score, numberOfReviews, isFetching, isLoading } = useScore(restAreaId);

  const hasReviews = !isLoading && numberOfReviews > 0;

  const textHelper =
    isLoading ? "Laddas..." : `${formatRating(score)}${isFetching ? " (uppdateras...)" : ""}`;

  return (
    <Pressable onPress={onClick} style={styles.ratingContainer}>
      <View style={styles.rating}>
        <FontAwesome name="star" size={20} color={hasReviews ? "#FFD700" : "#aaa"} />
        <Text style={[styles.ratingText, !hasReviews && { color: "#aaa" }]}>{textHelper}</Text>
        <Text style={hasReviews ? styles.reviewCount : styles.noReviewsText}>
          ({hasReviews ? `${numberOfReviews}` : "Inga betyg än"})
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    alignContent: "center",
    alignItems: "flex-start",
    //padding: 8,
    //borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 50,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reviewCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
  noReviewsText: {
    fontSize: 12,
    color: "#aaa",
  },
});
