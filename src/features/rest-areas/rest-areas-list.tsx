import { FlatList, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useGetParkingsQuery } from "./api";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export function RestAreasList() {
  const { data: parkings, error, refetch, isFetching } = useGetParkingsQuery();

  if (error) {
    return (
      <View>
        <Text>Error: {JSON.stringify(error)}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={parkings}
      keyExtractor={item => item.Id!}
      renderItem={({ item }) => (
        <View style={{ padding: 10, backgroundColor: "#fff", borderRadius: 8 }}>
          <Text>{item.Name}</Text>
          <Text>{item.Description}</Text>
          <Text>{item.LocationDescription}</Text>
          <Text>{item.OpenStatus}</Text>
          <Text>{item.OperationStatus}</Text>
          <FlatList
            data={item.Photo}
            horizontal
            keyExtractor={photo => photo.Url!}
            renderItem={({ item: photo }) => (
              <View>
                <Text>{photo.Title}</Text>
                <Image
                  source={{ uri: photo.Url }}
                  style={styles.image}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            )}
            contentContainerStyle={{ gap: 10 }}
          />
        </View>
      )}
      ListEmptyComponent={() => <Text>No data available</Text>}
      refreshing={isFetching}
      onRefresh={refetch}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    aspectRatio: 16 / 9,
    resizeMode: "center",
    borderRadius: 12,
  },
});
