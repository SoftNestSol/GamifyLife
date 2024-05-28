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
import { useEffect } from "react";

export default function HomeScreen() {
	const navigation = useNavigation();
	const { logout } = useAuthContext();

	return (
		<View style={styles.container}>
			<View style={styles.topHalf}>
				<View style={styles.leftQuarter}>
					{/*
          <Button
            title="Go to Register"
            onPress={() => navigation.navigate("Register")}
          />
          <Button
            title="Go to Quests"
            onPress={() => navigation.navigate("Quests")}
          />*/}
				</View>
				<View style={styles.rightQuarter}>
					<View style={styles.chest}></View>
					<View style={styles.stats}>
						<TouchableOpacity
							style={styles.logoutButton}
							onPress={logout}
						>
							<Text>Logout</Text>
						</TouchableOpacity>

						<Stats />
					</View>
				</View>
			</View>
			<View style={styles.bottomHalf}>
				<View style={styles.calendar}>
					<CalendarSlider />
				</View>
				<Text style={styles.tasksTitle}>Today's quests</Text>
				<View style={styles.tasks}>
					<TaskList scheduled={true} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	tasksTitle: {
		fontSize: 20,
		paddingBottom: 5,
		marginLeft: 115,
		marginRight: 20,
		marginBottom: 14,
		fontWeight: "600"
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
		flex: 2
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
