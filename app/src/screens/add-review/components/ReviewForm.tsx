import { View, Text, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components";
import { StarRating } from "./StarRating";
import { TextArea } from "./TextArea";

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
  loading?: boolean;
  defaultValues: ReviewFormData;
}

export function ReviewForm({ onSubmit, loading = false, defaultValues }: Props) {
  const { control, handleSubmit, formState } = useForm({ resolver, defaultValues });

  const { errors } = formState;

  const handleFormSubmit = (data: ReviewFormData) => {
    onSubmit(data);
  };

  return (
    <View style={styles.container}>
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

      <Button title="Skicka recension" fit onPress={handleSubmit(handleFormSubmit)} />
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
  ratingContainer: {
    alignSelf: "flex-start",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
  },
});
