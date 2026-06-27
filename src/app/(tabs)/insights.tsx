import { View, Text } from 'react-native'
import React from 'react'
import { useColorScheme } from "react-native";

const InsightsScreen = () => {
  const colorScheme = useColorScheme();
  console.log("RN colorScheme:", colorScheme);

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <Text className="text-foreground">InsightsScreen</Text>
    </View>
  )
}

export default InsightsScreen