import { useNavigation } from "expo-router";

export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {/* <TaskList />
       */}
       <Button onPress={()=>navigation.navigate("Quests")} >go</Button>
    </View>
  );
}