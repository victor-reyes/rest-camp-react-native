import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Photo } from "@/features/schemas";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props {
  photos: Photo[];
}

export function PhotoGallery({ photos }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Photos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScrollView}>
        {photos.map(photo => (
          <View key={photo.Url} style={styles.photoContainer}>
            <Image
              source={{ uri: photo.Url }}
              style={styles.photo}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={300}
            />
            <Text style={styles.photoTitle} numberOfLines={1}>
              {photo.Title}
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#155196",
  },
  photoScrollView: {
    marginTop: 8,
  },
  photoContainer: {
    marginRight: 12,
    width: 200,
  },
  photo: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  photoTitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
  },
});
