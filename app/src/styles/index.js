import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 18, marginBottom: 10 },
    input: { borderWidth: 1, padding: 8, borderRadius: 4, marginBottom: 10 },
    todoItem: {
        item: { padding: 10, borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between" },
        text: { flex: 1 },
        completed: { textDecorationLine: "line-through", color: "gray" },        
    }
  });

export default styles;