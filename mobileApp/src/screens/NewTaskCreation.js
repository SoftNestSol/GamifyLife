import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";

export default function NewTaskCreation() {
	const { user } = useAuthContext();

	const [title, setTitle] = React.useState("");
	const [titleEmoji, setTitleEmoji] = React.useState("");
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(true);
	const [category, setCategory] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [wellness, setWellness] = React.useState("");
	const [intelligence, setIntelligence] = React.useState("");
	const [skill, setSkill] = React.useState("");
	const [fitness, setFitness] = React.useState("");
	const [type, setType] = React.useState("daily");
	const [createdAt, setCreatedAt] = React.useState(new Date());
	const done = 0;

	const onChange = (event, selectedDate) => {
		if (selectedDate !== undefined) {
			setCreatedAt(selectedDate);
		}
		if (Platform.OS === "android") {
			setShow(false);
		}
	};

	/*
  '${task.from_app}', 
					${task.from_buddy}, 
					'${task.type}', 
					'${task.created_at}', 
					${task.done}, 
					'${task.description}', 
					'${task.title}', 
					${id_user}, 
					'${task.category}', 
					${task.fitness}, 
					${task.skill}, 
					${task.wellness}, 
					${task.inteligence}, 
					N'${task.emoji}'
  */

	const handleSubmit = () => {
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
			fitness: fitness,
			skill: skill,
			wellness: wellness,
			inteligence: intelligence,
			emoji: titleEmoji
		};
		try {
			axios.post(`http://192.168.1.4:3000/user/add/tasks/${user.uid}`, newTask);
		} catch (err) {
			console.error(err);
		}
	};

	return (
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
							{show && (
								<DateTimePicker
									testID="dateTimePicker"
									value={createdAt}
									mode={mode}
									is24Hour={true}
									display="default"
									onChange={onChange}
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
						<Text style={styles.sectionTitle}>Stats</Text>
						<View style={styles.statsWrapper}>
							<View>
								<View style={styles.stat}>
									<Text style={styles.statName}>Fitness</Text>
									<TextInput
										style={styles.sectionContent}
										onChangeText={setFitness}
										value={fitness}
									/>
								</View>
								<View style={styles.stat}>
									<Text style={styles.statName}>Intelligence</Text>
									<TextInput
										style={styles.sectionContent}
										onChangeText={setIntelligence}
										value={intelligence}
									/>
								</View>
							</View>
							<View>
								<View style={styles.stat}>
									<Text style={styles.statName}>Wellness</Text>
									<TextInput
										style={styles.sectionContent}
										onChangeText={setWellness}
										value={wellness}
									/>
								</View>
								<View style={styles.stat}>
									<Text style={styles.statName}>Skill</Text>
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

				<View style={styles.submitButtonWrapper}>
					<Button
						title="Submit"
						onPress={handleSubmit}
					/>
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
		justifyContent: "center"
	},
	taskTitleWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		marginTop: 30
	},
	taskDetails: {
		marginTop: 20,
		width: "80%",
		alignSelf: "center",
		paddingHorizontal: "7%",
		paddingVertical: "7%",
		borderRadius: 20,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 7,
		borderRightWidth: 7,
		borderColor: "black",
		backgroundColor: "#fff"
	},
	sectionWrapper: {
		marginBottom: 10,
		borderBottomWidth: 1,
		borderColor: "black",
		borderStyle: "dashed"
	},
	taskContainer: {
		flex: 1
	},
	sectionTitle: {
		marginTop: 10,
		fontSize: 15,
		fontWeight: "200"
	},
	sectionContentWrapper: {
		justifyContent: "center",
		paddingBottom: 4
	},
	sectionContent: {
		fontSize: 14,
		paddingHorizontal: 15
	},
	sectionContentTitleEmoji: {
		fontSize: 14,
		paddingHorizontal: 15,
		marginTop: 15
	},
	statsContainer: {
		marginTop: 10
	},
	statsWrapper: {
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	stat: {
		flexDirection: "row",
		marginVertical: 5,
		justifyContent: "space-between"
	},
	statName: {},
	statValue: {
		fontWeight: "500"
	},
	title: {
		fontSize: 24,
		fontWeight: "600"
	},
	submitButtonWrapper: {
		marginTop: 20,
		alignItems: "center"
	}
});
