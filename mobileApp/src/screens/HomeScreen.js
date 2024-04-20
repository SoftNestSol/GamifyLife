import { useNavigation } from "@react-navigation/native";
import { Button, View, StyleSheet } from "react-native";

import Stats from "../components/Stats";
import CalendarSlider from "../components/CalendarSlider";
import TaskList from "../components/TaskList";

export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <View style = {styles.container}>
            <View style = {styles.topHalf}>
                <View style = {styles.leftQuarter}>
                    <Button title = "Go to Register" onPress = {() => navigation.navigate("Register")} />
                    <Button title = "Go to Quests" onPress = {() => navigation.navigate("Quests")} />
                </View>
                <View style = {styles.rightQuarter}>
                    <View style = {styles.chest}></View>
                    <View style = {styles.stats}>
                        <Stats />
                    </View>
                </View>
            </View>
            <View style = {styles.bottomHalf}>
                <CalendarSlider />
            </View>
            
        </View>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#cedefe",
    },
    topHalf: {
        flex: 1,
        flexDirection: "row",
    },
    leftQuarter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    rightQuarter: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    chest: {
        flex: 2,
    },
    stats: {
        flex: 3,
    },
    bottomHalf: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#FCF4E7",
        borderColor: "black",
        borderWidth: 1,
    }
});