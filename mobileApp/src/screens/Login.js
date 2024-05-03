
import {useState, useEffect} from 'react';
import {Pressable, Text} from 'react-native';
import {useAuthContext} from '../contexts/auth.context';
import { TextInput } from 'react-native';
import { View } from 'react-native';

export default function LoginScreen() {


const handleEmailInputChange = (name, value) => {
        setEmail(value);
}

const handlePasswordInputChange = (name, value) => {
        setPassword(value);
}





const handleLogin = async () => {

    console.log(email, password);
    try {
        await login(email, password);
    } catch (error) {
        console.error("Login failed:", error);
    }
};


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login, user} = useAuthContext();

    return (
        <View style = {styles.container}>
            <Text>Login</Text>
            <TextInput
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChangeText={(text) => handleEmailInputChange("email", text)}
            />
            <TextInput
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChangeText={(text) => handlePasswordInputChange("password", text)}
            />
            <Pressable
            style={styles.input}
            onPress = {() => {
                console.log(email, password);
                handleLogin();
            
         }}
            >
                <Text>Login</Text>
            </Pressable>
           <Text> 
            {user ? `Logged in as ${user.email}` : "Not logged in"}
           </Text>
        </View>
    );
}


styles = {
    container: {
        flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
    },
    input : {
        height: 40,
		width: 200,
		margin: 12,
		borderWidth: 1,
		padding: 10,
        backgroundColor: "white"
    },

    button : {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
    }


};