import { useNavigation } from "@react-navigation/native";
import { Button,FlatList,Text ,View,ScrollView,SafeAreaView } from "react-native";

import TaskList from "../components/TaskList";
import TasksCarousel from "../components/TaskCarousel";
import Card from "../components/Card";
import SuggestionsCard from "../components/SuggestionsCard";
export default function QuestsScreen() {   
    const stats =[]

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TasksCarousel style={styles.carouselContainer} />
                {/* <TaskList style={styles.taskContainer} /> 
                <Card
                    title="Title of a task"
                    description="A very cool description"
                    stats={stats}
                />*/}
                <SuggestionsCard/>
            </ScrollView>
        </SafeAreaView>
    );

}
const styles = {
    container: {
        flex: 1,
        backgroundColor:"#FCF4E7"
    },
    //
    carouselContainer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    }
}
