// Single SignOn
import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  //Fixing the strategy to login/sign-up
  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple",
  ) => {

    if(loadingStrategy) return; //While loading any of the OAuth do nothing or do not load another OAuth
    setLoadingStrategy(strategy); //this will set the strategy as per the user

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      //Logic for incomplete sign in or sign up
      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign-in incomplete",
          "Sign-in did not complete. Please try again.",
        );
        return;
      }
      //If sign in or sign up logic is correct
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth: ", error);
      Alert.alert("Error", "Failed to sign in. Please try again");
    } finally {
      setLoadingStrategy(null);
    }
  };
  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;
