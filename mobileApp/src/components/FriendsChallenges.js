import {View, Text, StyleSheet, FlatList} from "react-native";

import FriendCard from "./FriendCard";

// i'll consider them filtered from now
// i'm guessing they will be retrieved from a separate table or 
// we'll have to check just a bool or something (if a task is from a friend or not)
const friendsChallenges = [
    {
        id: 2,
        title: "do 100 push-ups",
        iconId: 3, //  is this how we'll hold icon choices?? - should tell iordy for the db
        description: "you can bail anytime =P",
        type: "Tasks",
        // anything else? - type, some sort of date =))\
        //strenght,intelligence,blabla
        stats: [3, 0, 0],
        friendId: 222,  // "Radu" =)
        friend: "Radu", // would get it from the db
      },
      {
        id: 23,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210, // "Ioana" =)
        friend: "Ioana",
      },
      {
        id: 24,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210, // "Ioana" =)
        friend: "Maria",
      },
      {
        id: 25,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210, // "Ioana" =)
        friend: "Iordy",
      },
      {
        id: 26,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210, // "Ioana" =)
        friend: "Elena",
      },
      {
        id: 27,
        title: "read \"Jane Eyre\" with me",
        iconId: 5,
        type: "Tasks",
        description: "buddy reading",
        stats: [0, 3, 0],
        friendId: 210, // "Ioana" =)
        friend: "Ana",
      },
];

export default function FriendsChallenges() {

    function renderItem({item}) {
        return(
            <View style = {styles.item}>
                <FriendCard 
                    title = {item.title}
                    description = {item.description}
                    stats = {item.stats}
                    friend = {item.friend}
                />
            </View>
        );
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.title}>
                <Text style = {styles.titleText}> Friends' Challenges </Text>
            </View>
            <FlatList
                horizontal
                data = {friendsChallenges}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id}
                showsHorizontalScrollIndicator = {false} 
                style = {styles.cards}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
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
    cards: {
        flex: 3,
        paddingLeft: 15,
    },
    item: {
        flex: 1,
        marginRight: 15,
    }
});