import { Text, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContextProvider } from "./src/contexts/auth.context";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//screens
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import QuestsScreen from "./src/screens/QuestsScreen";


const stack = createNativeStackNavigator();
export default function App() {
	return (
		<AuthContextProvider>
			<NavigationContainer>
				<stack.Navigator>
					<stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
					<stack.Screen name="Register" component={RegisterScreen} />
					<stack.Screen name="Quests" component={QuestsScreen}options={{ headerShown: false }} />
				</stack.Navigator>
			</NavigationContainer>
		</AuthContextProvider>
	);
}
