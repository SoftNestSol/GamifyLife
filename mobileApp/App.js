import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContextProvider } from "./src/contexts/auth.context";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Navbar from "./src/components/Navbar";
//screens
import RegisterScreen from "./src/screens/RegisterScreen";
import JourneyScreen from "./src/screens/JourneyScreen";
import HomeScreen from "./src/screens/HomeScreen";
import QuestsScreen from "./src/screens/QuestsScreen";
import TasksScreen from "./src/screens/TasksScreen";
import TaskCreationScreen1 from "./src/screens/TaskCreationScreen1.js";
import NewTaskCreation from "./src/screens/NewTaskCreation.js";
import NewRecurrentTask from "./src/screens/NewRecurrentTask.js";
import NewHabitCreation from "./src/screens/NewHabitCreation.js";
import SuggestionsScreen from "./src/screens/SuggestionsScreen";
import TaskScreen from "./src/screens/TaskScreen.js";
import LoginScreen from "./src/screens/LoginScreen";

const stack = createNativeStackNavigator();
export default function App() {
	return (
		<AuthContextProvider>
			<NavigationContainer>
				<stack.Navigator>
					<stack.Screen
						name="Login"
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					{/* <stack.Screen name="Register" component={RegisterScreen} /> */}
					<stack.Screen
						name="Quests"
						component={QuestsScreen}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="Journey"
						component={JourneyScreen}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="OngoingTasks"
						component={TasksScreen}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="TasksMenu1"
						component={TaskCreationScreen1}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="NewTaskCreation"
						component={NewTaskCreation}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="NewHabitCreation"
						component={NewHabitCreation}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="NewRecurrentTask"
						component={NewRecurrentTask}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="Suggestions"
						component={SuggestionsScreen}
						options={{ headerShown: false }}
					/>
					<stack.Screen
						name="Task"
						component={TaskScreen}
						options={{ headerShown: false }}
					/>
				</stack.Navigator>
				<Navbar />
			</NavigationContainer>
		</AuthContextProvider>
	);
}
