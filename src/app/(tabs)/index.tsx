import { useClerk, useUser } from "@clerk/expo";
import { ScrollView, Text } from "react-native";

export default function ListScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <ScrollView className="flex-1 bg-background py-4 ">
      <Text>Hey</Text>
    </ScrollView>
  );
}
