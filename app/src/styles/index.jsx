import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { flex: 1, padding: 5, justifyContent: "center" },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  inputContainer: { gap: 10 },
  button: { flexDirection: "row-reverse", color: "#fff" },
  chip: {
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  cardContent: {
    padding: 0,
  },
  cardAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: 10,
    padding: 0,
  },
  listItem: { padding: 10 },
});

export default styles;