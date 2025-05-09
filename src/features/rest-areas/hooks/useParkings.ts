import { useAppSelector } from "@/app/store";
import { selectFilteredRestAreas } from "../rest-area-slice";

export function useParkings() {
  return useAppSelector(selectFilteredRestAreas);
}
