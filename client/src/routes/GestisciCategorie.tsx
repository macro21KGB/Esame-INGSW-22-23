import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import ItemCategoria from "../components/ItemCategoria";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
import SoftButton from "../components/SoftButton";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";

const AppContainer = styled.div`
display: flex;
flex-direction: column;
margin: 0;
padding: 0;

#start_list_ristoranti {
	color: #465375;
	font-size: 2.5rem;
	font-weight: 400;
	padding: 0.5rem;
`;

const ListaCategorieContainer = styled.div`
	display: flex;
	color: white;
	flex-direction: column;
	justify-content: stretch;
	padding: 1rem;

	#no_resturants {
		font-weight: 100;
		font-size: 2rem;
		text-align: center;
		font-style: italic;
	}
`;

export default function GestisciMenuRoute() {
	const controller = Controller.getInstance();

	const [showModal, setShowModal] = useState(false);
	const [nomeCategoria, setNomeCategoria] = useState("");

	const query = useQuery(["categorie"], () => {
		return controller.getCategorie();
	});

	// TODO aggiungere la possibilità di modificare l'ordine delle categorie
	// TODO aggiungere l'ordine delle categorie sul backend
	return (
		<AppContainer>
			{NavbarFactory.generateNavbarAll(() => setShowModal(true))}
			<WelcomePanel title="Benvenuto," subtitle="Mario" />
			<p id="start_list_ristoranti">Il mio Menu</p>
			<ListaCategorieContainer>
				{query.isLoading ? (
					<LoadingCircle />
				) : query.data?.length === 0 ? (
					<p id="no_resturants">Non Hai ancora creato nessuna categoria</p>
				) : (
					query.data?.map((categoria) => (
						<ItemCategoria
							categoria={categoria}
							onClickUp={() => {}}
							onClickDown={() => {}}
							key={categoria.nome}
						/>
					))
				)}

				<SlideUpModal
					showModal={showModal}
					setShowModal={setShowModal}
					onClose={() => setNomeCategoria("")}
				>
					<p>Nuova Categoria</p>
					<InputBox
						placeholder="Nome Categoria"
						value={nomeCategoria}
						name="nomeCategoria"
						onChange={(e) => {
							setNomeCategoria(e.target.value);
						}}
					/>

					<br />
					<BigButton onClick={() => {}} text="Crea" />
				</SlideUpModal>
			</ListaCategorieContainer>
		</AppContainer>
	);
}
