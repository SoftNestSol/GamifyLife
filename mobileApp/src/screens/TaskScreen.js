import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
  } from "react-native";
import TaskCard from "../components/TaskCard";
import TrashBin from "../svg-components/TrashBin";

export default function TaskScreen({route}) {
    const {taskId, task} = route.params; // we use it to make a call to the back and get the whole task

    const renderWeekdays = (day, index) => {
        return(
            <Text style = {[styles.day, task.days[index] && styles.pickedDay]}> {day} </Text>
        )
    } 

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.titleContainer}>
                {/* for alignment*/}
                <TrashBin width = "30" height = "30" fill = "none"/> 
                <Text style = {styles.title}> 
                    { (task.type === "daily") 
                        ? (<Text style = {styles.sectionContent}> Task </Text>)
                        : (task.type === "habit")
                            ? (<Text style = {styles.sectionContent}> Habit </Text>)
                            : (<Text style = {styles.sectionContent}> Recurring Task </Text>)
                    }
                </Text>
                <TrashBin width = "30" height = "30"/>
            </View>
            <View style = {styles.taskContainer}>
                <View style = {styles.taskTitleWrapper}>
                    <Text style = {styles.taskTitle}> {task.title} </Text>
                    <Text style = {styles.emoji}> {task.emoji} </Text>
                </View>
                <View style = {styles.taskDetailsContainer}>
                    <TaskCard task = {task} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor:"#FCF4E7",
    },
    titleContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
        paddingBottom: 15,
        borderColor: "black",
        borderStyle: "dashed",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
    },
    deleteButton: {
    },
    taskContainer: {
        flex: 1,
    },
    taskTitleWrapper: {
        flex: 1,
        paddingHorizontal: "10%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    taskTitle: {
        fontSize: 32,
        textAlign: "center",
    },
    emoji: {
        fontSize: 24,
    },
    taskDetailsContainer: {
        flex: 3,
    },
})