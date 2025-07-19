import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Review } from "./Review";
import { ScrollView } from "react-native-gesture-handler";
import { Score } from "@/screens/rest-area/components/Score";
import { Button } from "@/components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { REVIEWS } from "./fake-reviews";

interface Props {
  restAreaId: string;
}

export function LatestReviews({ restAreaId }: Props) {
  // const { reviews, isFetching, isLoading } = useReviews(restAreaId);
  const { width } = useWindowDimensions();

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
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#155196" }}>Recensioner</Text>
          <Button
            title="Skriv en recension"
            fit
            style={{ backgroundColor: "#15519622", borderWidth: 0, paddingVertical: 6 }}
            textColor="#155196"
            iconSize={18}
            icon={<FontAwesome name="pencil-square-o" size={18} color="#155196" />}
            onPress={() => {}}
          />
        </View>

        <Score restAreaId="ra1" onClick={() => {}} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal>
        {REVIEWS.map(review => (
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
