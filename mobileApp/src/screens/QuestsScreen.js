import { View, Text, ScrollView, SafeAreaView } from "react-native";

import TasksCarousel from "../components/TasksCarousel";
import SuggestionsCard from "../components/SuggestionsCard";
import FriendsChallenges from "../components/FriendsChallenges";

export default function QuestsScreen() {   
    const stats =[]

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.title}> QuestBook </Text>
                </View>
                <TasksCarousel style = {styles.carouselContainer} />
                {/* <TaskList style={styles.taskContainer} /> 
                <Card
                    title="Title of a task"
                    description="A very cool description"
                    stats={stats}
                />*/}
                <FriendsChallenges/>
                <SuggestionsCard />
            </ScrollView>
        </SafeAreaView>
    );

}
const styles = {
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor:"#FCF4E7"
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
    carouselContainer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    }
}
