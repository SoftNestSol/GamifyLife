import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import Card from "./Card";
import Button1 from "./Button1";

// will be replaced by the ongoing tasks
const DATA = [
  {
    id: 2,
    title: "walk the dog",
    iconId: 3, //  is this how we'll hold icon choices?? - should tell iordy for the db
    description: "Husk has not gone out in some time",
    type: "Tasks",
    // anything else? - type, some sort of date =))\
    //strenght,intelligence,blabla
    stats: [1, 3, 0],
  },
  {
    id: 220,
    title: "wash the dishes",
    iconId: 5,
    type: "Tasks",
    description: "you do not want bugs, do you??",
    stats: [1, 3, 0],
  },
  {
    id: 230,
    title: "finish aa homework =)",
    iconId: 1,
    description:
      "you said you would not put it off until the last moment this time",
    type: "Habits",
    stats: [1, 3, 0],
  },
];

export default function TasksCarousel() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("Tasks");
  const [filteredTasks, setFilteredTasks] = useState(DATA);
  useEffect(() => {
    setFilteredTasks(DATA.filter((item) => item.type == filter));
  }, [filter]);
  const filterButton = (filterType) => {
    switch (filterType) {
      case "Tasks":
        setFilter("Tasks");
        break;
      case "Recurr.":
        setFilter("Recurr.");
        break;
      case "Habits":
        setFilter("Habits");
        break;
      default:
        setFilter("");
        break;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Card
          title={item.title}
          description={item.description}
          stats={item.stats}
        ></Card>
      </View>
    );
  };

  // the list
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ongoing</Text>
        <Button
          style={styles.button}
          title="See all"
          onPress={() => navigation.navigate("OngoingTasks")}
        />
      </View>
      <View style={styles.filterContainer}>
        <Button1
          title="Tasks"
          action={() => {
            filterButton("Tasks");
          }}
          pressed={filter === "Tasks"}
        />
        <Button1
          title="Recurr."
          action={() => {
            filterButton("Recurr.");
          }}
          pressed={filter === "Recurr."}
        />
        <Button1
          title="Habits"
          action={() => {
            filterButton("Habits");
          }}
          pressed={filter === "Habits"}
        />
      </View>
      <FlatList
        horizontal
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      ></FlatList>
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
    fontSize: 14,
    opacity: 0.7,
    textDecorationLine: "underline",
  },
  item: {
    // backgroundColor: '#9BAAAA',
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
  itemDesctiption: {
    fontSize: 12,
  },
});
