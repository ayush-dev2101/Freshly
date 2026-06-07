import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page of Freshly</Text>
      <Link href={"/about"}>About Screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
