import {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import {useAuthContext} from '../contexts/auth.context';


export default function Login() {

    const {navigate} = useNavigation();

    const {login} = useAuthContext();

    const backgroundImage = "../../assets/login.png";
   

    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleEmailChange = (e) => {
        setForm({
            ...form,
            email: e.target.value
        });
    }

    const handlePasswordChange = (e) => {
        setForm({
            ...form,
            password: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const flag = await login(form.email, form.password);
        if (!flag)
        navigate("Home");
    else throw new Error("Login failed");
        }
        catch(error){
            console.log(error);
        }
   
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={require(backgroundImage)} style={{width: '100%', height: '100%'}}>
                <View style = {styles.container}>
            <Text style={styles.title}>Welcome back!</Text>
            <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={handleEmailChange} />
            <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={handlePasswordChange} />
            <TouchableOpacity title="Login" onPress={handleSubmit} style={styles.touch}>
                <Text style = {styles.button}>Login</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    )






}


const styles = StyleSheet.create({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: "#fff"
    },
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#fff"
    },

    button: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },

    touch: {
        backgroundColor: "#fff",
        borderRadius: 10,
       }
})

