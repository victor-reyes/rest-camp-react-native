import { Button } from "@/components";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { is } from "drizzle-orm";
import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  label: string;
  defaultValue: string | null;
  onSave: (value: string) => void;
  placeholder?: string;
}

export function ModalFormInput({ label, defaultValue, onSave, placeholder }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [value, setValue] = useState(defaultValue);
  const isValueEmpty = useMemo(() => !value?.trim(), [value]);
  const isDefaultValueEmpty = useMemo(() => !defaultValue?.trim(), [defaultValue]);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={isDefaultValueEmpty ? "none" : "close"}
      />
    ),
    [isDefaultValueEmpty],
  );
  const presentBottomSheet = useCallback(() => bottomSheetRef.current?.present(), []);

  useEffect(() => {
    if (!value) presentBottomSheet();
  }, [presentBottomSheet, value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleOnSave = useCallback(() => {
    if (value) {
      const trimmedValue = value.trim();
      if (trimmedValue !== defaultValue) onSave(trimmedValue);

      bottomSheetRef.current?.dismiss();
    } else {
      console.warn("Value cannot be empty");
      Toast.show({
        type: "error",
        text1: "Fältet kan inte vara tomt",
      });
    }
  }, [value, defaultValue, onSave]);

  const handleOnDismiss = useCallback(() => setValue(defaultValue), [defaultValue]);

  return (
    <View>
      <Button title="Ändra" hitSlop={16} style={style.triggerButton} onPress={presentBottomSheet} />
      <BottomSheetModal
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        enablePanDownToClose={!isDefaultValueEmpty}
        onDismiss={handleOnDismiss}
        snapPoints={snapPoints}>
        <BottomSheetScrollView contentContainerStyle={style.container}>
          <Text style={{ marginBottom: 8 }}>{label}</Text>
          <BottomSheetTextInput
            value={value ?? ""}
            autoFocus={true}
            onChangeText={setValue}
            placeholder={placeholder}
            style={style.input}
          />
          <View style={style.bottomContainer}>
            <Button
              title="Avbryt"
              onPress={() => bottomSheetRef.current?.dismiss()}
              style={style.button}
            />
            <Button
              title="Spara"
              disabled={isValueEmpty}
              onPress={handleOnSave}
              style={style.button}
            />
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  triggerButton: {
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 0,
    borderRadius: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    color: "#000",
  },
  button: {
    marginTop: 16,
    alignSelf: "center",
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
