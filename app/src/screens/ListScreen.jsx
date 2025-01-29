import React, { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { TextInput, List, Appbar } from "react-native-paper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import styles from "../styles";
import { MessageContext } from "../contexts/MessageContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingContext } from "../contexts/LoadingContext";
const apiUrl = process.env.API_URL;

export default function TodoListScreen({ navigation }) {
  const { setLoading } = useContext(LoadingContext);
  const fetchTodos = async () => {
    setLoading(true);
    const { data } = await axios.get(apiUrl);
    setLoading(false);
    return data;
  };
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery(["todos"], fetchTodos, {
    enabled: true,
    staleTime: Infinity,
  });
  const [newTodo, setNewTodo] = useState("");
  const { showMessage } = useContext(MessageContext);

  useEffect(() => {
    refetch();
  }, []);
  const addTodo = () => {
    const newTask = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };
    queryClient.setQueryData(["todos"], (old) => [...old, newTask]);
    showMessage({
      text: "Todo added successfully!",
    });
    setNewTodo("");
  };

  const markAsCompleted = (id) => {
    queryClient.setQueryData(["todos"], (old) =>
      old.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedTodo = queryClient
      .getQueryData(["todos"])
      .find((todo) => todo.id === id);

    showMessage({
      text: `Todo marked as ${
        updatedTodo.completed ? "completed" : "in progress"
      }!`,
    });
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
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Content title="To-do" />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label={"New Todo"}
          value={newTodo}
          onChangeText={setNewTodo}
          multiline
          right={
            <TextInput.Icon
              icon="plus"
              onPress={addTodo}
              aria-label="Add todo"
            />
          }
        />

        {todos ? (
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                onViewDetail={() => handleViewDetail(item)}
                markAsCompleted={() => markAsCompleted(item.id)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            style={{ paddingVertical: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                // onRefresh={loadTodos}
              />
            }
            // onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <List.Item
                title="No Todos Found"
                description="Your todos will appear here."
                style={styles.listItem}
              />
            }
          />
        ) : (
          <ScrollView style={styles.container} centerContent>
            <List.Item
              title="No Todos Found"
              description="Your todos will appear here."
              style={styles.listItem}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
