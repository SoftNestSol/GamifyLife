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

export default function TaskList({ scheduled, date }) {
	const [userTasks, setUserTasks] = useState(null);

	const { getTodaysTasks } = useTasksContext();

	// checks that two Date objects have the same date (and not necessarily the same time)
	const checkEqualDates = (date1, date2) => {
		return (
		  date1.getFullYear() === date2.getFullYear() &&
		  date1.getMonth() === date2.getMonth() &&
		  date1.getDate() === date2.getDate()
		);
	  };

	// check if a reccuring task / habit happens on a date
	const checkMatchingDates = (task, date) => {
		const dateDayOfWeek = date.getDay();
		// check if it's a right day of the week
		if (task.days_per_week[dateDayOfWeek] == "0") {
			return false;
		}
		// check if the right number of weeks has passed
		const createDate = new Date(task.created_at);
		// convert the difference from miliseconds to weeks
		const weeksBetween = Math.ceil((date - createDate) / (1000 * 60 * 60 * 24 * 7)); 
		if (weeksBetween % task.week_interval > 0) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		getTodaysTasks().then((data) => {
			// filter the tasks by date if necessary
			if (date !== undefined) {
				data = data.filter((task) => {
					// if we have a task 
					if (task.type === "daily") {
						return checkEqualDates(new Date(task.created_at), new Date(date));
					}
					// if we have a reccuring task / habit we have to see if it must be done on date 
					else {
						return checkMatchingDates(task, new Date(date));
					}
				});
			}
			setUserTasks(data);
		});
	}, [date]); // dependent on the date

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
