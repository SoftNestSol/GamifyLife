import { useNavigation } from "react-router-dom";
import { Button,Text ,View} from "react-native";



export default function QuestsScreen() {   

    return (
        <View style={styles.container}>
            <Text>Quests Screen</Text>
            <TaskList />
        </View>
    );



}