import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/auth.context";
import {
	Button,
	View,
	StyleSheet,
	Text,
	Touchable,
	TouchableOpacity
} from "react-native";

import Stats from "../components/Stats";
import CalendarSlider from "../components/CalendarSlider";
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";
import { useTasksContext } from "../contexts/tasks.context";

export default function HomeScreen() {
	const navigation = useNavigation();
	const { logout } = useAuthContext();

	const [allTasks, setAllTasks] = useState([]);
 
	const { getAllUserTasks } = useTasksContext();

	// prepare the data so that you can send it to Month Path, which in turn sends it to 
	// each pop up
	useEffect(() => {
		getAllUserTasks().then((data) => {
			setAllTasks(data);
		})
	}, []);

	const [day, setDay] = useState(new Date()); // selected day of the calendar slider

    useEffect(() => {
        console.log(`DATE = ${day}`);
    }, [day]);

	// a function that updates the value of the selected day for the calendar slider
	// will be passed down to the calendar slider component as a prop
	const updateDay = (newDay) => {
		setDay(newDay);
	};

	// function that checks if a day is today
	// to change the title of the tasks list
	const isToday = (date) => {
		const today = new Date();
		return (
		  date.getDate() === today.getDate() &&
		  date.getMonth() === today.getMonth() &&
		  date.getFullYear() === today.getFullYear()
		);
	  };

	// format the date for the title of the tasks list
	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${day}/${month}/${year}`;
	};

	return (
		<View style={styles.container}>
			<View style={styles.topHalf}>
				<View style={styles.leftQuarter}>
				</View>
				<View style={styles.rightQuarter}>
					<View style={styles.chest}>
						{/* <TouchableOpacity
								style={styles.logoutButton}
								onPress={logout}
							>
							<Text>Logout</Text>
						</TouchableOpacity> */}
					</View>
					<View style={styles.stats}>
						<Stats />
					</View>
				</View>
			</View>
			<View style={styles.bottomHalf}>
				<View style={styles.calendar}>
					<CalendarSlider day={day} setDay={updateDay}/>
				</View>
				{ isToday(day) 
					? (<Text style={styles.tasksTitle}> Today's quests </Text>)
					: (<Text style={styles.tasksTitle}> Quests for {formatDate(day)}</Text>)
				}
				{/* we'll need the tasks list to receive the day we selected and filter only those tasks*/}
				<View style={styles.tasks}>
                    {
                        (allTasks.length === 0) 
                            ? <Text style = {{textAlign: "center"}}> Tasks are loading... </Text> 
                            : <TaskList tasks={allTasks} scheduled={true} date={day}/>
                    }
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	tasksTitle: {
		fontSize: 20,
		paddingBottom: 5,
		marginBottom: 14,
		fontWeight: "600",
		alignSelf: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#cedefe"
	},
	topHalf: {
		flex: 1,
		flexDirection: "row"
	},
	leftQuarter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	rightQuarter: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	chest: {
		flex: 2,
		justifyContent: "center", 
	},
	stats: {
		flex: 3
	},
	bottomHalf: {
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "#FCF4E7",
		borderColor: "black",
		borderWidth: 1.5
	},
	calendar: {
		flex: 1
	},
	tasks: {
		flex: 2
	},
	logoutButton: {
		marginBottom: 10,
		backgroundColor: "#f1948a",
		padding: 10,
		borderRadius: 10
	}
});
