import { useAppSelector } from "@/app/store";
import { selectRestAreas } from "../rest-area-slice";

export function useParkings() {
  return useAppSelector(selectRestAreas);
}
