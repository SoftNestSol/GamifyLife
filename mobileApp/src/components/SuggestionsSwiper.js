import { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";

export default function SuggestionsSwiper() {
    const [picked, setPicked] = useState(0); // counter - we want it to be reset at midnight...
    const selectedTasks = []; // the indexes of the selected tasks

    const pickTask = (cardIndex) => {
        selectedTasks.push(cardIndex); // remember the index of the selected task
        setPicked(picked + 1); // increase the counter
    }

    //when there are no more tasks to swipe
    const swipedAll = () => {

    }

    return (
        <View style = {styles.containerExterior}>
            <View style={styles.container}>
                <Swiper
                    cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}>
                                <Text style={styles.text}>{card}</Text>
                            </View>
                        )
                    }}
                    verticalSwipe = {false}
                    onSwipedLeft = {pickTask}
                    onSwipedAll = {swipedAll}
                    backgroundColor = "transparent"
                    cardIndex = {0}
                    stackSize = {3}>
                </Swiper>
            </View>
            <View style = {styles.subtitleSection}>
                <Text style = {styles.subtitle}> Selected for today: {picked} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerExterior: {
        height: "100%",
    },
    container: {
      flex: 4,
      paddingBottom: 10,
    },
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    },
    subtitleSection: {
        flex: 1,
        alignSelf: "center",
    },
    subtitle: {
        fontSize: 20,
    }
  });