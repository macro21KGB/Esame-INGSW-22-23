import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";

const AppContainer = styled.div`
display: flex;
flex-direction: column;
margin: 0;
padding: 0;

#buttons {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
}
`;

export default function DashboardRistoranteRoute(props) {
	const { id } = useParams();
	const controller = Controller.getInstance();

	const query = useQuery(["ristorante", id], () =>
		controller.getRistorante(id),
	);

	return (
		<AppContainer>
			{NavbarFactory.generateNavbarBackAndMenu()}
			<WelcomePanel title="Gestione" subtitle="Ristorante1" />
			{query.isLoading ? (
				<LoadingCircle />
			) : (
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
			)}
		</AppContainer>
	);
}
