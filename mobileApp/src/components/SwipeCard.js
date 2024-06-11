import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function SwipeCard({object}) {
    if(object == undefined) 
    {
        console.log("Tried to show undefined card!");
        return (<></>)
    }
    else {
        return (
                <View style = {styles.container}>
                    <View style = {styles.shadow}/>
                    <View style = {styles.card}>
                        <View style = {styles.top}>
                            <Text style = {styles.title}> 
                                {object.suggestion.title}
                            </Text>
                        </View>
                        <View style = {styles.descriptionWrapper}>
                            <Text style = {styles.description}>
                                {object.suggestion.description}
                            </Text>
                        </View>
                    </View>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "95%",
        justifyContent: "center",
    },
    descriptionWrapper: {
        flex: 1,
        padding: "10%",
    },
    card:{ 
        position: "absolute",
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: 26,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
    },
    shadow:{
        flex: 1,
        width: "100%",
        borderRadius: 26,
        alignItems: 'center',
        backgroundColor: '#000',
        top: 1,
        left: 1,
    },
    top: {
        height: "30%",
        width: "100%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#cedefe",
        justifyContent: "center",
        paddingLeft: "10%",
    },
    title: {
        fontSize: 16,
    },
})