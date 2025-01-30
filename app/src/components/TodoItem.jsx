import React from "react";
import { Chip, Card, Button } from "react-native-paper";
import styles from "../styles";

export default function TodoItem({ item, onViewDetail, markAsCompleted }) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.title}
        titleStyle={styles.title}
        subtitle={
          <Chip
            icon={item.completed ? "check-circle" : "clock-outline"}
            style={[
              styles.chip,
              { backgroundColor: item.completed ? "#4CAF50" : "#FFC107" },
            ]}
            textStyle={{ color: "#fff", fontWeight: "bold" }}
          >
            {item.completed ? "Completed" : "In Progress"}
          </Chip>
        }
        style={{ paddingStart: 0 }}
      />
      <Card.Content
        style={{
          flexDirection: "row",
          padding: 0,
          justifyContent: "space-between",
        }}
      >
        <Button
          icon={
            item.completed ? "checkbox-blank-circle" : "checkbox-marked-circle"
          }
          onPress={() => markAsCompleted(item.id)}
          contentStyle={styles.button}
        >
          {item.completed ? "Mark In-Progress" : "Mark Completed"}
        </Button>
        <Button
          icon="chevron-right"
          onPress={onViewDetail}
          contentStyle={styles.button}
        >
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
}
