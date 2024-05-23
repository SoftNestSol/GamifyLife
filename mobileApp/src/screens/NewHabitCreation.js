import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewHabitCreation() {
  const [title, setTitle] = React.useState("");
  const [titleEmoji, setTitleEmoji] = React.useState("");

  const [frequency, setFrequency] = React.useState("");
  const [days, setDays] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [wellness, setWellness] = React.useState("");
  const [intelligence, setIntelligence] = React.useState("");
  const [skill, setSkill] = React.useState("");
  const [fitness, setFitness] = React.useState("");

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
        style={[styles.day, days[index] && styles.pickedDay]}
        onPress={() => selectWeekday(index)}
      >
        {" "}
        {day}{" "}
      </Text>
    );
  };

  return (
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
          <View style={styles.multipleInputWrapper}>
            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Frequency</Text>
              <View style={styles.sectionContentWrapper}>
                <TextInput
                  style={styles.sectionContent}
                  onChangeText={setFrequency}
                  value={frequency}
                  placeholder="Frequency: "
                />
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Days</Text>
              <View style={styles.sectionContentWrapper}>
                <View style={styles.daysWrapper}>
                  {renderWeekdays("M", 0)}
                  {renderWeekdays("T", 1)}
                  {renderWeekdays("W", 2)}
                  {renderWeekdays("T", 3)}
                  {renderWeekdays("F", 4)}
                  {renderWeekdays("S", 5)}
                  {renderWeekdays("S", 6)}
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
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setFitness}
                    value={fitness}
                  />
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statName}> Intelligence </Text>
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setIntelligence}
                    value={intelligence}
                  />
                </View>
              </View>
              <View>
                <View style={styles.stat}>
                  <Text style={styles.statName}> Wellness </Text>
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setWellness}
                    value={wellness}
                  />
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statName}> Skill </Text>
                  <TextInput
                    style={styles.sectionContent}
                    onChangeText={setSkill}
                    value={skill}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    height: "70%",
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
    paddingBottom: 4,
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
});
