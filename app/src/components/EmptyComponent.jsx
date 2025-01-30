import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, List } from "react-native-paper";
import { ScrollView, View } from "react-native";
import styles from "../styles";

export default function EmptyComponent() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Content title="To-do" />
      </Appbar.Header>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container} centerContent>
          <List.Item
            title="Loading..."
            description="Please wait while we load your todos."
            style={styles.listItem}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
