import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	Platform,
	TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";

export default function NewTaskCreation() {
	const { user } = useAuthContext();

	const [title, setTitle] = useState("");
	const [titleEmoji, setTitleEmoji] = useState("");
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [wellness, setWellness] = useState("");
	const [intelligence, setIntelligence] = useState("");
	const [skill, setSkill] = useState("");
	const [fitness, setFitness] = useState("");
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
			axios.post(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/add/tasks/${user.uid}`,
				newTask
			);
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
