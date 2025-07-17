import { ReactNode, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props extends React.ComponentProps<typeof TextInput> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({ label, leftIcon, rightIcon, onBlur, ...props }: Props) {
  const [hasFocus, setHasFocus] = useState(false);
  const backgroundColor = hasFocus ? "#007aff" : "#ccc";

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setHasFocus(false);
    onBlur?.(event);
  };

  const handleOnFocus = () => setHasFocus(true);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon}
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor="#ccc"
          autoCapitalize={"none"}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {rightIcon}
      </View>
      <View style={[styles.horizontalLine, { backgroundColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
  },
  horizontalLine: {
    height: 2,
  },
});
