import { useGroceryStore } from "@/store/grocery-store";
import { useAuth } from "@clerk/expo";
import { Pressable, Text } from "react-native";

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();
  const { getToken } = useAuth();

  const handleClear = async () => {
    const token = await getToken();
    if (token) {
      await clearPurchased(token);
    }
  };

  return (
    <Pressable className="rounded-2xl bg-primary py-3" onPress={handleClear}>
      <Text className="text-center text-base font-semibold text-primary-foreground">
        Clear completed items
      </Text>
    </Pressable>
  );
}