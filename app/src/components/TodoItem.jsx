import React from "react";
import { View, Text, Button } from "react-native";
import { List } from "react-native-paper";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../styles";

export function TodoItemv1({ todo, onViewDetail, onMarkComplete }) {
  return (
    <View style={styles.todoItem.item}>
      <Text style={[styles.todoItem.text, todo.completed && styles.todoItem.completed]}>{todo.title}</Text>
      <Button title="Details" onPress={onViewDetail} />
      {!todo.completed && <Button title="Complete" onPress={onMarkComplete} />}
    </View>
  );
}

export default function TodoItem ({ item, onViewDetail, markAsCompleted }) {


  return (
    <List.Item
      title={item.title}
      titleStyle={{ fontWeight: "bold" }}
      description={() => (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <List.Icon icon="map-marker-radius" size={10} />
          {item.completed && (
          <Button onPress={() => markAsCompleted} icon={"checkbox-marked-circle" } mode="contained" >Mark as completed</Button>
          )
        }
        </View>
      )}
    //   left={() => <List.Icon icon="checkbox-circle" />}
      left={() => <List.Icon icon={item.completed ? "checkbox-marked-circle" : "clock-alert-outline"} onPress={() => markAsCompleted} />}
      right={() => <List.Icon icon="chevron-right" />}

      onPress={onViewDetail}
      style={{
        marginBottom: 10,
        backgroundColor: "#fff",
        elevation: 3,
        borderRadius: 8,
        padding: 10,
      }}
    />
  );
};