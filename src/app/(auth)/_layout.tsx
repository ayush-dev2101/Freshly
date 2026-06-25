import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  //If Clerk is not loaded wait
  if (!isLoaded) {
    return null;
  }
  //If user is signed in
  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
