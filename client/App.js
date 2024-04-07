import { AuthContextProvider } from "./contexts/auth.context";
import Index from "./index";

export default function App() {
	return (
		<AuthContextProvider>
			<Index />
		</AuthContextProvider>
	);
}
