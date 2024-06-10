import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTasksContext } from "../contexts/tasks.context";

//components
import Card from "./Card";
import Button1 from "./Button1";

export default function TasksCarousel() {
  const { getUserHabits, getUserRecurrentTasks, getTodaysTasks } =
    useTasksContext();

  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [recurrentTasks, setRecurrentTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const navigation = useNavigation();
  const [filter, setFilter] = useState("Tasks");

  useEffect(() => {
    getTodaysTasks().then((data) => {
      setTasks(data);
    });

    getUserHabits().then((data) => {
      setHabits(data);
    });

    getUserRecurrentTasks().then((data) => {
      setRecurrentTasks(data);
    });
  }, []);

  useEffect(() => {
    let allTasks = [];
    if (filter === "Tasks") {
      allTasks = tasks;
    } else if (filter === "Habits") {
      allTasks = habits;
    } else if (filter === "Recurr.") {
      allTasks = recurrentTasks;
    }
    setFilteredTasks(allTasks);
  }, [filter, tasks, habits, recurrentTasks]);

  const filterButton = (filterType) => {
    setFilter(filterType);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Card
        title={item.title}
        description={item.description}
        stats={item.stats}
        emoji={item.emoji}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ongoing</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("OngoingTasks")}
        >
          <Text style={styles.buttonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Button1
          title="Tasks"
          action={() => filterButton("Tasks")}
          pressed={filter === "Tasks"}
        />
        <Button1
          title="Recurr."
          action={() => filterButton("Recurr.")}
          pressed={filter === "Recurr."}
        />
        <Button1
          title="Habits"
          action={() => filterButton("Habits")}
          pressed={filter === "Habits"}
        />
      </View>
      <FlatList
        horizontal
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginRight: 30,
    width: "100%",
  },
  filterContainer: {
    flex: 1,
    height: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    fontSize: 1,
    opacity: 0.7,
    textDecorationLine: "underline",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  item: {
    flex: 1,
    height: 250,
    width: 400,
    marginRight: -90,
  },
  itemHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  icon: {
    width: "20%",
    marginRight: 5,
  },
  itemTitle: {
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    alignSelf: "center",
    textAlign: "center",
  },
  description: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 12,
  },
});
