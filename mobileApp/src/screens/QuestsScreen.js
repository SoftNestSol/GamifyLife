import { useNavigation } from "@react-navigation/native";
import { Button,Text ,View} from "react-native";

import TaskList from "../components/TaskList";
import CalendarSlider from "../components/caldendarSlider";
import TasksCarousel from "../components/TaskCarousel";

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
        alignItems: "center",
    },
};