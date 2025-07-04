import { useAppSelector } from "@/app/store";
import { ProfileScreen } from "@/screens/profile";
import { selectAuth } from "@/slices/auth";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { Text } from "react-native";

export function ProfileModal() {
  const btmSheetRef = useRef<BottomSheetModal>(null);

  const { session } = useAppSelector(selectAuth);

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
          <ProfileScreen />
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
