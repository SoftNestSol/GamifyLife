import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
  } from "react-native";

export default function TaskScreen({route}) {
    const {task} = route.params; 
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.titleContainer}>
                <Text style = {styles.title}> Task </Text>
            </View>
            <View style = {styles.taskContainer}>
                <View style = {styles.taskTitleWrapper}>
                    <Text style = {styles.taskTitle}> {task.title} </Text>
                </View>
                <View style = {styles.taskDetailsContainer}>
                    <View style = {styles.taskDetails}>
                        <View style = {styles.sectionWrapper}>
                            <Text style = {styles.sectionTitle}>
                                Description
                            </Text>
                            <Text style = {styles.sectionContent}>
                                {task.description}
                            </Text>
                        </View>
                        <View style = {styles.sectionWrapper}>
                            <Text style = {styles.sectionTitle}>
                                Section 2
                            </Text>
                            <Text style = {styles.sectionContent}>
                                Section 2 content
                            </Text>
                        </View>
                        <View style = {styles.sectionWrapper}>
                            <Text style = {styles.sectionTitle}>
                                Section 3
                            </Text>
                            <Text style = {styles.sectionContent}>
                                Section 3 content
                            </Text>
                        </View>
                        <View style = {styles.something}>
                            <Text style = {styles.sectionTitle}> Big Section </Text>
                        </View>
                    </View>
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
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        alignSelf: "center",
    },
    taskContainer: {
        flex: 1,
    },
    taskTitleWrapper: {
        flex: 1,
        paddingHorizontal: "10%",
        justifyContent: "center",
    },
    taskTitle: {
        fontSize: 32,
        alignSelf: "center",
        textAlign: "center",
    },
    taskDetailsContainer: {
        flex: 3,
    },
    taskDetails: {
        height: "75%",
        width: "80%",
        alignSelf: "center",
        paddingHorizontal: "7%",
        borderWidth: 1,
        borderRadius: 24,
        borderColor: "#C7B0A0",
        backgroundColor: "#fff",
    },
    sectionWrapper: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "black",
        borderStyle: "dashed",
    },
    sectionTitle: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "200",
    },
    sectionContent: {
        fontSize: 14,
        paddingHorizontal: 15,
    },
    something: {
        flex: 1.5,
    },
})