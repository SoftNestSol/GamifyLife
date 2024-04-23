import { StyleSheet, Text, View } from "react-native";

export default function Task({ title, emoji, state }) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.emojiWrapper}>{emoji}</Text>
          <Text>{title}</Text>
        </View>
        <Text>{state} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  emojiWrapper: {
    marginRight: 10
  },
});
