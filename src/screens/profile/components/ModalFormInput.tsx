import { Button } from "@/components";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";
import { View, Text } from "react-native";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ModalFormInput({ label, value, onChange, placeholder }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    [],
  );
  const presentBottomSheet = useCallback(() => bottomSheetRef.current?.present(), []);

  return (
    <View>
      <Button
        title="Ändra"
        hitSlop={16}
        style={{
          borderWidth: 0,
          borderBottomWidth: 1,
          padding: 0,
          borderRadius: 0,
        }}
        onPress={presentBottomSheet}
      />

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}>
        <View style={{ padding: 16 }}>
          <Text style={{ marginBottom: 8 }}>{label}</Text>
          <BottomSheetTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 4,
            }}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
}
