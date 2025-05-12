import { useAppSelector } from "@/app/store";
import { selectFilteredRestAreas } from "../selectors";

export function useRestAreas() {
  return useAppSelector(selectFilteredRestAreas);
}
