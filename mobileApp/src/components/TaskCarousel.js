import React from 'react';
import {StyleSheet,View,Text,Image,FlatList, Button,} from 'react-native';


//components
import Card from './Card';
import Button1 from './Button1';

// will be replaced by the ongoing tasks
const DATA = [
    {
        id : 2,
        title : 'walk the dog',
        iconId : 3, //  is this how we'll hold icon choices?? - should tell iordy for the db
        description : 'Husk has not gone out in some time',
        // anything else? - type, some sort of date =))\
        //strenght,intelligence,blabla
        stats:[1,3,0]
    },
    {
        id : 220,
        title : 'wash the dishes',
        iconId : 5, //  is this how we'll hold icon choices?? - should tell iordy for the db
        description : 'you do not want bugs, do you??',
        stats:[1,3,0]
    },
    {
        id : 230,
        title : 'finish aa homework =)',
        iconId : 1, //  is this how we'll hold icon choices?? - should tell iordy for the db
        description : 'you said you would not put it off until the last moment this time',
        stats:[1,3,0]
    },
]

export default function TasksCarousel() {

    const renderItem = ({item}) => {
        console.log(item)
        return (
            <View style = {styles.item}>
                <Card
                    title={item.title}
                    description={item.description}
                    stats={item.stats}
                ></Card>
            </View>
            
        );
    }

    // the list
    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.title}> 
                    Ongoing Tasks 
                </Text>
                <Text style = {styles.button}>
                    See all tasks
                </Text>
            </View>
            <View style={styles.filterContainer}>
                    <Button1
                        title='btn1'
                        action={()=>{console.log("btn1")}}
                    />
                     <Button1
                        title='btn2'
                        action={()=>{console.log("btn2")}}
                    />
                     <Button1
                        title='btn3'
                        action={()=>{console.log("btn3")}}
                    />


            </View>
            <FlatList
                horizontal
                data = {DATA}
                renderItem = {renderItem}
                keyExtractor = {item => item.id}
                showsHorizontalScrollIndicator = {false}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: 45,
        marginBottom: 15,
        marginRight: 30,
        width: '100%',
    },
    filterContainer:{
        flex:1,
        height:36,
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginBottom:20,

    },
    header: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#9CAFAA',
        fontSize: 23,
        fontWeight: 'bold',
    },
    button: {
        fontSize: 14,
        color: '#9CAFAA',
    },
    item: {
        // backgroundColor: '#9BAAAA',
        flex:1,
        height:250,
        width:400,
        marginRight:-90
    },
    itemHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    icon: {
        width: '20%',
        marginRight:5,
    },
    itemTitle: {
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        alignSelf: 'center',
        textAlign: 'center',
    },
    description: {
        flex: 1,
    },
    itemDesctiption: {
        fontSize: 12, 
    },
});