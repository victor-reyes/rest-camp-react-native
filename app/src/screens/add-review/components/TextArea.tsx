import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

interface Props extends Omit<React.ComponentProps<typeof TextInput>, "style"> {
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export function TextArea({ label, style, onBlur, ...props }: Props) {
  const [hasFocus, setHasFocus] = useState(false);
  const borderStyle = hasFocus ? { borderColor: "#007aff", borderWidth: 2, margin: -1 } : {};

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setHasFocus(false);
    onBlur?.(event);
  };

  const handleOnFocus = () => setHasFocus(true);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, borderStyle]}>
        <TextInput
          style={[styles.input]}
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          textAlignVertical="top"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlignVertical: "top",
    color: "#333",
    outlineColor: "green",
  },
});
