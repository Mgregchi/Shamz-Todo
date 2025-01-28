import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import styles from "../styles";

export default function TodoDetailScreen({ route, navigation }) {
  const { todo } = route.params;
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const saveEdit = () => {
    queryClient.setQueryData(["todos"], (old) =>
      old.map((t) => (t.id === todo.id ? { ...t, title: newTitle } : t))
    );
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <Button title="Save" onPress={saveEdit} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{todo.title}</Text>
          <Text>Status: {todo.completed ? "Completed" : "In Progress"}</Text>
          <Button title="Edit" onPress={() => setIsEditing(true)} />
        </>
      )}
    </View>
  );
}

