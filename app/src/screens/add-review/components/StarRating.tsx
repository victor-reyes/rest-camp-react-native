import { View, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
  color?: string;
  activeColor?: string;
}

export function StarRating({
  rating,
  onRatingChange,
  size = 24,
  color = "#e5e7eb",
  activeColor = "#fbbf24",
}: Props) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleStarPress = (starRating: number) => {
    onRatingChange(starRating);
  };

  return (
    <View style={styles.container}>
      {stars.map(star => (
        <Pressable key={star} onPress={() => handleStarPress(star)} style={styles.starButton}>
          <StarIcon
            size={size}
            filled={star <= rating}
            color={star <= rating ? activeColor : color}
          />
        </Pressable>
      ))}
    </View>
  );
}

interface StarIconProps {
  size: number;
  filled: boolean;
  color: string;
}

function StarIcon({ size, filled, color }: StarIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d={
          filled ?
            "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          : "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        }
        fill={color}
        stroke={filled ? color : "#d1d5db"}
        strokeWidth={filled ? 0 : 1}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 4,
  },
  starButton: {
    padding: 2,
  },
});
