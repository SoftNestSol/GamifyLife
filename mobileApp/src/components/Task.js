import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";

export default function Task({ title, emoji, state }) {
  const [isSelected, setSelection] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.emojiWrapper}>{emoji}</Text>
          <Text>{title}</Text>
        </View>
        <View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              color={"black"}
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
          </View>
        </View>
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
    marginRight: 10,
  },

  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    borderRadius: 4,
  },
  label: {
    margin: 8,
  },
  // shadow: {
  //   top: 1,
  //   left: 4,
  //   width: "10%",
  //   height: "100%",
  //   backgroundColor: "black",
  //   borderRadius: 8,
  // },
});
