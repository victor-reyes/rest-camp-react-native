import { View, Text, StyleSheet, Alert, BackHandler, ActivityIndicator } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components";
import { StarRating } from "./StarRating";
import { TextArea } from "./TextArea";
import { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const reviewSchema = z.object({
  score: z.number().min(1, "Betyg är obligatoriskt").max(5),
  recension: z
    .string()
    .trim()
    .min(1, "Recension kan inte vara tom")
    .max(500, "Recension får max vara 500 tecken")
    .optional()
    .or(z.literal("")),
});

const resolver = zodResolver(reviewSchema);

export type ReviewFormData = z.infer<typeof reviewSchema>;

interface Props {
  onSubmit: (data: ReviewFormData) => void;
  onRemove: () => void;
  loading?: boolean;
  defaultValues: ReviewFormData;
  isEdit?: boolean;
}

export function ReviewForm({
  onSubmit,
  onRemove,
  loading = false,
  defaultValues,
  isEdit = false,
}: Props) {
  const { control, handleSubmit, formState } = useForm({ resolver, defaultValues });

  const { errors } = formState;

  const handleFormSubmit = useCallback((data: ReviewFormData) => onSubmit(data), [onSubmit]);
  const navigation = useNavigation();

  const handleRemove = useCallback(() => onRemove(), [onRemove]);

  useEffect(() => {
    const onBackPress = () => {
      if (formState.isDirty) {
        Alert.alert(
          "Vill du slänga utkastet?",
          "Du kommer att förlora det du har skrivit.",
          [
            { text: "Släng", onPress: () => navigation.goBack(), style: "destructive" },
            { text: "Behåll", onPress: () => {}, style: "cancel" },
          ],
          { cancelable: false },
        );

        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => backHandler.remove();
  }, [formState.isDirty, navigation]);

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            backgroundColor: "#ffffff80",
          }}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
            animating={loading}
            style={{ padding: 20 }}
          />
        </View>
      )}
      <Controller
        name="score"
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.ratingContainer}>
            <StarRating rating={value} onRatingChange={onChange} size={32} />
            <Text style={styles.errorText}>{errors.score?.message}</Text>
          </View>
        )}
      />

      <Controller
        name="recension"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ width: "100%" }}>
            <TextArea
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              editable={!loading}
              placeholder="Beskriv din upplevelse (valfritt)"
              multiline
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.errorText}>{errors.recension?.message}</Text>
              <Text style={{ textAlign: "right", color: "#aaa", fontSize: 10 }}>
                {(value ?? "").trim().length}/500
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.row}>
        {isEdit && <Button title="Ta bort recension" fit onPress={handleRemove} />}
        <Button
          title={isEdit ? "Uppdatera recension" : "Skicka recension"}
          fit
          onPress={handleSubmit(handleFormSubmit)}
          disabled={!formState.isDirty || loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    gap: 8,
  },
  row: { flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "space-between" },
  ratingContainer: {
    alignSelf: "flex-start",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
  },
});
