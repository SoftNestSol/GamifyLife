import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";
import { ImageBackground } from "react-native";

export default function RegisterScreen() {
	const { register, login, user } = useAuthContext();

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		uid: ""
	});

	const background = "../../assets/register.png";

	const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async () => {
		const uid = await register(formData.email, formData.password);
		if (uid) {
			const updatedFormData = { ...formData, uid: uid };
			console.log(updatedFormData);
			try {
				const response = await axios.post(
					"https://europe-west1-gamifylife-810f8.cloudfunctions.net/api/user/register",
					updatedFormData
				);
				console.log(response.data); // Successfully posted to server
			} catch (error) {
				console.error("Error posting data to server:", error);
				throw Error("Error posting data to server, won't continue to login");
			}

			try {
				const response = await login(formData.email, formData.password);
				console.log(response);
			} catch (error) {
				console.error("Error logging in:", error);
			}
		} else {
			console.error("Registration failed");
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require(background)}
				style={styles.background}
			>
				<View style={styles.formContainer}>
					<Text style={styles.title}>Begin your journey here!</Text>

					<TextInput
						style={styles.formElement}
						placeholder="First Name"
						name="first_name"
						value={formData.first_name}
						onChangeText={(text) => handleInputChange("first_name", text)}
					/>
					<TextInput
						style={styles.formElement}
						placeholder="Last Name"
						name="last_name"
						value={formData.last_name}
						onChangeText={(text) => handleInputChange("last_name", text)}
					/>
					<TextInput
						style={styles.formElement}
						placeholder="Email"
						name="email"
						value={formData.email}
						onChangeText={(text) => handleInputChange("email", text)}
					/>
					<TextInput
						style={styles.formElement}
						placeholder="Password"
						name="password"
						value={formData.password}
						secureTextEntry={true}
						onChangeText={(text) => handleInputChange("password", text)}
					/>
					<TextInput
						style={styles.formElement}
						placeholder="Confirm Password"
						name="confirm_password"
						value={formData.confirm_password}
						secureTextEntry={true}
						onChangeText={(text) => handleInputChange("confirm_password", text)}
					/>
					<Pressable
						style={[styles.formElement, styles.button]}
						title="Submit"
						onPress={handleSubmit}
					>
						<Text>Submit</Text>
					</Pressable>

					<StatusBar style="auto" />
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	formContainer: {
		width: "80%",
		backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent white background
		padding: 20,
		borderRadius: 10,
		alignItems: "center"
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center"
	},
	formElement: {
		height: 40,
		width: "100%",
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "white"
	},
	button: {
		backgroundColor: "#87CEEB",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		fontSize: 40,
		padding: 10
	}
});
