import { initializeApp } from "firebase/app";
import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	initializeAuth,
	getAuth,
	getReactNativePersistence
} from "firebase/auth";
import React, { createContext, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const lStorage = getReactNativePersistence(AsyncStorage);

const auth = initializeAuth(app, {
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
			return uid;
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

			return new Error(error);
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
