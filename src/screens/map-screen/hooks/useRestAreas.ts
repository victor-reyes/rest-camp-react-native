import { useAppSelector } from "@/app/store";
import { selectFilteredRestAreas } from "@/slices/rest-areas";

export function useRestAreas() {
  return useAppSelector(selectFilteredRestAreas);
}
