import { useNavigation } from "@react-navigation/native";
import { Button,Text ,View} from "react-native";

export default function HomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
            <Button title="Go to Quests" onPress={() => navigation.navigate("Quests")} />
            <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
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