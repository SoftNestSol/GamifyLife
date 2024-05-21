import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swiper from "react-native-deck-swiper";
import SwipeCard from "./SwipeCard";

// will get the json with the suggestions from jan
const suggestions = [
    {
        interest: "fitness",
        suggestion: {
            title: "30-Day Fitness Challenge",
            description: "Engage in a 30-day fitness program that includes yoga, cardio, and strength training",
        },
    },
    {
        interest: "Gaming",
        suggestion: {
            title: "Game Design Challenge",
            description: "Create your own video game from scratch, designing the game mechanics, characters and environments",
        },
    },
    {
        interest: "Yoga",
        suggestion: {
            title: "Yoga Retreat Plan",
            description: "Plan a 7-day yoga retreat in a scenic location, includin daily yoga classes, meditation classes and healthy vegeterian meals",
        },
    },
]

export default function SuggestionsSwiper() {
    const [picked, setPicked] = useState(0); // counter - we want it to be reset at midnight...
    // initially we have all the suggestions, but the list gets shorter as we choose tasks
    const [suggestionsList, setSuggestionsList] = useState(suggestions); 
    const [remainingSuggestions, setRemainingSuggestions] = useState(suggestionsList);
    const selectedTasks = []; // the selected tasks

    const pickTask = (pickedSuggestionIndex) => {
        const pickedSuggestion = suggestionsList[pickedSuggestionIndex]; // get the picked list
        console.log("Picked task:" + pickedSuggestion.suggestion.title);
        selectedTasks.push(pickedSuggestion); // add the selected task
        setPicked(picked + 1); // increase the counter
        // we will want to also remove the card from the cards list - from the remaining
        setRemainingSuggestions(oldRemainingSuggestions => {
            return oldRemainingSuggestions.filter(suggestion => suggestion !== pickedSuggestion);
        })
        checkLast(pickedSuggestionIndex);
    }

    const checkLast = (index) => {
        console.log("Checked" + index);
        // if we're at the end update suggestions
        if(index == suggestionsList.length - 1)
            setSuggestionsList(remainingSuggestions);
    }

    return (
        <View style = {styles.containerExterior}>
            <View style = {styles.container}>
                {suggestionsList.length > 0 &&
                    <Swiper
                        cards = {suggestionsList}
                        renderCard = {(card) => { return (<SwipeCard object = {card} />)}}
                        verticalSwipe = {false}
                        onSwipedLeft = {pickTask}
                        onSwipedRight = {checkLast}
                        infinite = {true}
                        backgroundColor = "transparent"
                        cardIndex = {0}
                        stackSize = {2}
                        containerStyle = {styles.containerSwiper}
                        cardHorizontalMargin = {50} // keeps the card slim - width seems to render odd results
                        cardStyle = {styles.card}
                        >
                    </Swiper>
                }
                { suggestionsList.length == 0 && // when we run out of suggested tasks
                    <View style = {styles.messageContainer}> 
                        <View style = {styles.top}></View>
                        <View style = {styles.messageWrapper}>
                            <Text style = {styles.message}> You have picked all the suggested tasks for today! </Text>
                        </View>
                    </View>
                }
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
    },
    containerSwiper: {
        paddingBottom: 40,
    },
    card: {
        flex: 1,
        height: "90%",
    },
    subtitleSection: {
        flex: 1,
    },
    subtitle: {
        fontSize: 20,
        alignSelf: "center",
    },
    messageContainer: {
        flex: 4,
        width: "70%", 
        marginVertical: "40%",
        marginLeft: "15%",
        borderWidth: 1,
        borderRadius: 24,
        backgroundColor: "#fff",
    },
    messageWrapper: {
        flex: 4,
        paddingTop: "15%",
        paddingHorizontal: "10%",
    },
    message: {
        fontSize: 20,
        alignSelf: "center",
    },
    top: {
        flex: 1,
        backgroundColor: "#cedefe",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
  });