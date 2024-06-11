import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import SwipeCard from "./SwipeCard";

const { width, height } = Dimensions.get('window');

const labels = {
  left: {
      title: "PICK",
      style: {
          label: {
              position: "relative",
              bottom: 10,
              width: width / 2,
              marginTop: height / 2,
              padding: 10,
              color: "#cedefe",
              fontSize: 24,
              textAlign: 'center',
              alignSelf: 'center',
          },
          wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginLeft: 10,
          },
      },
  },
  right: {
      title: "DISCARD",
      style: {
          label: {
              position: "relative",
              bottom: 10,
              width: width / 2,
              marginTop: height / 2,
              padding: 10,
              color: "#E49773",
              fontSize: 24,
              textAlign: "center",
              alignSelf: "center",
          },
          wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              marginRight: 10,
          },
      },
  },
}

// will get the json with the suggestions from jan
// const suggestions = [
//   {
//     interest: "fitness",
//     suggestion: {
//       title: "30-Day Fitness Challenge",
//       description:
//         "Engage in a 30-day fitness program that includes yoga, cardio, and strength training",
//     },
//   },
//   {
//     interest: "Gaming",
//     suggestion: {
//       title: "Game Design Challenge",
//       description:
//         "Create your own video game from scratch, designing the game mechanics, characters and environments",
//     },
//   },
//   {
//     interest: "Yoga",
//     suggestion: {
//       title: "Yoga Retreat Plan",
//       description:
//         "Plan a 7-day yoga retreat in a scenic location, includin daily yoga classes, meditation classes and healthy vegeterian meals",
//     },
//   },
// ];

export default function SuggestionsSwiper({suggestions}) {
    const numSuggestions = suggestions.length;
    const [picked, setPicked] = useState(0); // counter - we want it to be reset at midnight...
    // initially we have all the suggestions, but the list gets shorter as we choose tasks
    const [suggestionsList, setSuggestionsList] = useState(suggestions);
    // for each suggestions see if it was picked or not
    const [selectedTasks, setSelectedTasks] = useState([]); // the selected tasks

    const pickTask = (pickedSuggestionIndex) => {
        // we just add the card to the selected tasks and increase the counter
        setSelectedTasks([...selectedTasks, suggestionsList[pickedSuggestionIndex]]);
        setPicked(picked + 1);
    };

    const addBack = (notPickedIndex) => {
        setSuggestionsList([...suggestionsList, suggestionsList[notPickedIndex]]);
    };

  const checkLast = (index) => {
    // console.log("Checked" + index);
    // if we're at the end update suggestions
    if (firstList) {
        if (index == suggestionsList.length - 1) {
            setSuggestionsList(remainingSuggestions);
        }
        setFirstList(!firstList);
    }
    else {
        if(index == remainingSuggestions.length - 1) {
            setRemainingSuggestions(suggestionsList);
        }
        setFirstList(!firstList);
    }
  };

  const renderEmpty = () => {
    return (
        <View style={styles.messageContainer}>
            <View style={styles.top}></View>
            <View style={styles.messageWrapper}>
              <Text style={styles.message}>
                {" "} You have picked all the suggested tasks for today! {" "}
              </Text>
            </View>
        </View>
    );
  };

  return (
    <View style={styles.containerExterior}>
      <View style={styles.container}>
        {
            picked < numSuggestions &&
            <Swiper
                cards={suggestionsList}
                renderCard={(card) => {
                    return <SwipeCard object={card} />;
                }}
                onSwipedAll={renderEmpty}
                renderEmpty={renderEmpty}
                overlayLabels={labels}
                verticalSwipe={false}
                onSwipedLeft={pickTask}
                onSwipedRight={addBack}
                backgroundColor="transparent"
                cardIndex={0}
                stackSize={3}
                containerStyle={styles.containerSwiper}
                cardHorizontalMargin={50} // keeps the card slim - width seems to render odd results
                cardStyle={styles.card}
            ></Swiper>
        }
        {picked == numSuggestions && ( // when we run out of suggested tasks
          <View style={styles.messageContainer}>
            <View style={styles.top}></View>
            <View style={styles.messageWrapper}>
              <Text style={styles.message}>
                {" "} You have picked all the suggested tasks for today! {" "}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.subtitleSection}>
        <Text style={styles.subtitle}> Selected for today: {picked} </Text>
      </View>
    </View>
  );
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
    textAlign: "center",
  },
  top: {
    flex: 1,
    backgroundColor: "#cedefe",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
