import { FlatList, Text } from "react-native";
import { REVIEWS } from "./fake-reviews";
import { Review } from "./Review";

interface Props {
  restAreaId: string;
}

export function AllReviews({ restAreaId }: Props) {
  // const { reviews, isFetching, isLoading } = useReviews(restAreaId);
  const reviews = REVIEWS;
  const isFetching = false;
  const isLoading = false;

  if (isLoading) return <Text>Laddar...</Text>;

  if (isFetching) return <Text>Hämtar{reviews.length > 0 ? " flera" : ""} recensioner...</Text>;

  return (
    <FlatList
      data={reviews}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Review key={item.id} review={item} style={{ marginBottom: 16 }} />}
    />
  );
}
