import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Task from "./Task";
import { useTasksContext } from "../contexts/tasks.context";

export default function TaskList() {
	const [userTasks, setUserTasks] = useState([]);
	const { getTasks } = useTasksContext();

	useEffect(() => {
		const fetchTasks = async () => {
			const tasks = await getTasks();
			setUserTasks(tasks);
		};
		fetchTasks();
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
