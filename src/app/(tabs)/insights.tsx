import TabScreenBackground from "@/components/TabScreenBackground";
import { Text, useColorScheme, View } from "react-native";

const InsightsScreen = () => {
  const colorScheme = useColorScheme();
  console.log("RN colorScheme:", colorScheme);

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground">InsightsScreen</Text>
      <TabScreenBackground />
    </View>
  );
};

export default InsightsScreen;
