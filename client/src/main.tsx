import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorPage from "./error-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingCircle from "./components/LoadingCircle";
import { getTokenDaCookie, extractJWTTokenPayload, getDefaultHomePageForUserOfType } from "./utils/functions";

const Login = lazy(() => import("./routes/Login"));
const App = lazy(() => import("./routes/Dashboard"));
const DashboardRistoranteRoute = lazy(() => import("./routes/DashboardRistorante"));
const GestisciUtenzaRoute = lazy(() => import("./routes/GestisciUtenza"));
const GestisciMenuRoute = lazy(() => import("./routes/GestisciCategorie"));
const GestisciElementiCategoriaRoute = lazy(() => import("./routes/GestisciElementiCategoria"));
const CucinaRoute = lazy(() => import("./routes/CucinaRoute"));
const PrendiOrdinazioneRoute = lazy(() => import("./routes/PrendiOrdinazione"));
const InserimentoElementiOrdinazioneRoute = lazy(() => import("./routes/InserimentoElementiOrdinazione"));
const DashboardSupervisore = lazy(() => import("./routes/DashboardSupervisore"));
const GestisciContiRoute = lazy(() => import("./routes/GestisciConti"));
const StatisticheRoute = lazy(() => import("./routes/Statistiche"));

export const router = createBrowserRouter([
	{
		path: "/",
		loader: () => {
			const token = getTokenDaCookie();
			if (token) {
				const extractedPaylod = extractJWTTokenPayload(token);
				const defaultHomePage = getDefaultHomePageForUserOfType(
					{
						ruolo: extractedPaylod.ruolo,
						supervisore: extractedPaylod.supervisore
					}
				);
				return redirect(defaultHomePage);
			}
			return null;
		},
		element:
			<Suspense fallback={<LoadingCircle />}>
				<Login />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},

	{
		path: "/dashboard",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<App />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<DashboardRistoranteRoute />
			</Suspense>
		,

		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id/utenze",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<GestisciUtenzaRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id/menu",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<GestisciMenuRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id/menu/:idCategoria",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<GestisciElementiCategoriaRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/cucina",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<CucinaRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/ordinazione",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<PrendiOrdinazioneRoute />,
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/ordinazione/:codiceTavolo",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<InserimentoElementiOrdinazioneRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/supervisore/cassa",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<GestisciContiRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/supervisore",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<DashboardSupervisore />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard/:id/statistiche",
		element:
			<Suspense fallback={<LoadingCircle />}>
				<StatisticheRoute />
			</Suspense>
		,
		errorElement: <ErrorPage />,
	}

]);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
