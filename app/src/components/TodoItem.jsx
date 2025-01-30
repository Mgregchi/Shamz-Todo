import React from "react";
import { Chip, IconButton, Card, Tooltip } from "react-native-paper";
import styles from "../styles";


export default function TodoItem({ item, onViewDetail, markAsCompleted }) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.title}
        titleStyle={styles.title}
        right={() => (
          <Tooltip title="View details">
            <IconButton icon="chevron-right" onPress={onViewDetail} />
          </Tooltip>
        )}
        left={() => (
          <Tooltip title="Change status">
            <IconButton
              icon={
                item.completed
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle"
              }
              onPress={markAsCompleted}
            />
          </Tooltip>
        )}
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
    </Card>
  );
}
