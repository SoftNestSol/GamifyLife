import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Task from "./Task";
import { useTasksContext } from "../contexts/tasks.context";

export default function TaskList({ tasks, scheduled, date }) {
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
		let dateDayOfWeek = date.getDay(); // 0 for Sunday
		if (dateDayOfWeek == 0) {
			dateDayOfWeek = 6;
		}
		else {
			dateDayOfWeek -= 1;
		}
		// if by any chance the days_per_week or week_interval is null
		if(task.days_per_week === null || task.week_interval === null) {
			return false;
		}
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
		// lastly, if we have a reccurent task and it's after it's due date, no need to
		// take it into consideration anymore
		if (task.type === "recurring" && task.due_date < date) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		// filter the tasks by date if necessary
		if (date !== undefined && tasks !== undefined) {
			const data = tasks.filter((task) => (
				task.type === "daily" 
					// if we have a task 
					? checkEqualDates(new Date(task.created_at), new Date(date))
					// if we have a reccuring task / habit we have to see if it must be done on date 
					: checkMatchingDates(task, new Date(date))
			));
			setUserTasks(data);
		}
		else {
			getTodaysTasks().then((data) => { setUserTasks(data); });
		}
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
					showCheckbox={true}
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
