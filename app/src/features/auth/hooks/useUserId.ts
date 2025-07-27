import { useAppSelector } from "@/store";
import { selectUserId } from "../auth-slice";

export function useUserId() {
  const userId = useAppSelector(selectUserId);
  return userId;
}
