import { StyleSheet, Text, View, ScrollView ,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";


export default function Card({title,description,stats}) {

  return (
    <>
    <View style={style.container}>
        <View style={style.shadow}/>
        <View style={style.card}>
            <View style={style.top}>
                <Text style={style.title}>{title}</Text>
            </View>
            <View style={style.descriptionWrapper}>
            <Text style={style.description}>{description}</Text>
            </View>
        </View>
      
    </View>

    </>
  )
}

const style = StyleSheet.create({
    container:{
    // backgroundColor:"blue",
    height:240,
    padding:6,
    alignItems: "center",
    justifyContent: "center",
    },
    descriptionWrapper:{
      flex:1,
      width:'75%',
//      backgroundColor:'blue',
      padding:"10%",

    },
    title:{
      


    },
    card:{
    position: 'absolute',
    flex: 1,
    width:"75%",
    height:"100%",
    borderRadius: 26,
    borderWidth:2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    // alignItems: 'center',
    border:"3px",
    },
    shadow:{
    flex: 1,
    width:"75%",
    borderRadius:26,
    alignItems: 'center',
    backgroundColor: '#000',
    top:3,
    left:3,
    },
    top:{
      height:"25%",
      width:"100%",
      borderTopLeftRadius:24,
      borderTopRightRadius:24,
      backgroundColor:'#E49773',
      // alignItems:'center',
      paddingLeft:'10%',
      justifyContent:'center'
    },
    


});