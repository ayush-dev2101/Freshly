import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <View className="flex flex-col gap-6 rounded-3xl bg-primary p-6 m-4 overflow-hidden shadow-sm">
      <View>
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
          Today
        </Text>
        <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
          Your Grocery Board
        </Text>
      </View>

      <View>
        <Text className="text-sm text-primary-foreground/80 mb-2">
          {pendingCount} pending • {completedCount} completed
        </Text>
        <View className="h-2 w-full overflow-hidden rounded-full bg-primary-foreground/20">
          <View
            className="h-full rounded-full"
            style={{ 
              width: `${completionRate}%`, 
              backgroundColor: 'white' 
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ListHeroCard;
