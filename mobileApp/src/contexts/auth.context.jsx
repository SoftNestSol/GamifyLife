import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { createContext, useContext } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

const firebaseConfig = {
	apiKey: "AIzaSyDgWzwPVeVyASwxIYTAwzba3nEH_68Ztx8",
	authDomain: "gamifylife-810f8.firebaseapp.com",
	projectId: "gamifylife-810f8",
	storageBucket: "gamifylife-810f8.appspot.com",
	messagingSenderId: "202382868927",
	appId: "1:202382868927:web:53776240f2683cb34fa10a",
	measurementId: "G-BKT0TVZ3HX"
};

const app = initializeApp(firebaseConfig);
const lStorage = getReactNativePersistence(ReactNativeAsyncStorage);
const auth = getAuth(app, {
	persistence: lStorage
});

export const useAuthContext = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return authContext;
};

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
				if (isLoggedIn) {
					const user = await AsyncStorage.getItem("user");
					setUser(JSON.parse(user));
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		checkLoginStatus();
	}, []);

	const register = async (email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			setUser(user);
			return user;
		} catch (error) {
			console.log(error);
		}
	};

	const isLoggedIn = async () => {
		if (ReactNativeAsyncStorage.getItem("isLoggedIn")) {
			return true;
		} else {
			return false;
		}
	};

	const login = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			setUser(user);

			await AsyncStorage.setItem("user", JSON.stringify(user));
			await AsyncStorage.setItem("uid", user.uid);
			await AsyncStorage.setItem("isLoggedIn", "true");

			return user;
		} catch (error) {
			console.error("Login failed:", error);
			return new Error("Login failed");
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			await AsyncStorage.removeItem("user");
			await AsyncStorage.removeItem("uid");
			await AsyncStorage.removeItem("isLoggedIn");
			setUser(null);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const value = {
		user,
		setUser,
		register,
		login,
		isLoading,
		logout
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
