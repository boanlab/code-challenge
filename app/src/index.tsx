import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(<QueryClientProvider client={queryClient}>
	<App /></QueryClientProvider>);
