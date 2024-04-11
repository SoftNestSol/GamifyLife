import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView ,TouchableOpacity} from "react-native";
import React, { useState } from "react";

export default function TaskList() {
  // this will be our list of tasks
  const [userTasks, setUserTasks] = useState([
    "Wash the dishes",
    "Clean the room",
    "Go to the Gym",
    "Walk the dog",
    "COokie groceries",
    "Water the plants",
    "Cook dinner2",
    "Walk the dog2",
    "Make groceries2",
    "Water the plants2",
    "Cook dinner3",
    "Walk the dog3",
    "Make groceries3",
    "Water the plants3",
    "Cook dinner4",
    "Make groceries5",
    "Water the plants5",
    "Cook dinner5",
  ]);

  return (
    <View style={styles.tasksContainer}>
      <StatusBar style="auto" />
      <View>
        <ScrollView>
          {userTasks.map((task) => (
            <Text style={styles.taskItem} key={task}>
              {" 📋 "}
              {task}{" "}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tasksContainer: {
    flex: 8,
    border: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  taskItem: {
    alignItems: "stretch",
    margin: 10,
    marginRight: 50,
    marginLeft: 50,
    padding: 18,
    width: 280,
    borderRadius: 10,
    backgroundColor: "#d6dac8",
    color: "black",
  },
});