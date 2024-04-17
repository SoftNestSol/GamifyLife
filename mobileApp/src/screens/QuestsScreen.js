import { useNavigation } from "@react-navigation/native";
import { Button,FlatList,Text ,View,ScrollView,SafeAreaView } from "react-native";

import TaskList from "../components/TaskList";
import TasksCarousel from "../components/TaskCarousel";
import  CalendarSlider from "../components/CalendarSlider";
import Card from "../components/Card";
export default function QuestsScreen() {   
    const stats =[]

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* <TasksCarousel style={styles.carouselContainer} /> */}
                {/* <CalendarSlider style={styles.calendarContainer} /> */}
                {/* <TaskList style={styles.taskContainer} /> */}
                <Card
                    title="Title of a task"
                    description="A very cool description"
                    stats={stats}
                
                
                />
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
