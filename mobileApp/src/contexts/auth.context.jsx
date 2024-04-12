import { initializeApp } from "firebase/app";
import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	initializeAuth
} from "firebase/auth";
import React, { createContext, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth";

export const AuthContext = createContext({});

const firebaseConfig = {
	apiKey: "AIzaSyAGXOzUWltIjkZ-eCILSI8hkIkpyA5f1TU",
	authDomain: "productivity-app-b9293.firebaseapp.com",
	projectId: "productivity-app-b9293",
	storageBucket: "productivity-app-b9293.appspot.com",
	messagingSenderId: "528679293327",
	appId: "1:528679293327:web:5f7faa15c20bc45040bbfa",
	measurementId: "G-4H4DGNG1KY"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
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

	const register = async (email, password) => {
		console.log(email, password);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			const uid = user.uid;
			setUser(user);
			return user;
		} catch (error) {
			console.log(error);
		}
	};

	const isLoggedIn = async () => {
		if (AsyncStorage.getItem("isLoggedIn")) {
			return true;
		} else {
			return false;
		}
	};

	const login = async (email, password) => {
		console.log(email, password);

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			const uid = user.uid;
			setUser(user);
			console.log(user);

			await AsyncStorage.setItem("user", JSON.stringify(user));
			await AsyncStorage.setItem("uid", JSON.stringify(uid));
			await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));

			return `User ${user.email} logged in successfully`;
		} catch (error) {
			console.log(error);
		}
	};

	const value = {
		user,
		setUser,
		register,
		login,
		isLoggedIn
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};