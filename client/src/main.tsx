import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorPage from "./error-page";
import Login from "./routes/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardRistoranteRoute from "./routes/DashboardRistorante";
import GestisciUtenzaRoute from "./routes/GestisciUtenza";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id",
		element: <DashboardRistoranteRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id/utenze",
		element: <GestisciUtenzaRoute />,
		errorElement: <ErrorPage />,
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
