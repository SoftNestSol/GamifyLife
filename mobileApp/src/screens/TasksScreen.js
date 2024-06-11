import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import TaskList from "../components/TaskList";

export default function TasksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> All Tasks </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Unscheduled</Text>
          <TaskList scheduled={false}></TaskList>
        </View>
        <View>
          <Text style={styles.subtitle}>Ongoing</Text>
          <TaskList scheduled={true}></TaskList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },

  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7",
  },

  titleContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingBottom: 15,
    borderColor: "black",
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 20,
    paddingTop: 27,
  },
});
