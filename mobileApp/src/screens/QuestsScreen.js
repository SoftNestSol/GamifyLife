import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import { Button,FlatList,Text ,View,ScrollView,SafeAreaView } from "react-native";

import TaskList from "../components/TaskList";
=======
import { Button, Text, View } from "react-native";

import TaskList from "../components/TaskList";
import CalendarSlider from "../components/CalendarSlider";
>>>>>>> 62dd095c2c7e9cbf098488ba6a2a0171ab0911d8
import TasksCarousel from "../components/TaskCarousel";
import  CalendarSlider from "../components/CalendarSlider";

<<<<<<< HEAD
export default function QuestsScreen() {   

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TasksCarousel style={styles.carouselContainer} />
                <CalendarSlider style={styles.calendarContainer} />
                <TaskList style={styles.taskContainer} />
            </ScrollView>
        </SafeAreaView>
    );

}
const styles = {
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    //
    carouselContainer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    }
}
=======
export default function QuestsScreen() {
	return (
		<View style={styles.container}>
			<Text>Quests Screen</Text>
			{/* <TaskList /> */}
			<TasksCarousel />
		</View>
	);
}
const styles = {
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
};
>>>>>>> 62dd095c2c7e9cbf098488ba6a2a0171ab0911d8
