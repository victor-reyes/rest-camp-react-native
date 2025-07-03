const ratingFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatRating(rating: number): string {
  return ratingFormatter.format(rating);
}
