import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FigmaEmbed from "../components/WavyBackground";

export default function TaskCreationScreen1() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.backgr}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>New Task</Text>
          </View>
          <View style={styles.welcomeMessage}>
            <Text>Ready to conquer your tasks? Let's get started!🚀</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <View style={styles.shadow}></View>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate("NewTaskCreation")}
              >
                <Text style={styles.buttonText}>One time task</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.shadow}></View>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate("NewHabitCreation")}
              >
                <Text style={styles.buttonText}>Habit</Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.shadow}></View>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate("NewRecurrentTask")}
              >
                <Text style={styles.buttonText}>Recurrent task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
  },
  titleContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingBottom: 15,
    borderColor: "black",
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
  welcomeMessage: {
    marginVertical: 10,
    paddingHorizontal: 20,
    color: "black",
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  cardContainer: {
    alignSelf: "center",
    height: "45%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginVertical: 1,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
  backgr: {
    backgroundColor: "#e49773",
    height: "100%",
  },
  shadow: {
    position: "absolute",
    top: 10,
    right: 30,
    width: "80%",
    height: "43%",
    alignSelf: "center",
    backgroundColor: "#000",
    borderRadius: 20,
    zIndex: -1,
  },
});
