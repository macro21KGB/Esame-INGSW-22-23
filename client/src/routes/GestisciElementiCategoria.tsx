import { useQuery } from "react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { Elemento } from "../entities/menu";

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

const DashboardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;

`;

const ListaElementi = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
`;

export default function GestisciElementiCategoriaRoute() {
	const { id: idCategoria } = useParams();
	const controller = Controller.getInstance();

	const query = useQuery(["categoria", idCategoria], () => {
		if (idCategoria === undefined) {
			toast.error("ID non valido");
			return;
		}
		const parsedInt = parseInt(idCategoria);
		if (isNaN(parsedInt)) {
			toast.error("ID non valido");
			return;
		}

		return controller.getCategoria(parsedInt);
	});
    
	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarAll(() => {})}
			<WelcomePanel title="Gestione" subtitle="Categoria1" />
			{query.isLoading ? (
				<DashboardContent>
					<LoadingCircle />
				</DashboardContent>
			) : (
				<>
					<ListaElementi>
						{query.data?.elementi.map((elemento: Elemento) => (
							<SoftButton key={elemento.nome} text={elemento.nome} />
						))}
					</ListaElementi>
				</>
			)}
		</DashboardContainer>
	);
}
