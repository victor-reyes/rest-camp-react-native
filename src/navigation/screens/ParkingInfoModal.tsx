import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = NativeStackScreenProps<RootStackParamList, "ParkingInfoModal">;

export function ParkingInfoModal({ route }: Props) {
  const { id } = route.params;
  const navigation = useNavigation();

  const {} = useGetParkingByIdQuery(id);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
