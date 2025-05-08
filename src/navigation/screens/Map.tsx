import { useAppDispatch } from "@/app/store";
import { Map } from "@/features/rest-areas";
import { loadRestAreas } from "@/features/rest-areas/rest-area-slice";
import { useEffect } from "react";

export default function MapScreen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadRestAreas());
  }, [dispatch]);
  return <Map />;
}
