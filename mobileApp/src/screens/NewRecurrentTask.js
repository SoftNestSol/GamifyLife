import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NewRecurrentTaskCreation() {
	const [title, setTitle] = useState("");
	const [titleEmoji, setTitleEmoji] = useState("");
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [weekInterval, setWeekInterval] = useState(1);

	const { user } = useAuthContext();

	const [createdAt, setCreatedAt] = useState(new Date());

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || createdAt;
		setShow(Platform.OS === "ios");
		setDueDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const [days, setDays] = useState([
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

	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState(new Date());
	const [type, setType] = useState("recurrent");

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
			due_date: dueDate,
			days_per_week: encodeDays(days),
			category: category,
			week_interval: weekInterval,
			fitness: fitnessCounter,
			skill: skillCounter,
			wellness: wellnessCounter,
			inteligence: intelligenceCounter,
			emoji: titleEmoji
		};

		try {
			console.log(objectToSend);
			const response = await axios.post(
				`http://192.168.1.4:3000/user/add/reccuring/${user.uid}`,
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
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>New Recurrent Task</Text>
			</View>

			<View style={styles.taskContainer}>
				<View style={styles.taskTitleWrapper}>
					<TextInput
						style={styles.sectionContent}
						onChangeText={(text) => setTitle(text)}
						value={title}
						placeholder="Task title:"
						placeholderTextColor="#888"
					/>

					<TextInput
						style={styles.sectionContentTitleEmoji}
						onChangeText={(emoji) => setTitleEmoji(emoji)}
						value={titleEmoji}
						placeholder="Task emoji: "
						placeholderTextColor="#888"
					/>
				</View>

				<View style={styles.taskDetails}>
					<View style={styles.multipleInputWrapper}>
						<View style={styles.sectionWrapper}>
							<Text style={styles.sectionTitle}>Frequency</Text>
						</View>
						<View style={styles.sectionWrapper}>
							<Text style={styles.sectionTitle}>Days</Text>
							<View style={styles.sectionContentWrapper}>
								<View style={styles.daysWrapper}>
									{["M", "T", "W", "T", "F", "S", "S"].map((day, index) =>
										renderWeekdays(day, index)
									)}
								</View>
							</View>
						</View>
					</View>

					<View style={styles.sectionWrapper}>
						<Text style={styles.sectionTitle}>Category</Text>
						<View style={styles.sectionContentWrapper}>
							<TextInput
								placeholder="Category"
								style={styles.sectionContent}
								value={category}
								onChangeText={(text) => setCategory(text)}
								placeholderTextColor="#888"
							/>
						</View>
					</View>

					<View style={styles.sectionWrapper}>
						<Text style={styles.sectionTitle}>Description</Text>
						<View style={styles.sectionContentWrapper}>
							<TextInput
								style={styles.sectionContent}
								onChangeText={(text) => setDescription(text)}
								value={description}
								placeholder="Description of your task: "
								placeholderTextColor="#888"
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

					<View style={styles.sectionContentWrapper}>
						<Text style={styles.sectionTitle}>Select the due date</Text>
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
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					title="Submit"
					onPress={handleSubmit}
				>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 4
	},

	IncContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
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
	multipleInputWrapper: {
		flex: 1,
		flexDirection: "row"
	},
	shadow: {
		position: "fixed",
		top: 105,
		left: -98,
		width: "80%",
		height: "70%",
		backgroundColor: "black",
		borderRadius: 24
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
		backgroundColor: "#fff"
	},
	sectionWrapper: {
		flex: 1,
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
		flex: 1,
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
		flex: 1.5
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
	daysWrapper: {
		flex: 1,
		paddingBottom: 4,
		flexDirection: "row",
		alignItems: "center"
	},
	day: {
		fontSize: 14
	},
	pickedDay: {
		backgroundColor: "#cedefe",
		borderRadius: 10
	}
});
