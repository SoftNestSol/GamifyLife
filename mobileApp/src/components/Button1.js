import { StyleSheet, Text, View, ScrollView ,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";

export default function Button1({title,action,pressed}) {
    
    const [btnColor,setBtnColor] = useState("#FFFFFF")
    
    useEffect(()=>{
        console.log(pressed)
        setBtnColor(pressed ? "#cedefe" : "#FFFFFF")

    },[pressed])
  return (
    <TouchableOpacity
    activeOpacity={1} 
        style = {styles.container}
        onPress={()=>{action();}}
    >
         <View style={styles.shadow}/>
        <View style={[styles.button,{backgroundColor:btnColor}]}>
            <Text style={styles.text}>{title}</Text>
        </View>
       
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        height:"100%",
        // backgroundColor:'white',
        alignItems:'center'
    },
    button:{
        position: 'absolute',
        height:"100%",
        width:"80%",
        borderRadius: 12,
        borderWidth:1.5,
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:'center'

    },
    text:{
        fontSize:20
    },
    shadow:{
        height:"100%",
        width:"80%",
        backgroundColor:"#000",
        borderRadius: 12,
        top:3,
        left:3
    },
});