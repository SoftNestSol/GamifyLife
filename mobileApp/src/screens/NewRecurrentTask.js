import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	ScrollView
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
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState(new Date());
	const [type, setType] = useState("recurrent");

	const { user } = useAuthContext();

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || dueDate;
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
		<ScrollView>
			<SafeAreaView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>New Recurrent Task</Text>
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
						<View style={styles.sectionContentWrapper}>
							<Text style={styles.sectionTitle}>Select the due date</Text>
							<TouchableOpacity onPress={() => showMode("date")}>
								<Text style={styles.sectionContent}>
									{dueDate.toDateString()} {dueDate.toLocaleTimeString()}
								</Text>
							</TouchableOpacity>
							{show && (
								<DateTimePicker
									testID="dateTimePicker"
									value={dueDate}
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
										<Text style={styles.IncContainer}> Intelligence </Text>
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
											<View>
												<Text style={styles.statName}> Wellness </Text>
											</View>
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
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	submitButtonWrapper: {
		marginTop: 40,
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
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
		alignItems: "center"
	},

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
		justifyContent: "center",
		height: 700
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
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center"
	},
	statName: {
		flexDirection: "row"
	},
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
