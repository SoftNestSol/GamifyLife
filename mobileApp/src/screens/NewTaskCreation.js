import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";

export default function NewTaskCreation() {
  const { user } = useAuthContext();
  const [title, setTitle] = React.useState("");
  const [titleEmoji, setTitleEmoji] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [wellnessCounter, setWellnessCounter] = useState(1);
  const [intelligenceCounter, setIntelligenceCounter] = useState(1);
  const [skillCounter, setSkillCounter] = useState(1);
  const [fitnessCounter, setFitnessCounter] = useState(1);

  const incWellness = () => setWellnessCounter(wellnessCounter + 1);
  const decWellness = () => {
    if (wellnessCounter > 0) {
      setWellnessCounter(wellnessCounter - 1);
    }
  };
  const incIntelligence = () => setIntelligenceCounter(intelligenceCounter + 1);
  const decIntelligence = () => {
    if (intelligenceCounter > 0) {
      setIntelligenceCounter(intelligenceCounter - 1);
    }
  };

  const incSkill = () => setSkillCounter(skillCounter + 1);
  const decskill = () => {
    if (skillCounter > 0) setSkillCounter(skillCounter - 1);
  };
  const incFitness = () => setFitnessCounter(fitnessCounter + 1);
  const decFitness = () => {
    if (fitnessCounter > 0) setFitnessCounter(fitnessCounter - 1);
  };

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [type, setType] = useState("daily");
  const [createdAt, setCreatedAt] = useState(new Date());
  const done = 0;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || createdAt;
    setShow(Platform.OS === "ios");
    setCreatedAt(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSubmit = async () => {
    const newTask = {
      from_app: false,
      from_buddy: null,
      type: type,
      created_at: createdAt,
      done: done,
      description: description,
      title: title,
      user_id: user.uid,
      category: category,
      fitness: fitnessCounter,
      skill: skillCounter,
      wellness: wellnessCounter,
      inteligence: intelligenceCounter,
      emoji: titleEmoji,
    };
    try {
      const response = await axios.post(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/add/tasks/${user.uid}`,
        newTask
      );
      if (response.status !== 200) {
        alert("Error creating task");
        throw new Error("Error creating task");
      }
      alert("Task created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  return (
    <ScrollView style={styles.containerScroll}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Task</Text>
        </View>

        <View style={styles.taskContainer}>
          <View style={styles.taskTitleWrapper}>
            <TextInput
              style={styles.sectionContent}
              onChangeText={setTitle}
              value={title}
              placeholder="Task title:"
            />

            <TextInput
              style={styles.sectionContentTitleEmoji}
              onChangeText={setTitleEmoji}
              value={titleEmoji}
              placeholder="Task emoji: "
            />
          </View>

          <View style={styles.taskDetails}>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Date</Text>
              <View style={styles.sectionContentWrapper}>
                <TouchableOpacity onPress={() => showMode("date")}>
                  <Text style={styles.sectionContent}>
                    {createdAt.toDateString()} {createdAt.toLocaleTimeString()}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={createdAt}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    onTouchCancel={() => setShow(false)}
                  />
                )}
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.sectionContentWrapper}>
                <TextInput
                  style={styles.sectionContent}
                  onChangeText={setCategory}
                  value={category}
                  placeholder="Category: "
                />
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.sectionContentWrapper}>
                <TextInput
                  style={styles.sectionContent}
                  onChangeText={setDescription}
                  value={description}
                  placeholder="Description of your task: "
                />
              </View>
            </View>

            <View style={styles.statsContainer}>
              <Text style={styles.sectionTitle}> Stats </Text>
              <View style={styles.statsWrapper}>
                <View>
                  <View style={styles.stat}>
                    <Text style={styles.statName}> Fitness </Text>
                    <View style={styles.IncContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={decFitness}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.counter}>{fitnessCounter}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={incFitness}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.stat}>
                    <Text style={styles.statName}> Intelligence </Text>
                    <View style={styles.IncContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={decIntelligence}
                      >
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.counter}>{intelligenceCounter}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={incIntelligence}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.aboveSubmit}>
                  <View>
                    <View style={styles.stat}>
                      <Text style={styles.statName}> Wellness </Text>
                      <View style={styles.IncContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={decWellness}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counter}>{wellnessCounter}</Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={incWellness}
                        >
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.stat}>
                      <Text style={styles.statName}> Skill </Text>
                      <View style={styles.IncContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={decskill}
                        >
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.counter}>{skillCounter}</Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={incSkill}
                        >
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.submitButtonWrapper}>
              <TouchableOpacity
                //title="Submit"
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },

  IncContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: "#FCF4E7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  taskTitleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30,
  },
  shadow: {
    position: "fixed",
    top: 105,
    left: -98,
    width: "80%",
    height: "70%",
    backgroundColor: "black",
    borderRadius: 24,
  },
  submitButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
  },
  taskDetails: {
    top: 20,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: "7%",
    paddingVertical: "7%",
    borderRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 7,
    borderRightWidth: 7,
    borderColor: "black",
    backgroundColor: "#fff",
  },
  sectionWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
  },
  taskContainer: {
    flex: 1,
    width: "80%",
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "200",
  },
  sectionContentWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    paddingHorizontal: 15,
  },
  sectionContentTitleEmoji: {
    fontSize: 14,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  statsContainer: {
    flex: 1.5,
  },
  statsWrapper: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  statName: {},
  statValue: {
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  submitText: {
    color: "black",
  },
  submitButtonWrapper: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
