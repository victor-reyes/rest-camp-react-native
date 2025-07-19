import { FontAwesome } from "@expo/vector-icons";
import { type Review as ReviewType } from "../types";
import { Card } from "./Card";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { UserInfo } from "./UserInfo";

interface Props {
  review: ReviewType;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
}

export function Review({ review, numberOfLines, style }: Props) {
  return (
    <Card style={style}>
      <View style={{ flex: 1, gap: 8 }}>
        {/* avatar and author name */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <UserInfo id={review.ownerId} />
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Stars score={review.score} />
          <Text style={{ color: "#aaa", fontSize: 10 }}>
            {new Date(review.updatedAt).toLocaleDateString()}
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
