import { Pressable, StyleSheet, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ReactNode } from "react";

interface Props {
  label: string;
  value: boolean;
  icon: ReactNode;
  onValueChange: (value: boolean) => void;
}
export function FilterItem({ label, icon, value, onValueChange }: Props) {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [styles.itemButton, pressed && { backgroundColor: "#eee" }]}>
      {icon}
      <FontAwesome
        name={value ? "check-square-o" : "square-o"}
        size={24}
        style={{ height: 24, width: 24 }}
        color="#155196"
      />
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 8,
  },
});
