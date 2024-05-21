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
    date: null,
  },
  {
    id: 220,
    title: "wash the dishes",
    emoji: "🍽",
    type: "Tasks",
    description: "you do not want bugs, do you??",
    stats: [1, 3, 0],
    state: "undone",
    date: null,
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
    date: null,
  },
];

export default function TaskList({ scheduled }) {
  const [userTasks, setUserTasks] = useState(todayTasks);

  const filterByDate = scheduled
    ? todayTasks.filter((task) => task.date != null)
    : todayTasks.filter((task) => task.date == null);

  const getTasks = async () => {
    const resp = await axios
      .get("http://192.168.8.100:3000/user/tasks/8")
      .then((response) => {
        setUserTasks(response.data);
      });
  };

  console.log(userTasks);

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.taskItem}>
          <Task item={item} emoji={item.emoji} title={item.title} state={item.state}></Task>
        </View>
      </View>
    );
  };
  return <FlatList data={filterByDate} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tasksContainer: {
    border: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  taskItem: {
    alignItems: "stretch",
    margin: 7,
    paddingTop: 25,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 3,
    backgroundColor: "#FCF4E7",
    borderTopWidth: 2,
    border: "solid",
    borderColor: "black",
    width: "97%",
  },
});
