import { useNavigation } from "expo-router";
import { Button,Text ,View} from "react-native";
export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            {/* <Button title="Go to Quests" onPress={() => navigation.navigate("Quests")} /> */}
        </View>
    );    
}