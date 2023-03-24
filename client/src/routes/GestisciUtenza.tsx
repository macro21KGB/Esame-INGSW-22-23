import styled from "styled-components";
import { NavbarFactory } from "../components/NavBar";
import UtenzaItem from "../components/UtenzaItem";
import WelcomePanel from "../components/WelcomePanel";

const DashboardContainer = styled.div`
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

const ListaUtenze = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0;
	padding: 0.5rem;

	`;

export default function GestisciUtenzaRoute() {
	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarBackAndMenu()}
			<WelcomePanel title="Gestione" subtitle="Utenze" />
			<ListaUtenze>
				<UtenzaItem nome="Mario" ruolo="Addetto alla cucina" />
			</ListaUtenze>
		</DashboardContainer>
	);
}
