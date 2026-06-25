import { Show, useClerk, useUser } from "@clerk/expo";
import { UserButton } from "@clerk/expo/native";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View>
      <Text>Welcome!</Text>
      <Show when="signed-out">
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-in">
          <Text>Sign Up</Text>
        </Link>
      </Show>

      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Pressable>
          <Text>Sign Out</Text>
        </Pressable>

        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <UserButton />
        </View>
      </Show>
    </View>
  );
}
