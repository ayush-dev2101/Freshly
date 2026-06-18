import { StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-white-50">Welcome to the Home Page of Freshly</Text>
      {/* <Link href={"/about"}>About Screen</Link> --> This was only for the example of the working of react-native */}
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
