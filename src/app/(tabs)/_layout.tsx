import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useGroceryStore } from "@/store/grocery-store";

export default function TabsLayout() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const { loadItems } = useGroceryStore();

  useEffect(() => {
    if (isSignedIn) {
      getToken().then((token) => {
        if (token) loadItems(token);
      });
    }
  }, [isSignedIn]);

  // Custom Tint Color
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  const tabBackgroundColor = isDark ? "hsl(150 31% 9%)" : "hsl(138 47% 97%)";

  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    // This will wrap all the pages into the safe area view
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <NativeTabs tintColor={tabTintColor} backgroundColor={tabBackgroundColor}>
        {/* Rendering the tabs (sf: ios & md: android) */}
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{
              default: "list.bullet.clipboard",
              selected: "list.bullet.clipboard.fill",
            }}
            md="list"
          />
          {/* Badge for the List */}
          <NativeTabs.Trigger.Badge></NativeTabs.Trigger.Badge>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="planner">
          <NativeTabs.Trigger.Label>planner</NativeTabs.Trigger.Label>

          <NativeTabs.Trigger.Icon
            sf={{
              default: "plus.circle",
              selected: "plus.circle.fill",
            }}
            md="analytics"
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="insights">
          <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>

          <NativeTabs.Trigger.Icon
            sf={{
              default: "chart.bar",
              selected: "chart.bar.fill",
            }}
            md="analytics"
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </SafeAreaView>
  );
}
