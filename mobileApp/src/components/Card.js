import React from 'react'
import { StyleSheet, Text, View, ScrollView ,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
export default function Card({title,description,stats}) {
  return (
    <>
    <View style={style.container}>
        <View style={style.card}>
            <View style={style.top}>
                <Text style={style.title}>{title}</Text>
            </View>
            <Text style={style.description}></Text>
        </View>
    </View>

    </>
  )

}

const style = StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    },
    card:{
    flex: 1,
    height: 70,
    marginHorizontal: 2,
    paddingTop: 4,
    borderRadius: 8,
    backgroundColor: '#fffBBB',
    flexDirection: 'column',
    alignItems: 'center',
    }


});