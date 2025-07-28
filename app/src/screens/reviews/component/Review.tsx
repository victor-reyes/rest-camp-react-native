import { FontAwesome } from "@expo/vector-icons";
import { type Review as ReviewType } from "../types";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { UserInfo } from "./UserInfo";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { ColoredIconButton } from "@/components";

interface Props {
  review: ReviewType;
  style?: StyleProp<ViewStyle>;
}

export function Review({ review, style }: Props) {
  const { restAreaId, ownerId, score, updatedAt, isUserReview } = review;
  const navigation = useNavigation();
  const navigateToSubmitReview = useCallback(
    () => navigation.navigate("AddReview", { restAreaId, reviewId: review.id }),
    [navigation, restAreaId, review.id],
  );

  const renderIcon = useCallback(
    (color: string, size: number) => (
      <FontAwesome name="pencil-square-o" size={size} color={color} />
    ),
    [],
  );
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <UserInfo userId={ownerId} />
        {isUserReview && (
          <ColoredIconButton
            renderIcon={renderIcon}
            title="Redigera"
            onPress={navigateToSubmitReview}
            iconSize={16}
            style={styles.editButton}
          />
        )}
      </View>
      <View style={styles.row}>
        <Stars score={score} />
        <Text style={{ color: "#aaa", fontSize: 10 }}>
          {new Date(updatedAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={{ fontSize: 13 }}>{review.recension}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 8 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  editButton: { gap: 4, paddingVertical: 4, paddingHorizontal: 8 },
  row: { flexDirection: "row", gap: 8, alignItems: "center" },
});

function Stars({ score }: { score: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesome
          key={index}
          name={index < score ? "star" : "star-o"}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );
}
