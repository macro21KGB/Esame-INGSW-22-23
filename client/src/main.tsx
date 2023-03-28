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
import GestisciMenuRoute from "./routes/GestisciCategorie";
import GestisciElementiCategoriaRoute from "./routes/GestisciElementiCategoria";
import CucinaRoute from "./routes/CucinaRoute";
import PrendiOrdinazioneRoute from "./routes/PrendiOrdinazione";
import InserimentoElementiOrdinazioneRoute from "./routes/InserimentoElementiOrdinazione";
import DashboardSupervisore from "./routes/DashboardSupervisore";
import GestisciContiRoute from "./routes/GestisciConti";

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
	{
		path: "/dashboard/:id/menu",
		element: <GestisciMenuRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id/menu/:nomeCategoria",
		element: <GestisciElementiCategoriaRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/cucina",
		element: <CucinaRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/ordinazione",
		element: <PrendiOrdinazioneRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/ordinazione/:codiceTavolo",
		element: <InserimentoElementiOrdinazioneRoute />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/supervisore",
		element: <DashboardSupervisore />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/supervisore/cassa",
		element: <GestisciContiRoute />,
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
