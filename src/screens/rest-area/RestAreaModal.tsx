import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/slices/rest-areas";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { memo, useCallback, useEffect, useRef } from "react";
import { RestAreaCard } from "./components";
import { BackHandler } from "react-native";
import { useIsFocused } from "@react-navigation/native";

type Props = { id: string | null; onClose: () => void };
function RestAreaModalComponent({ id, onClose }: Props) {
  const restArea = useAppSelector(state => selectRestAreaById(state, id));

  useEffect(() => {
    if (restArea) bottomSheetRef.current?.present();
    else bottomSheetRef.current?.dismiss();
  }, [restArea]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!id || !isFocused) return false;
      bottomSheetRef.current?.dismiss();
      return true;
    });
    return () => subscription?.remove();
  }, [id, isFocused]);

  return (
    restArea && (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["50%", "75%", "90%"]}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        onDismiss={onClose}
        enablePanDownToClose>
        <BottomSheetView>
          <RestAreaCard restArea={restArea} />
        </BottomSheetView>
      </BottomSheetModal>
    )
  );
}

export const RestAreaModal = memo(RestAreaModalComponent);
