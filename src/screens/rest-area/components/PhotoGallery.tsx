import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Photo } from "@/slices/rest-areas";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props {
  photos: Photo[];
}

export function PhotoGallery({ photos }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Photos</Text>
        <Pressable
          onPress={() => console.log("Add photo")}
          hitSlop={8}
          style={({ pressed }) => [
            styles.addPhotoButton,
            pressed && { backgroundColor: "#e0e0e0" },
          ]}>
          <FontAwesome6 name="plus" size={24} color="#155196" />
          <Text>Lägg till foto</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScrollView}>
        {photos.map(photo => (
          <View key={photo.url} style={styles.photoContainer}>
            <Image
              source={{ uri: photo.url }}
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
  addPhotoButton: {
    flexDirection: "row",
    gap: 4,
    padding: 4,
    borderRadius: 4,
    borderColor: "#eee",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
