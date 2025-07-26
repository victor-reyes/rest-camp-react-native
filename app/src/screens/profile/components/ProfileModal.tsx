import { useAppSelector } from "@/store";
import { selectSession } from "@/features/auth";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { Text } from "react-native";
import { SignIn } from "./SignIn";

export function ProfileModal() {
  const btmSheetRef = useRef<BottomSheetModal>(null);

  const session = useAppSelector(selectSession);

  useEffect(() => {
    if (!session) btmSheetRef.current?.present();
    else dismissWithDelay(1500);

    async function dismissWithDelay(delay: number) {
      await new Promise(resolve => setTimeout(resolve, delay));
      btmSheetRef.current?.dismiss();
    }
  }, [session]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="none"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const animationConfigs = useBottomSheetTimingConfigs({ duration: 1500 });

  return (
    <BottomSheetModal
      enableDynamicSizing
      animationConfigs={animationConfigs}
      enablePanDownToClose={false}
      ref={btmSheetRef}
      backdropComponent={renderBackdrop}>
      <BottomSheetView>
        {!session ?
          <SignIn />
        : <SignedIn />}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const SignedIn = () => {
  return (
    <Text style={{ padding: 32, fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
      Du är inloggad!
    </Text>
  );
};
