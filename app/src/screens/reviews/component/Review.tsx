import { FontAwesome } from "@expo/vector-icons";
import { type Review as ReviewType } from "../types";
import { Card } from "@/components";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { UserInfo } from "./UserInfo";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { ColoredIconButton } from "@/components/ColoredIconButton";

interface Props {
  review: ReviewType;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
}

export function Review({ review, numberOfLines, style }: Props) {
  const { restAreaId, ownerId, score, updatedAt, isUserReview } = review;
  const navigation = useNavigation();
  const navigateToSubmitReview = useCallback(
    () => navigation.navigate("AddReview", { restAreaId, reviewId: review.id }),
    [navigation, restAreaId, review.id],
  );
  return (
    <Card style={style}>
      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}>
          <UserInfo userId={ownerId} />
          {isUserReview && (
            <ColoredIconButton
              renderIcon={color => <FontAwesome name="pencil-square-o" size={16} color={color} />}
              title="Redigera"
              onPress={navigateToSubmitReview}
              iconSize={16}
              style={{ paddingVertical: 4, paddingHorizontal: 8 }}
            />
          )}
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Stars score={score} />
          <Text style={{ color: "#aaa", fontSize: 10 }}>
            {new Date(updatedAt).toLocaleDateString()}
          </Text>
        </View>
        <Text style={{ fontSize: 15, flex: 1 }} numberOfLines={numberOfLines} ellipsizeMode="tail">
          {review.recension}
        </Text>
      </View>
    </Card>
  );
}

function Stars({ score }: { score: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
