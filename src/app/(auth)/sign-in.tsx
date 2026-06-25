import useSocialAuth from "@/hooks/useSocialAuth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  return (
    <SafeAreaView>
      <View className="flex-1 justify-center items-center bg-primary">
        <Text>Hello Madam/Sir</Text>
      </View>
      ;
    </SafeAreaView>
  );
}
