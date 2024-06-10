import { StyleSheet, View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";
import { TouchableOpacity } from "react-native";

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
			emoji: titleEmoji
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
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						title="Submit"
						onPress={handleSubmit}
					>
						<Text>Submit</Text>
					</TouchableOpacity>
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
	titleContainer: {
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
	},
	buttonContainer: {
		marginTop: 20,
		alignItems: "center"
	}
});
