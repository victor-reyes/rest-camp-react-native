import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Review } from "./Review";
import { ScrollView } from "react-native-gesture-handler";
import { Score } from "@/screens/rest-area/components/Score";
import { Card, ColoredIconButton } from "@/components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/core";
import { useCallback, useMemo } from "react";
import { useReviews } from "@/features/reviews";
import { selectUserId } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/store";
import { onNeedAuthorizationProps } from "@/screens/rest-area";
import { offlineProfilesApi } from "@/features/profiles";

interface Props {
  restAreaId: string;
  onNeedAuthorization: ({ reason, description }: onNeedAuthorizationProps) => void;
}

export function LatestReviews({ restAreaId, onNeedAuthorization }: Props) {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const { reviews, isFetching, isLoading } = useReviews(restAreaId, userId);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleAddReviewPress = useCallback(async () => {
    if (!userId) {
      onNeedAuthorization({
        reason: "Behöver autentisering",
        description: "Logga in för att skriva en recension.",
      });
      return;
    }

    const promise = dispatch(offlineProfilesApi.endpoints.getProfile.initiate(userId));
    const profile = await promise.unwrap();
    promise.unsubscribe();
    if (!profile?.fullName) {
      onNeedAuthorization({
        reason: "Behöver fullständigt namn",
        description: "Fyll i ditt fullständiga namn i profilen för att skriva en recension.",
      });
      return;
    }

    navigation.navigate("AddReview", { restAreaId });
  }, [dispatch, navigation, onNeedAuthorization, restAreaId, userId]);

  const alreadyReviewed = reviews.some(review => review.ownerId === userId);
  const cardStyle = useMemo(() => ({ width: width * 0.7, maxWidth: 320 }), [width]);

  const renderIcon = useCallback(
    (color: string, size: number) => <FontAwesome name="plus" size={size} color={color} />,
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Recensioner{isFetching && " (uppdateras...)"}</Text>
          {!alreadyReviewed && (
            <ColoredIconButton
              renderIcon={renderIcon}
              onPress={handleAddReviewPress}
              style={styles.buttonStyle}
              disabled={isLoading}
              title="Lägg till recension"
              iconSize={16}
            />
          )}
        </View>

        <Score restAreaId={restAreaId} onClick={() => {}} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal>
        {reviews?.map(review => (
          <Card style={cardStyle} key={review.id}>
            <Review review={review} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { padding: 12 },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  scrollViewContainer: { height: "100%", gap: 8, paddingVertical: 24, paddingHorizontal: 12 },
  buttonStyle: {},
});
