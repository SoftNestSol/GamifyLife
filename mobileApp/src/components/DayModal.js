import { View, Text, StyleSheet, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';

import Task from './Task';

// format the date for the title of the tasks list
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
};

// checks that two Date objects have the same date (and not necessarily the same time)
const checkEqualDates = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

// check if a reccuring task / habit happens on a date
const checkMatchingDates = (task, date) => {
    var dateDayOfWeek = date.getDay(); // 0 for Sunday
    if (dateDayOfWeek == 0) {
        dateDayOfWeek = 6;
    }
    else {
        dateDayOfWeek -= 1;
    }
    // if by any chance the days_per_week or week_interval is null
    if(task.days_per_week === null || task.week_interval === null) {
        return false;
    }
    // check if it's a right day of the week
    if (task.days_per_week[dateDayOfWeek] == "0") {
        return false;
    }
    // check if the right number of weeks has passed
    const createDate = new Date(task.created_at);
    // convert the difference from miliseconds to weeks
    const weeksBetween = Math.ceil((date - createDate) / (1000 * 60 * 60 * 24 * 7)); 
    if (weeksBetween % task.week_interval > 0) {
        return false;
    }
    // lastly, if we have a reccurent task and it's after it's due date, no need to
    // take it into consideration anymore
    if (task.type === "recurring" && task.due_date < date) {
        return false;
    }
    return true;
};

export default function DayModal({ tasks, date, modalVisible, setModalVisible }) {

    const dateString = formatDate(date);
    const [finished, setFinished] = useState([]);
    const [unfinished, setUnfinished] = useState([]);
    
    useEffect(() => {
        const dateTasks = tasks.filter((task) => 
            // check the date equality depending on the task type
            (task.type === "daily" ? checkEqualDates(new Date(task.created_at), new Date(date))
                                    : checkMatchingDates(task, new Date(date))));
        const finishedTasks = dateTasks.filter((task) => task.done === true);
        const unfinishedTasks = dateTasks.filter((task) => task.done === false);
        setFinished(finishedTasks);
        setUnfinished(unfinishedTasks);
    }, []);

    return (
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.closeText}> X </Text>
                    </Pressable>
                    <Text style = {styles.title}> Your journey on {dateString} </Text>
                </View>
                <ScrollView style = {styles.body}>
                    <View style = {styles.stats}>
                        <Text style = {styles.subtitle}> Progress: </Text>
                        <Text style = {styles.doneStatus}> {finished.length} / {finished.length + unfinished.length} </Text>
                    </View>
                    <View style = {styles.section}>
                        <View style = {styles.sectionTitle}>
                            <Text style = {styles.subtitle}> Finished: </Text>
                        </View>
                        <View style = {styles.list}>
                            { finished.map(item => {
                                {
                                    const taskDone = item.done ? "done" : "undone";
                                    return (
                                        <View style={styles.taskItem}>
                                            <Task
                                                id={item.id}
                                                item={item}
                                                title={item.title}
                                                state={taskDone}
                                            />
                                        </View>
                                    );
                                }
                            })}
                        </View>
                    </View>
                    <View style = {styles.section}>
                        <View style = {styles.sectionTitle}>
                            <Text style = {styles.subtitle}> Unfinished: </Text>
                        </View>
                        <View style = {styles.list}>
                            { unfinished.map(item => {
                                {
                                    const taskDone = item.done ? "done" : "undone";
                                    return (
                                        <View style={styles.taskItem}>
                                            <Task
                                                id={item.id}
                                                item={item}
                                                title={item.title}
                                                state={taskDone}
                                                showCheckbox={false}
                                            />
                                        </View>
                                    );
                                }
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "60%",
        width: "80%",
        alignSelf: "center",
        marginTop: "40%",
        backgroundColor: "#fff",
        borderRadius: 24,
        borderWidth: 1,
    },
    header: {
        paddingHorizontal: "5%",
        paddingBottom: "10%",
        backgroundColor: "#E49773",
        borderColor: "transparent",
        borderBottomColor: "#000",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        alignSelf: "center",
        textAlign: "center",
    },
    closeButton: {
        alignSelf: "flex-end",
        position: "relative",
        top: 10,
    },
    closeText: {
        fontSize: 16,
        fontWeight: '600',
    },
    body: {
        padding: "7%",
    },
    subtitle: {
        marginTop: "2%",
        fontWeight: "600",
        color: "#E49773",
    },
    doneStatus: {
        alignSelf: "center",
        fontSize: 16,
    },
    list: {
        padding: "5%",
        paddingBottom: "15%",
    },
    taskItem: {
        marginVertical: "3%",
        borderBottomWidth: 1,
        borderStyle: "dashed",
        alignItems: "center",
        paddingBottom: "5%",
    },
});