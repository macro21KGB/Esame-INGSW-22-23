import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorPage from "./error-page";
import Login from "./routes/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
