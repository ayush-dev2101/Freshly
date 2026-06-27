import TabScreenBackground from "@/components/TabScreenBackground";
import { Text, View } from "react-native";

const PlannerScreen = () => {
  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground">PlannerScreen</Text>
      <TabScreenBackground />
    </View>
  );
};

export default PlannerScreen;
