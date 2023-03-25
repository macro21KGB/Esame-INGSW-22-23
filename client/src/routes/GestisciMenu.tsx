import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import ItemRistorante from "../components/ItemRistorante";
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
	align-items: center;
	padding: 1rem;

	#no_resturants {
		font-weight: 100;
		font-size: 2rem;
		text-align: center;
		font-style: italic;
	}
`;

const FileInput = styled.div`
	.file {
		opacity: 0;
		width: 0.1px;
		height: 0.1px;
		position: absolute;
	}


	label {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 50px;
		margin: 0;
		padding: 1rem;
		line-height: 0.5rem;
		border-radius: 0.5rem;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border: 1px dashed #fff;
		font-weight: bold;
		cursor: pointer;
		transition: transform .2s ease-out;
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
			{NavbarFactory.generateNavbarAddAndMenu(() => setShowModal(true))}
			<WelcomePanel title="Benvenuto," subtitle="Mario" />
			<p id="start_list_ristoranti">Il mio Menu</p>
			<ListaCategorieContainer>
				{query.isLoading ? (
					<LoadingCircle />
				) : query.data?.length === 0 ? (
					<p id="no_resturants">Non Hai ancora creato nessuna categoria</p>
				) : (
					query.data?.map((categoria) => <SoftButton text={categoria.nome} />)
				)}

				<SlideUpModal showModal={showModal} setShowModal={setShowModal}>
					<p>Nuovo Ristorante</p>
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
