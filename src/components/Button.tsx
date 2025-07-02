import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
  title?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  iconSize?: number;
  disabled?: boolean;
  fit?: boolean;
  onPress: () => void;
}

export function Button({
  onPress,
  title,
  style,
  textColor,
  icon,
  iconSize = 24,
  disabled = false,
  fit = false,
}: Props) {
  const iconSizeStyle = { height: iconSize, width: iconSize };
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        fit && styles.buttonFit,
        style,
        disabled && { opacity: 0.3, backgroundColor: "#eee" },
      ]}>
      {icon && <View style={iconSizeStyle}>{icon}</View>}
      {title && <Text style={[styles.buttonText, textColor && { color: textColor }]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 8,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    maxWidth: 320,
  },
  buttonPressed: {
    backgroundColor: "#eee",
  },
  buttonFit: {
    width: "auto",
    maxWidth: "100%",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
