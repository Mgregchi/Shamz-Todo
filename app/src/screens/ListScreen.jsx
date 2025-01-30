import { useState, useContext, useEffect } from "react";
import { View, FlatList, RefreshControl, ScrollView } from "react-native";
import { TextInput, List, Appbar, Button } from "react-native-paper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "../components/TodoItem";
import styles from "../styles";
import { MessageContext } from "../contexts/MessageContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingContext } from "../contexts/LoadingContext";
import EmptyComponent from "../components/EmptyComponent";
import { fetchTodos } from "../services/api";

export default function TodoListScreen({ navigation }) {
  const { setLoading } = useContext(LoadingContext);
  const [newTodo, setNewTodo] = useState("");
  const { showMessage } = useContext(MessageContext);
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery(["todos"], fetchTodos, {
    enabled: true,
    staleTime: Infinity,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const loadTodos = async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  };

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

  if (isLoading) return <EmptyComponent />;

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
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label={"New Todo"}
            value={newTodo}
            onChangeText={setNewTodo}
            multiline
          />
          <Button
            mode="contained"
            onPress={addTodo}
            icon={"plus"}
            contentStyle={styles.button}
          >
            Add Todo
          </Button>
        </View>
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
              <RefreshControl refreshing={isLoading} onRefresh={loadTodos} />
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
          <ScrollView contentContainerStyle={styles.container} centerContent>
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
