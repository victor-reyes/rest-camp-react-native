import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props extends React.ComponentProps<typeof TextInput> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, leftIcon, rightIcon, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon}
        <TextInput
          style={styles.input}
          placeholderTextColor="#ccc"
          autoCapitalize={"none"}
          {...props}
        />
        {rightIcon}
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 320,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: "#ccc",
  },
});
