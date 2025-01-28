import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { TextInput, List, Button } from "react-native-paper";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import styles from "../styles";

const fetchTodos = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
  return data;
};

export default function TodoListScreen({ navigation }) {
  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery(["todos"], fetchTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    const newTask = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    queryClient.setQueryData(["todos"], (old) => [...old, newTask]);
    setNewTodo("");
  };

  const markAsCompleted = (id) => {
    queryClient.setQueryData(["todos"], (old) =>
      old.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo))
    );
  };

  if (isLoading) return <Text>Loading...</Text>;

  const renderFooter = () => {
    // loadingMore ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null;
    return null;
  };

  const handleViewDetail = (todo) => {
    navigation.navigate("TodoDetail", { todo });
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        // style={styles.input}
        label={"New Todo"}
        value={newTodo}
        onChangeText={setNewTodo}
        right={<TextInput.Icon icon="plus" onPress={addTodo} aria-label="Add todo"/>}
      />

    {todos ? (
        <FlatList
          data={todos}
          renderItem={({ item }) => <
            TodoItem item={item}
            onViewDetail={() => handleViewDetail(item)}
            markAsCompleted={() => markAsCompleted(item)}
            />
        }
          keyExtractor={(item, index) =>
            index.toString()
          }
          style={{ paddingVertical: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
            //   onRefresh={loadNearbyUsers}
            />
          }
        //   onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <List.Item
              title="No Todos Found"
              description="Your todos will appear here."
              style={{ padding: 10 }}
            />
          }
        />
      ) : (
        <ScrollView style={styles.container} centerContent>
          <List.Item
              title="No Todos Found"
              description="Your todos will appear here."
              style={{ padding: 10 }}
          />
        </ScrollView>
      )}

    </View>
  );
}
