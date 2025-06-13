import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Photo } from "@/slices/rest-areas";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props {
  restAreaId: string;
  photos: Photo[];
}

export function PhotoGallery({ photos, restAreaId }: Props) {
  const navigation = useNavigation();

  const handleAddPhotos = () => navigation.navigate("UploadPhotos", { restAreaId });
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Bilder</Text>
        <Button
          title="Lägg till bilder"
          fit
          iconSize={18}
          icon={<FontAwesome6 name="plus" size={18} color="#155196" />}
          onPress={handleAddPhotos}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.photoScrollView}
        contentContainerStyle={styles.photoScrollViewContent}>
        {photos.map(photo => (
          <View key={photo.url}>
            <Image
              source={{ uri: photo.thumbnailUrl }}
              style={styles.photo}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={300}
            />
            <Text style={styles.photoTitle} numberOfLines={1}>
              {photo.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#155196",
  },
  photoScrollView: {
    marginTop: 8,
  },
  photoScrollViewContent: {
    flexDirection: "row",
    gap: 8,
  },
  photo: {
    width: 160,
    height: 120,
    borderRadius: 8,
  },
  photoTitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
  },
});
