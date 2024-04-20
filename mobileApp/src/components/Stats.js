import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


// will get them from the server
const stats = [
    {
        id: 1,
        name: "health",
        level: 5,
        procent: 30,
    },
    {
        id: 2,
        name: "fitness",
        level: 3,
        procent: 50,
    },
    {
        id: 3,
        name: "intelligence",
        level: 6,
        procent: 15,
    }
]


export default function Stats() {
    
    return (
        <View style = {styles.statsContainer}>
            {stats.map((stat) => {
                return (
                    <Stat name = {stat.name} level = {stat.level} procent = {stat.procent}/>
                );
            })}
        </View>
    );
}


// a stat should get the name, the level and how much of the current level we completed (a procentage)
// (right?)
function Stat({name, level, procent}) {

    // procent formatted as needed to be passed to a css property
    const procentage = procent + "%";

    return (
        <View style = {styles.container}>
            <View style = {styles.heading}>
                <Text style = {styles.name}> {name} </Text>
                <Text style = {styles.level}> Lvl. {level} </Text>
            </View>
            <View style = {styles.stat}>
                <View style = {styles.shadow}></View>
                <View style = {styles.statBack}></View>
                <View style = {[styles.statFront, {width: procentage}]}></View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    statsContainer: {
        marginHorizontal: 10,
        marginVertical: 15,
        width: "70%",
        height: "65%",
    },
    // styles for just one stat
    container: {
        flex: 1,
        margin: 5,
    },
    heading: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    name: {
    },
    level: {
        alignSelf: "flex-end",
        fontSize: 10,
    },
    stat: {
        flex: 1,
        flexDirection: "row",
    },
    shadow: {
        top: 1,
        left: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#000",
        borderRadius: 10,
    },
    statBack: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    statFront: {
        position: "absolute",
        height: "100%",
        borderRadius: 10,
        backgroundColor: "#E49773",
        borderColor: "black",
        borderWidth: 1,
    },
});