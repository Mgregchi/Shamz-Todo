import React, { useState, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Button,
  TextInput,
  Card,
  Chip,
  Appbar,
  useTheme,
} from "react-native-paper";
import { useQueryClient } from "@tanstack/react-query";
import styles from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageContext } from "../contexts/MessageContext";

export default function TodoDetailScreen({ route, navigation }) {
  const { todo } = route.params;
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.title);
  const { showMessage } = useContext(MessageContext);
  const theme = useTheme();

  const saveEdit = () => {
    queryClient.setQueryData(["todos"], (old) =>
      old.map((t) =>
        t.id === todo.id ? { ...t, title: newTodo, completed: false } : t
      )
    );
    showMessage({
      text: "Todo updated successfully!",
    });
    setIsEditing(false);
  };

  const deleteTodo = (id) => {
    queryClient.setQueryData(["todos"], (old) =>
      old.filter((todo) => todo.id !== id)
    );

    showMessage({
      text: "Todo deleted successfully!",
    });
    navigation.navigate("TodoList");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={todo.title} />
        <Chip
          icon={todo.completed ? "check-circle" : "clock-outline"}
          style={[
            styles.chip,
            { backgroundColor: todo.completed ? "#4CAF50" : "#FFC107" },
          ]}
          textStyle={{ color: "#fff", fontWeight: "bold" }}
        >
          {todo.completed ? "Completed" : "In Progress"}
        </Chip>
      </Appbar.Header>
      <View style={{ margin: 5 }}>
        {isEditing ? (
          <View style={styles.cardAction}>
            <Button
              onPress={() => setIsEditing(false)}
              mode="outlined"
              icon="close"
              contentStyle={styles.button}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={saveEdit}
              icon="content-save-check"
              contentStyle={styles.button}
              textColor="white"
            >
              Save
            </Button>
          </View>
        ) : (
          <View style={styles.cardAction}>
            <Button
              onPress={() => setIsEditing(true)}
              mode="contained"
              icon="pencil"
              contentStyle={styles.button}
              textColor="white"
            >
              Edit
            </Button>
            <Button
              onPress={() => deleteTodo(todo.id)}
              icon="delete"
              contentStyle={styles.button}
              textColor={theme.colors.error}
            >
              Delete
            </Button>
          </View>
        )}
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Title title={todo.title} />
            <Card.Content style={styles.cardContent}>
              {isEditing ? (
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  value={newTodo}
                  onChangeText={setNewTodo}
                  multiline
                />
              ) : (
                <Text variant="titleMedium" style={styles.title}>
                  {todo.title}
                </Text>
              )}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
