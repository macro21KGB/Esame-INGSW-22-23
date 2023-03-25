import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";

const DashboardContainer = styled.div`
display: flex;
flex-direction: column;

margin: 0;
padding: 0;

#buttons {
    display: flex;
    flex-direction: row;
	justify-content: space-evenly;
    padding: 0.5rem;
}

`;

const DashboardContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 3rem;
	padding: 0;

	`;

export default function DashboardRistoranteRoute() {
	const { id } = useParams();
	const controller = Controller.getInstance();

	const query = useQuery(["ristorante", id], () => {
		if (id === undefined) {
			toast.error("ID non valido");
			return;
		}
		const parsedInt = parseInt(id);
		if (isNaN(parsedInt)) {
			toast.error("ID non valido");
			return;
		}

		return controller.getRistorante(parsedInt);
	});

	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarBackAndMenu()}
			{query.isLoading ? (
				<DashboardContent>
					<LoadingCircle />
				</DashboardContent>
			) : (
				<>
					<WelcomePanel title="Gestione" subtitle={query.data.nome} />
					<div id="buttons">
						<Link to={`/dashboard/${id}/utenze`}>
							<SoftButton text="Gestione utenze" />
						</Link>
						<Link to={`/dashboard/${id}/menu`}>
							<SoftButton text="Gestisci menu" />
						</Link>
						<Link to={`/dashboard/${id}/statistiche`}>
							<SoftButton text="Visualizza Statistiche" />
						</Link>
					</div>
				</>
			)}
		</DashboardContainer>
	);
}
