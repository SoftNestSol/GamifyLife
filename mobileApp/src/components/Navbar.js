import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";
export default function Navbar() {
  const navigation = useNavigation();
  const { Image } = require("react-native");

  const homeIcon = require("../../assets/icons8-home-100.png");
  const journeyIcon = require("../../assets/icons8-map-64.png");
  const addIcon = require("../../assets/icons8-plus-64.png");
  const questIcon = require("../../assets/icons8-parchment-48.png");
  const friendsIcon = require("../../assets/icons8-users-100.png");

  //const xmlHome = <Image source={friendsIcon} style={{ width: 48, height: 48 }} />;
  //const xmlHome =
  //'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>2</title><g id="Layer_86" data-name="Layer 86"><path d="M55,20.19,36.68,5a7.34,7.34,0,0,0-9.36,0L9,20.19a7.31,7.31,0,0,0-2.65,5.65V53.37a7.34,7.34,0,0,0,7.33,7.33H50.33a7.34,7.34,0,0,0,7.33-7.33V25.83A7.31,7.31,0,0,0,55,20.19ZM53.67,53.37a3.34,3.34,0,0,1-3.33,3.33H13.67a3.34,3.34,0,0,1-3.33-3.33V25.83a3.32,3.32,0,0,1,1.21-2.57L29.87,8.07a3.34,3.34,0,0,1,4.26,0l18.33,15.2a3.32,3.32,0,0,1,1.21,2.57Z"></path></g></svg>';
  //   const xmlJourney =
  //     '<svg version="1.1" id="Layer_1_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"> <path d="M3.5,9h9C14.43,9,16,7.43,16,5.5S14.43,2,12.5,2H4c0-1.105-0.895-2-2-2S0,0.895,0,2c0,1.105,0.895,2,2,2c0.738,0,1.376-0.405,1.723-1H12.5C13.878,3,15,4.122,15,5.5S13.878,8,12.5,8h-9C1.57,8,0,9.57,0,11.5S1.57,15,3.5,15h8.777c0.346,0.595,0.984,1,1.723,1c1.105,0,2-0.895,2-2c0-1.105-0.895-2-2-2s-2,0.895-2,2H3.5C2.122,14,1,12.878,1,11.5S2.122,9,3.5,9z"></path></svg>';
  //   const xmlAdd =
  //     '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="438.536px" height="438.536px" viewBox="0 0 438.536 438.536" style="enable-background:new 0 0 438.536 438.536;" xml:space="preserve"><g><path d="M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225C438.532,59.576,430.49,40.204,414.41,24.123z M365.449,237.539c0,4.948-1.811,9.236-5.421,12.847c-3.621,3.614-7.905,5.428-12.854,5.428H255.82v91.358c0,4.948-1.817,9.232-5.432,12.847c-3.61,3.62-7.897,5.427-12.847,5.427h-36.543c-4.948,0-9.231-1.807-12.847-5.427c-3.617-3.614-5.426-7.898-5.426-12.847v-91.358H91.363c-4.948,0-9.229-1.813-12.847-5.428c-3.615-3.61-5.424-7.898-5.424-12.847v-36.547c0-4.948,1.809-9.231,5.424-12.847c3.617-3.617,7.898-5.426,12.847-5.426h91.363V91.36c0-4.949,1.809-9.233,5.426-12.847c3.616-3.618,7.898-5.428,12.847-5.428h36.543c4.949,0,9.236,1.81,12.847,5.428c3.614,3.614,5.432,7.898,5.432,12.847v91.36h91.354c4.948,0,9.232,1.809,12.854,5.426c3.613,3.615,5.421,7.898,5.421,12.847V237.539z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
  //   const xmlQuests =
  //     '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path d="M 15.5 5 C 11.928062 5 9 7.9280619 9 11.5 L 9 34 L 5.5 34 C 4.1364058 34 3 35.136406 3 36.5 L 3 38.5 C 3 40.967501 5.0324991 43 7.5 43 L 34.5 43 C 36.967501 43 39 40.967501 39 38.5 L 39 14 L 42.5 14 C 43.863594 14 45 12.863594 45 11.5 L 45 9.5 C 45 7.1132596 43.09387 5.1504737 40.736328 5.0234375 A 1.50015 1.50015 0 0 0 40.5 5 L 15.5 5 z M 15.5 8 L 36.306641 8 C 36.134564 8.4744795 36 8.9694092 36 9.5 L 36 12.253906 A 1.50015 1.50015 0 0 0 36 12.740234 L 36 38.5 C 36 39.346499 35.346499 40 34.5 40 C 33.653501 40 33 39.346499 33 38.5 L 33 36.5 C 33 35.136406 31.863594 34 30.5 34 L 12 34 L 12 11.5 C 12 9.5499381 13.549938 8 15.5 8 z M 40.5 8 C 41.346499 8 42 8.6535009 42 9.5 L 42 11 L 39 11 L 39 9.5 C 39 8.6535009 39.653501 8 40.5 8 z M 17.5 13 A 1.50015 1.50015 0 1 0 17.5 16 L 30.5 16 A 1.50015 1.50015 0 1 0 30.5 13 L 17.5 13 z M 17.5 20 A 1.50015 1.50015 0 1 0 17.5 23 L 30.5 23 A 1.50015 1.50015 0 1 0 30.5 20 L 17.5 20 z M 17.5 27 A 1.50015 1.50015 0 1 0 17.5 30 L 28.5 30 A 1.50015 1.50015 0 1 0 28.5 27 L 17.5 27 z M 6 37 L 10.253906 37 A 1.50015 1.50015 0 0 0 10.740234 37 L 30 37 L 30 38.5 C 30 39.030591 30.134564 39.52552 30.306641 40 L 7.5 40 C 6.6535009 40 6 39.346499 6 38.5 L 6 37 z"/></svg>';
  //   const xmlFriends =
  //     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>2</title><g id="Layer_27" data-name="Layer 27"><path d="M62,41.42A20,20,0,0,0,50,23.08,10.24,10.24,0,1,0,34.7,9.78a10.72,10.72,0,0,0-5.4,0A10.24,10.24,0,1,0,14,23.08,20,20,0,0,0,2,41.42c0,3.74,3.35,6.52,9.48,7.94.07,2.27,1.39,5.33,7.09,7.43a40.28,40.28,0,0,0,13.42,2c9.37,0,20.28-2.49,20.5-9.46C58.63,48,62,45.16,62,41.42ZM43.25,9.17a6.25,6.25,0,0,1,0,12.5l-.21,0c0-.37.06-.74.06-1.11a11.1,11.1,0,0,0-4.7-9.06A6.25,6.25,0,0,1,43.25,9.17ZM39.1,20.54A7.11,7.11,0,0,1,25.47,23.4a2,2,0,0,0-.16-.41l-.06-.17c0-.06,0-.13,0-.19s0-.08-.06-.12a7.08,7.08,0,0,1,3.93-8.45l.06,0,.1-.06a7.11,7.11,0,0,1,9.86,6.56ZM14.5,15.42a6.25,6.25,0,0,1,11.09-3.95,11.1,11.1,0,0,0-4.72,9.07c0,.38,0,.75.06,1.11h-.18A6.26,6.26,0,0,1,14.5,15.42ZM6,41.42C6,33,12.89,25.67,20.75,25.67c.47,0,.95,0,1.42.07a11.18,11.18,0,0,0,2.68,3.31,21.78,21.78,0,0,0-13,16.27C8.23,44.4,6,42.94,6,41.42ZM32,54.83c-9.1,0-16.51-2.54-16.51-5.67,0-.34,0-.68.05-1v0a2,2,0,0,0,0-.51c.81-8.65,8.13-15.93,16.43-15.93,8.79,0,16.51,8.18,16.51,17.51C48.49,52.29,41.09,54.83,32,54.83Zm20.16-9.49a21.78,21.78,0,0,0-13-16.28,11.18,11.18,0,0,0,2.68-3.31c.49,0,1-.08,1.46-.08C51.11,25.67,58,33,58,41.42,58,42.95,55.76,44.41,52.14,45.34Z"></path></g></svg>';
  return (
    <View style={style.container}>
      <View style={style.topBorderedView}></View>
      <View style={style.content}>
        <TouchableOpacity
          style={style.home}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={homeIcon} style={{ width: 53, height: 55 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.journey}
          onPress={() => navigation.navigate("Journey")}
        >
          <Image source={journeyIcon} style={{ width: 42, height: 42 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.add}
          onPress={() => navigation.navigate("TasksMenu1")}
        >
          <Image source={addIcon} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.quests}
          onPress={() => navigation.navigate("Quests")}
        >
          <Image source={questIcon} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.friends}
          onPress={() => navigation.navigate("Friends")}
        >
          <Image source={friendsIcon} style={{ width: 53, height: 53 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
0;
const style = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "column",
    // justifyContent:'center',
    alignContent: "space-around",
    backgroundColor: "#FFFFFF40",
    borderRadius: 20,
  },
  content: {
    flexDirection: "row",
    top: "2%",
  },
  topBorderedView: {
    borderRadius: 10,
    width: "10%",
    backgroundColor: "#fff",
    // Apply border only to the top
    borderTopWidth: 0.0, // Width of the top border
    borderTopColor: "#000", // Color of the top border
  },
  home: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  journey: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  quests: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  friends: {
    width: "20%",
    // backgroundColor:'blue',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
