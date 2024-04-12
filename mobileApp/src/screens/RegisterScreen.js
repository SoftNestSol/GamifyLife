import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/auth.context";

export default function RegisterScreen() {
	const { register, login, user } = useAuthContext();

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirm_password: ""
	});

	const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async () => {
		console.log(formData);

		await register(formData.email, formData.password);
		if (user && user.uid) {
			const updatedFormData = { ...formData, uid: user.uid };
			try {
				const response = await axios.post(
					"http://172.20.10.3:3000/user/register",
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
			<Text>Sign-Up Form</Text>

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
				onChangeText={(text) => handleInputChange("password", text)}
			/>
			<TextInput
				style={styles.formElement}
				placeholder="Confirm Password"
				name="confirm_password"
				value={formData.confirm_password}
				onChangeText={(text) => handleInputChange("confirm_password", text)}
			/>
			<Pressable
				style={[
					styles.formElement,
					{ backgroundColor: "blue", color: "white" }
				]}
				title="Submit"
				onPress={handleSubmit}
			>
			</Pressable>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	formElement: {
		height: 40,
		width: 200,
		margin: 12,
		borderWidth: 1,
		padding: 10
	}
});