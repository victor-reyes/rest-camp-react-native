import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RestAreaCard } from "./components";
import { useAppSelector } from "@/app/store";
import { selectRestAreaById } from "@/slices/rest-areas";
import { RootStackParamList } from "@/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "RestAreaModal">;

export function RestAreaScreen({ route }: Props) {
  const { id } = route.params;

  const restArea = useAppSelector(state => selectRestAreaById(state, id));

  return restArea && <RestAreaCard restArea={restArea} />;
}
