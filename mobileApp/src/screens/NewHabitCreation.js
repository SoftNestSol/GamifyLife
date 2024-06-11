import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";

export default function NewHabitCreation() {
  const [title, setTitle] = React.useState("");
  const [titleEmoji, setTitleEmoji] = React.useState("");

  const { user } = useAuthContext();

	const [frequency, setFrequency] = React.useState("");
	const [days, setDays] = React.useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false
	]);

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

  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [wellness, setWellness] = React.useState("");
  const [intelligence, setIntelligence] = React.useState("");
  const [skill, setSkill] = React.useState("");
  const [fitness, setFitness] = React.useState("");
  const [type, setType] = React.useState("habit");
  const [weekInterval, setWeekInterval] = React.useState("1");

  const encodeDays = (days) => {
    return days.map((day) => (day ? "1" : "0")).join("");
  };

  const handleSubmit = async () => {
    const objectToSend = {
      from_app: 0,
      from_buddy: null,
      type: type,
      created_at: new Date(),
      done: 0,
      description: description,
      title: title,
      user_id: user.uid,
      category: category,
      days_per_week: encodeDays(days),
      week_interval: weekInterval,
      fitness: fitness,
      skill: skill,
      wellness: wellness,
      inteligence: intelligence,
      emoji: titleEmoji,
    };

    try {
      const response = await axios.post(
        `https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/add/habits/${user.uid}`,
        objectToSend
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectWeekday = (index) => {
    setDays((previousDays) => {
      const newDays = [...previousDays];
      newDays[index] = !newDays[index];
      return newDays;
    });
  };

  const renderWeekdays = (day, index) => {
    return (
      <Text
        key={index}
        style={[styles.day, days[index] && styles.pickedDay]}
        onPress={() => selectWeekday(index)}
      >
        {day}
      </Text>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Habit</Text>
        </View>

        <View style={styles.taskContainer}>
          <View style={styles.taskTitleWrapper}>
            <TextInput
              style={styles.sectionContent}
              onChangeText={setTitle}
              value={title}
              placeholder="Habit title:"
            />

            <TextInput
              style={styles.sectionContentTitleEmoji}
              onChangeText={setTitleEmoji}
              value={titleEmoji}
              placeholder="Habit emoji: "
            />
          </View>

          <View style={styles.taskDetails}>
            <View style={styles.multipleInputWrapper}>
              <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>Days</Text>
                <View style={styles.sectionContentWrapper}>
                  <View style={styles.daysWrapper}>
                    {["M ", "T ", "W ", "T ", "F ", "S ", "S "].map(
                      (day, index) => renderWeekdays(day, index)
                    )}
                  </View>
                </View>
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
                  placeholder="Description of your habit: "
                />
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Week Interval</Text>
              <View style={styles.sectionContentWrapper}>
                <TextInput
                  style={styles.sectionContent}
                  onChangeText={setWeekInterval}
                  value={weekInterval}
                  placeholder="Week Interval: "
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

                <View>
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
  submitButton: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dotted",
    height: 30,
    width: 90,
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 800,
  },
  taskTitleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30,
  },
  multipleInputWrapper: {
    flex: 1,
    flexDirection: "row",
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
  taskDetails: {
    height: "80%",
    width: "80%",
    alignSelf: "center",
    paddingHorizontal: "7%",
    paddingVertical: "7%",
    marginTop: 20,
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
    flexDirection: "row",
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
  daysWrapper: {
    flex: 1,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  day: {
    fontSize: 14,
  },
  pickedDay: {
    backgroundColor: "#cedefe",
    borderRadius: 10,
  },
  submitText: {
    color: "black",
  },
  submitButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
