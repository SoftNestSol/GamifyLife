import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";

export default function SuggestionsCard() {
  const navigation = useNavigation();

  return (
    <View style = {styles.container}>
      <View style = {styles.title}>
        <Text style = {styles.titleText}> Suggestions of the day </Text>
      </View>
      <TouchableOpacity style = {styles.cardContainer}
        activeOpacity = {0.9}
        onPressOut = {() => navigation.navigate("Suggestions")}
      >
        <>
          <View style = {styles.shadow}></View>
          <View style = {styles.card}>
            <View style = {styles.cardText}>
              <Text style = {styles.text}> 
                Swipe trough all suggestions and find the perfect challenge for you 
              </Text>
            </View>
            <View style = {styles.cardIcon}>
              <Image source = {require('../../assets/swords.png')} style = {styles.icon}/>
            </View>
          </View>
        </>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginVertical: 20,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
    height: 120,
    width: "100%",
  },
  shadow: {
    top: 3,
    left: 3,
    width: "90%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "#000",
    borderRadius: 20,
  },
  card: {
    flex: 1,
    position: "absolute",
    width: "90%",
    height: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  cardText: {
    flex: 3,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  text: {
    fontSize: 15,
  },
  cardIcon: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e49773",
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});