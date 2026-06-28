import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "@clerk/expo";

export default function CompletedItems() {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const { getToken } = useAuth();
  
  const purchasedItems = items.filter((item) => item.purchased);

  const handleToggle = async (id: string) => {
    const token = await getToken();
    if (token) await togglePurchased(id, token);
  };

  const handleRemove = async (id: string) => {
    const token = await getToken();
    if (token) await removeItem(id, token);
  };

  if (!purchasedItems.length) return null;

  return (
    <View className="mb-4">
      <Text className="ml-1 mt-4 text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
        Completed ({purchasedItems.length})
      </Text>
      <View className="mt-4 gap-3">
        {purchasedItems.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between rounded-3xl border border-border bg-card p-4"
          >
            <View className="flex-1 flex-row items-center gap-3">
              <Pressable
                className="items-center justify-center rounded-full bg-primary p-2 opacity-70"
                onPress={() => handleToggle(item.id)}
              >
                <FontAwesome6 name="check" size={14} color="#fff" />
              </Pressable>
              <Text className="text-base font-semibold text-muted-foreground line-through">
                {item.name}
              </Text>
            </View>

            <Pressable
              className="px-2 py-1"
              onPress={() => handleRemove(item.id)}
            >
              <FontAwesome6 name="trash" size={16} color="#7a9386" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};
