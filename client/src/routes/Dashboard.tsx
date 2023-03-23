import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar, { NavbarFactory } from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import ItemRistorante from "../components/ItemRistorante";
import { Controller } from "../entities/controller";
import { useQuery } from "react-query";
import LoadingCircle from "../components/LoadingCircle";
import SlideUpModal from "../components/SlideUpModal";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import Drawer from "../components/Drawer";

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

const ListaRistorantiContainer = styled.div`
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

function App() {
	const controller = Controller.getInstance();

	const query = useQuery("ristoranti", () => controller.getRistoranti());

	const [showModal, setShowModal] = useState(false);
	const [informazioniRistorante, setInformazioniRistorante] = useState({
		nome: "",
		indirizzo: "",
		telefono: "",
		sitoWeb: "",
	});

	const resettaCampi = () => {
		setInformazioniRistorante({
			nome: "",
			indirizzo: "",
			telefono: "",
			sitoWeb: "",
		});
	};

	const handleOnChangeInformazioniRistorante = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setInformazioniRistorante({
			...informazioniRistorante,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<AppContainer>
			{NavbarFactory.generateNavbarAddAndMenu(() => setShowModal(true))}
			<WelcomePanel title="Benvenuto," subtitle="Mario" />
			<p id="start_list_ristoranti">I Miei Ristoranti</p>
			<ListaRistorantiContainer>
				{query.isLoading ? (
					<LoadingCircle />
				) : query.data.length === 0 ? (
					<p id="no_resturants">Non Hai ancora creato Nessun ristorante</p>
				) : (
					query.data.map((ristorante) => (
						<ItemRistorante
							ristorante={ristorante}
							key={ristorante.nome + ristorante.indirizzo}
						/>
					))
				)}

				<SlideUpModal
					showModal={showModal}
					setShowModal={setShowModal}
					onClose={resettaCampi}
				>
					<p>Nuovo Ristorante</p>
					<InputBox
						placeholder="Nome Ristorante"
						value={informazioniRistorante.nome}
						name="nome"
						onChange={handleOnChangeInformazioniRistorante}
					/>
					<InputBox
						placeholder="Indirizzo"
						value={informazioniRistorante.indirizzo}
						name="indirizzo"
						onChange={handleOnChangeInformazioniRistorante}
					/>
					<InputBox
						placeholder="Numero di telefono"
						type="number"
						value={informazioniRistorante.telefono}
						name="telefono"
						onChange={handleOnChangeInformazioniRistorante}
					/>
					<InputBox
						placeholder="Sito web (opzionale)"
						value={informazioniRistorante.sitoWeb}
						name="sitoWeb"
						onChange={handleOnChangeInformazioniRistorante}
					/>
					<FileInput>
						<input type="file" id="file" className="file" />
						<label htmlFor="file">
							<p>Seleziona un immagine per il tuo ristorante</p>
							<sub>(opzionale)</sub>
						</label>
					</FileInput>
					<br />
					<BigButton onClick={() => {}} text="Crea" />
				</SlideUpModal>
			</ListaRistorantiContainer>
		</AppContainer>
	);
}

export default App;
