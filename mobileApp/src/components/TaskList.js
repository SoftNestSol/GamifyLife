import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Task from "./Task";
import { useTasksContext } from "../contexts/tasks.context";

const todayTasks = [
	{
		id: 2,
		title: "walk the dog",
		emoji: "🐶", //  is this how we'll hold icon choices?? - should tell iordy for the db
		description: "Husk has not gone out in some time",
		type: "Task",
		// anything else? - type, some sort of date =))\
		//strenght,intelligence,blabla
		stats: [1, 3, 0, 1],
		state: "done",
		date: "22/05/2024",
		frequency: null,
		days: null
	},
	{
		id: 220,
		title: "wash the dishes",
		emoji: "🍽",
		type: "Task",
		description: "you do not want bugs, do you??",
		stats: [1, 3, 0, 1],
		state: "undone",
		date: "23/05/02024",
		frquency: null,
		days: null
	},
	{
		id: 230,
		title: "finish aa homework =)",
		emoji: "📚",
		description:
			"you said you would not put it off until the last moment this time",
		type: "Habit",
		stats: [1, 3, 0, 3],
		state: "undone",
		date: "24/05/2024",
		frequency: "Every Week",
		days: [0, 1, 0, 0, 1, 0, 0] // 0100100 - 36
	}
];

export default function TaskList({ scheduled }) {
	const [userTasks, setUserTasks] = useState(null);

	const { getTodaysTasks } = useTasksContext();

	useEffect(() => {
		getTodaysTasks().then((data) => {
			setUserTasks(data);
		});
	}, []);

	const renderItem = ({ item }) => {
		const taskDone = item.done ? "done" : "undone";

		return (
			<View style={styles.taskItem}>
				<Task
					id={item.id}
					item={item}
					title={item.title}
					state={taskDone}
				/>
			</View>
		);
	};

	return (
		<FlatList
			data={userTasks}
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
}

const styles = StyleSheet.create({
	taskItem: {
		margin: 7,
		paddingTop: 25,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 3,
		backgroundColor: "#FCF4E7",
		borderTopWidth: 2,
		border: "solid",
		borderColor: "black",
		width: "97%"
	}
});
