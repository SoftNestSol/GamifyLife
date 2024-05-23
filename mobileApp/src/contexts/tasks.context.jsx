import { useContext, createContext } from "react";
import { useState } from "react";
import { endEvent } from "react-native/Libraries/Performance/Systrace";

export const TasksContext = createContext({});

//refference backend api to get, delete, update and create tasks
//const api = https://europe-west1-gamifylife-810f8.cloudfunctions.net/api

export const useTasksContext = () => {
	const tasksContext = useContext(TasksContext);

	if (!tasksContext) {
		throw new Error("useTasksContext must be used within a TasksProvider");
	}
	return tasksContext;
};

export const TasksContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [tasks, setTasks] = useState([]);

	const getTasks = async () => {
		try {
			const response = await fetch(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.id}`
			);
			const data = await response.json();
			setTasks(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getUserHabits = async () => {
		try {
			const response = await fetch(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/habits/${user.id}`
			);
			const data = await response.json();
			setTasks(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getUserRecurrentTasks = async () => {
		try {
			const response = await fetch(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/reccuring/${user.id}`
			);
			const data = await response.json();
			setTasks(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const getTodaysTasks = async () => {
		try {
			const response = await fetch(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.id}/`
			);
			const data = await response.json();
			setTasks(data);
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (id) => {
		try {
			const response = await fetch(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.id}`,
				{
					method: "DELETE"
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const createTask = async (task) => {
		try {
			const response = await fetch(
				`https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/tasks/${user.id}`,
				{
					method: "POST",
					body: JSON.stringify(task),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const state = {
		user,
		setUser,
		tasks,
		setTasks,
		getTasks,
		getTodaysTasks,
		deleteTask,
		createTask
	};

	return (
		<TasksContext.Provider value={state}>{children}</TasksContext.Provider>
	);
};
