import { StyleSheet, Text, View, Image, Pressable} from "react-native";
import React, { useEffect, useState } from "react";

// primeste in friend numele... nu cred ca ar fi chiar asa, probabil primesc id-ul
// si fac call si capat numele si avatarul
export default function FriendCard({title,description,stats,friend}) {
  const [extended, setExtended] = useState(false);
  
  return (
    <View style = {[extended && style.container , !extended && style.containerCircleExterior]}>
      <Pressable style = {{width: "100%", height: "100%"}} onPress = {() => setExtended(!extended)}>
        {extended &&
          <View style = {style.containerCard}>
            <View style = {style.shadow}/>
            <View style = {style.card}>
                <View style = {style.top}>
                  <View style = {style.person}>
                    <Image 
                      style = {style.avatar} 
                      resizeMode = "contain"
                      source = {require('../../assets/character.png')}
                    />
                    <Text style = {style.name}> {friend} </Text>
                  </View>
                  <Text style = {style.title}>{title}</Text>
                </View>
                <View style = {style.textArea}>
                <View style = {style.descriptionWrapper}>
                <Text style = {style.description}>{description}</Text>
                </View>
                <View style = {style.statsWrapper}>
                  <Text>+Str {stats[0]}</Text>
                  <Text>+Int {stats[1]}</Text>
                </View>
                </View>
            </View>
          </View>
        }
        {!extended &&
          <View style = {style.containerCircle}>
            <Image 
              style = {style.avatar} 
              resizeMode = "contain"
              source = {require('../../assets/character.png')}
            />
            <Text style = {style.name}> {friend} </Text>
          </View>
        }
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
      height: 240,
      width: 300,
      marginBottom: 5,
      justifyContent: "center",
    },
    containerCard: {
      width: "100%",
      height: "100%",
    },
    shadow: {
      flex: 1,
      width: "100%",
      borderRadius: 26,
      alignItems: 'center',
      backgroundColor: '#000',
      top: 3,
      left: 3,
    },
    card: {
      position: 'absolute',
      flex: 1,
      width: "100%",
      height: "100%",
      borderRadius: 26,
      borderWidth: 2,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      borderWidth: 1,
    },
    top: {
      flexDirection: "row",
      height: "33%",
      width: "100%",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: "#E49773",
      alignItems: "center",
    },
    touchable: {
      flex: 1,
      margin: 5,
    },
    person: {
      flex: 1,
      alignItems: "center",
    },
    avatar: {
      flex: 3,
    },
    name: {
      flex: 1,
      fontSize: 12,
      alignSelf: "center",
    },
    title:{
      flex: 3,
    },
    textArea:{
      flex:1,
      flexDirection:'row',
    },
    descriptionWrapper:{
      flex:1,
      width:'75%',
      padding:"10%",
    },
    statsWrapper:{
      width: "25%",
      height: 20,
      marginTop: 20,
    },
    //circle styles - the small version =))
    containerCircleExterior: {
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    containerCircle: {
      flex: 1,
      height: "100%",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 100,
      borderColor: "black",
      borderWidth: 1,
      alignItems: "center",
    },
});