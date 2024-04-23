import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import Task from "./Task";

const todayTasks = [
  {
    id: 2,
    title: "walk the dog",
    emoji: "🐶", //  is this how we'll hold icon choices?? - should tell iordy for the db
    description: "Husk has not gone out in some time",
    type: "Tasks",
    // anything else? - type, some sort of date =))\
    //strenght,intelligence,blabla
    stats: [1, 3, 0],
    state: "done",
  },
  {
    id: 220,
    title: "wash the dishes",
    emoji: "🍽",
    type: "Tasks",
    description: "you do not want bugs, do you??",
    stats: [1, 3, 0],
    state: "undone",
  },
  {
    id: 230,
    title: "finish aa homework =)",
    emoji: "📚",
    description:
      "you said you would not put it off until the last moment this time",
    type: "Habits",
    stats: [1, 3, 0],
    state: "undone",
  },
];

export default function TaskList() {
  const [userTasks, setUserTasks] = useState(todayTasks);

  const getTasks = async () => {
    const resp = await axios
      .get("http://192.168.8.100:3000/user/tasks/8")
      .then((response) => {
        setUserTasks(response.data);
      });
  };
  console.log(userTasks);
  //getTasks();
  // <View style={styles.tasksContainer}>
  //   <StatusBar style="auto" />
  //   <View>
  //     <ScrollView>
  //       {userTasks.map((task) => (
  //         <Text style={styles.taskItem} key={task}>
  //           {" 📋 "}

  //           {task.title}{" "}
  //         </Text>
  //       ))}
  //     </ScrollView>
  //   </View>
  // </View>

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        <Task emoji={item.emoji} title={item.title} state={item.state}></Task>
      </View>
    );
  };
  return <FlatList data={todayTasks} renderItem={renderItem} />;
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
    margin: 7,
    marginRight: 50,
    marginLeft: 50,
    paddingTop: 25,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    width: 280,
    borderRadius: 10,
    backgroundColor: "#FCF4E7",
    borderTopWidth: 1,
    border: "solid",
    borderColor: "black",
  },
});
