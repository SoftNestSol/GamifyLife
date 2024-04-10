import { AuthContextProvider } from "./src/contexts/auth.context";
import { NavigationContainer } from "@react-navigation/native";
import createNativeStackNavigator from "@react-navigation/native-stack";
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
					<stack.Screen name="Home" component={HomeScreen} />
					<stack.Screen name="Register" component={RegisterScreen} />
					<stack.Screen name="Quests" component={QuestsScreen} />
				</stack.Navigator>
			</NavigationContainer>
		</AuthContextProvider>
	);
}
