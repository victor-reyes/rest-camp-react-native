import { useCallback, useState } from "react";
import { reviewsApi } from "../api";
import { ReviewSubmit } from "../types";

type SubmitReviewData = {
  restAreaId: string;
  score: number;
  recension: string | null;
};

type SubmitReviewResult = { success: true; error?: undefined } | { success: false; error: string };

export const useSubmitReview = (userId?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitReviewToBackend] = reviewsApi.useSubmitReviewMutation();

  const submitReview = useCallback(
    async (submitReviewData: SubmitReviewData, reviewId?: string): Promise<SubmitReviewResult> => {
      if (!userId) {
        const error = "Du måste vara inloggad för att lämna en recension";
        setIsSubmitting(false);
        return { success: false, error };
      }

      setIsSubmitting(true);

      const reviewSubmit: ReviewSubmit = {
        restAreaId: submitReviewData.restAreaId,
        score: submitReviewData.score,
        recension: submitReviewData.recension || undefined,
      };

      const { error } = await submitReviewToBackend(reviewSubmit);
      setIsSubmitting(false);
      if (!error) return { success: true, error: undefined };

      //console.error("Failed to submit review:", error);
      const errorMessage = "Kunde inte skicka recensionen. Försök igen.";

      return { success: false, error: errorMessage };
    },
    [userId, submitReviewToBackend],
  );

  return { submitReview, isSubmitting };
};
