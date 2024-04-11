import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

// will be replaced by the ongoing tasks
const DATA = [
	{
		id: 2,
		title: "walk the dog",
		iconId: 3, //  is this how we'll hold icon choices?? - should tell iordy for the db
		description: "Husk has not gone out in some time"
		// anything else? - type, some sort of date =))
	},
	{
		id: 220,
		title: "wash the dishes",
		iconId: 5, //  is this how we'll hold icon choices?? - should tell iordy for the db
		description: "you do not want bugs, do you??"
	},
	{
		id: 230,
		title: "finish aa homework =)",
		iconId: 1, //  is this how we'll hold icon choices?? - should tell iordy for the db
		description:
			"you said you would not put it off until the last moment this time"
	}
];

export default function TasksCarousel() {
	// the items
	// !! - the title of a task might not fit
	// a description as well... put some input limits??
	const renderItem = ({ item }) => {
		return (
			<View style={styles.item}>
				<View style={styles.itemHeader}>
					<Image
						resizeMode="contain"
						style={styles.icon}
						source={{
							uri: "https://cdn-icons-png.freepik.com/512/2632/2632839.png"
						}}
					/>
					<Text style={styles.itemTitle}>{item.title}</Text>
				</View>
				<View style={styles.description}>
					<Text style={styles.itemDesctiption}>{item.description}</Text>
				</View>
			</View>
		);
	};

	// the list
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Ongoing Tasks</Text>
				<Text style={styles.button}>See all tasks</Text>
			</View>

			<FlatList
				horizontal
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
			></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 45,
		marginBottom: 15,
		marginHorizontal: 12,
		height: "50%",
		width: "100%"
	},
	header: {
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		color: "#9CAFAA",
		fontSize: 23,
		fontWeight: "bold"
	},
	button: {
		fontSize: 14,
		color: "#9CAFAA"
	},
	item: {
		backgroundColor: "#9CAFAA",
		padding: 10,
		width: 250,
		flex: 1,
		borderRadius: 20,
		marginRight: 30
	},
	itemHeader: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: 5
	},
	icon: {
		width: "20%",
		marginRight: 10
	},
	itemTitle: {
		fontSize: 20,
		flex: 1,
		flexWrap: "wrap",
		alignSelf: "center",
		textAlign: "center"
	},
	description: {
		flex: 1
	},
	itemDesctiption: {
		fontSize: 12
	}
});
