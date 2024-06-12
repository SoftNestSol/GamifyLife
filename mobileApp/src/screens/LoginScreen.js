import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Pressable
} from "react-native";
import { useAuthContext } from "../contexts/auth.context";

export default function Login() {
	const navigation = useNavigation();

	const { login } = useAuthContext();

	const backgroundImage = "../../assets/login.png";

	const [form, setForm] = useState({
		email: "",
		password: ""
	});

	const [errorMessage, setErrorMessage] = useState("");

	const handleEmailChange = (value) => {
		setForm((prevForm) => ({
			...prevForm,
			email: value
		}));
	};

	const handlePasswordChange = (value) => {
		setForm((prevForm) => ({
			...prevForm,
			password: value
		}));
	};

	const handleSubmit = async () => {
		try {
			const loginResponse = await login(form.email, form.password);

			if (!(loginResponse instanceof Error)) {
				navigation.navigate("Home");
			} else {
				setErrorMessage("Login failed. Please check your email and password.");
			}
		} catch (error) {
			setErrorMessage("An error occurred. Please try again.");
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require(backgroundImage)}
				style={{ width: "100%", height: "100%" }}
			>
				<View style={styles.container}>
					<Text style={styles.title}>Welcome back!</Text>
					<TextInput
						style={styles.input}
						placeholder="Email"
						value={form.email}
						onChangeText={handleEmailChange}
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						secureTextEntry
						value={form.password}
						onChangeText={handlePasswordChange}
					/>
					{errorMessage ? (
						<Text style={styles.error}>{errorMessage}</Text>
					) : null}
					<TouchableOpacity
						onPress={handleSubmit}
						style={styles.touch}
					>
						<Text style={styles.button}>Login</Text>
					</TouchableOpacity>
					<View>
						<Pressable
							style={styles.registerButton}
							onPress={() => {
								navigation.navigate("Register");
							}}
						>
							<Text style={styles.registerText}>
								Don't have an account? Register now
							</Text>
						</Pressable>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	registerButton: {
		backgroundColor: "#fff",
		borderRadius: 10,
		marginTop: 20,
		padding: 10
	},
	registerText: {
		textAlign: "center",
		color: "#000"
	},

	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 1
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
		textAlign: "center",
		backgroundColor: "#fff"
	},
	touch: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 10
	},
	error: {
		color: "red",
		marginBottom: 10
	}
});
