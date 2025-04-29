import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export function ParkingInfoModal() {
  const navigation = useNavigation();

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
