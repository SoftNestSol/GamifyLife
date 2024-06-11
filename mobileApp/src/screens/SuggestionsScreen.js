import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import SuggestionsSwiper from "../components/SuggestionsSwiper";
import { useSuggestionsContext } from "../../src/contexts/suggestions.context";
import { useEffect ,useState} from "react";







export default function SuggestionsScreen() {

  const { suggestions } = useSuggestionsContext();
  console.log("Suggestions:", suggestions);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Swipe It </Text>
      </View>
      <SuggestionsSwiper 
      suggestions={suggestions}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FCF4E7",
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
});
