import {
    View,
    StyleSheet,
    Text,
  } from "react-native";

export default function TaskCard({task}) {

    const renderWeekdays = (day, index) => {
        return(
            <Text style = {[styles.day, task.days[index] && styles.pickedDay]}> {day} </Text>
        )
    } 

    return (
        <>
            <View style = {styles.shadow}></View>
            <View style = {styles.taskDetails}>
                {
                    task.type == "Task" &&
                    <View style = {styles.sectionWrapper}>
                        <Text style = {styles.sectionTitle}>
                            Date
                        </Text>
                        <View style = {styles.sectionContentWrapper}>
                            <Text style = {styles.sectionContent}>
                                {task.date}
                            </Text>
                        </View>
                    </View>
                }
                {
                    (task.type == "Habit" || task.type == "Recurring") &&
                    <View style = {styles.row}>
                        <View style = {styles.sectionWrapper}>
                            <Text style = {styles.sectionTitle}>
                                Frequency
                            </Text>
                            <View style = {styles.sectionContentWrapper}>
                                <Text style = {styles.sectionContent}>
                                    {task.frequency}
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.sectionWrapper}>
                            <Text style = {styles.sectionTitle}>
                                Days
                            </Text>
                            <View style = {styles.daysWrapper}>
                                {renderWeekdays("M", 0)}
                                {renderWeekdays("T", 1)}
                                {renderWeekdays("W", 2)}
                                {renderWeekdays("T", 3)}
                                {renderWeekdays("F", 4)}
                                {renderWeekdays("S", 5)}
                                {renderWeekdays("S", 6)}
                            </View>
                        </View>
                    </View>
                }
                <View style = {styles.sectionWrapper}>
                    <Text style = {styles.sectionTitle}>
                        Category
                    </Text>
                    <View style = {styles.sectionContentWrapper}>
                        <Text style = {styles.sectionContent}>
                            {task.type}
                        </Text>
                    </View>
                </View>
                <View style = {styles.sectionWrapper}>
                    <Text style = {styles.sectionTitle}>
                        Description
                    </Text>
                    <View style = {styles.sectionContentWrapper}>
                        <Text style = {styles.sectionContent}>
                            {task.description}
                        </Text>
                    </View>
                </View>
                <View style = {styles.statsContainer}>
                    <Text style = {styles.sectionTitle}> Stats </Text>
                    <View style = {styles.statsWrapper}>
                        <View>
                            <View style = {styles.stat}>
                                <Text style = {styles.statName}> Fitness </Text>
                                <Text style = {styles.statValue}> +{task.stats[0]} </Text>
                            </View>
                            <View style = {styles.stat}>
                                <Text style = {styles.statName}> Intelligence </Text>
                                <Text style = {styles.statValue}> +{task.stats[1]} </Text>
                            </View>
                        </View>
                        <View> 
                            <View style = {styles.stat}>
                                <Text style = {styles.statName}> Wellness </Text>
                                <Text style = {styles.statValue}> +{task.stats[2]} </Text>
                            </View>
                            <View style = {styles.stat}>
                                <Text style = {styles.statName}> Skill </Text>
                                <Text style = {styles.statValue}> +{task.stats[3]} </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    taskDetails: {
        position: "absolute",
        height: "75%",
        width: "80%",
        alignSelf: "center",
        paddingHorizontal: "7%",
        borderWidth: 1,
        borderRadius: 24,
        borderColor: "#C7B0A0",
        backgroundColor: "#fff",
    },
    shadow: {
		top: 2,
        left: 41,
		width: "80%",
		height: "75%",
		backgroundColor: "black",
		borderRadius: 24,
	},
    row: {
        flex: 1,
        flexDirection: "row",
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
    sectionContentWrapper: {
        flex: 1,
        justifyContent: "center",
        paddingBottom: 4,
    },
    daysWrapper: {
        flex: 1,
        paddingBottom: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    day: {
        fontSize: 14,
    },
    pickedDay: {
        backgroundColor: "#cedefe",
        borderRadius: 10,
    },
    sectionContent: {
        fontSize: 14,
        paddingHorizontal: 15,
    },
    statsContainer: {
        flex: 1.5,
    },
    statsWrapper: {
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    stat: {
        flexDirection: "row",
        marginVertical: 5,
        justifyContent: "space-between",
    },
    statName: {
    },
    statValue: {
        fontWeight: "500",
    },
})