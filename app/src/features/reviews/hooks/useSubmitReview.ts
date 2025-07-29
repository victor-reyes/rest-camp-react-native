import { useCallback, useState } from "react";
import { reviewsApi } from "../api";
import { ReviewSubmit } from "../types";
import { useAppDispatch } from "@/store";

type SubmitReviewData = {
  restAreaId: string;
  score: number;
  recension: string | null;
};

type SubmitReviewResult = { success: true; error?: undefined } | { success: false; error: string };

export const useSubmitReview = (userId?: string) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { submitReview, updateReview, removeReview } = reviewsApi.endpoints;

  const submitOrUpdateReview = useCallback(
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

      console.log("Submitting review:", reviewSubmit, "for reviewId:", reviewId);
      const { error } = await dispatch(
        reviewId ?
          updateReview.initiate({ ...reviewSubmit, id: reviewId })
        : submitReview.initiate(reviewSubmit),
      );

      setIsSubmitting(false);
      if (!error) return { success: true, error: undefined };

      //console.error("Failed to submit review:", error);
      const errorMessage = "Kunde inte skicka recensionen. Försök igen.";

      return { success: false, error: errorMessage };
    },
    [userId, dispatch, updateReview, submitReview],
  );

  const remove = useCallback(
    async (reviewId: string): Promise<SubmitReviewResult> => {
      if (!userId) {
        const error = "Du måste vara inloggad för att ta bort en recension";
        setIsSubmitting(false);
        return { success: false, error };
      }

      setIsSubmitting(true);

      const { error } = await dispatch(removeReview.initiate(reviewId));

      setIsSubmitting(false);
      if (!error) return { success: true, error: undefined };

      const errorMessage = "Kunde inte ta bort recensionen. Försök igen.";

      return { success: false, error: errorMessage };
    },
    [userId, dispatch, removeReview],
  );

  return { submitReview: submitOrUpdateReview, removeReview: remove, isSubmitting };
};
