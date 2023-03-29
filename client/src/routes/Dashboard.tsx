import React, { useState } from "react";
import styled from "styled-components";
import { NavbarFactory } from "../components/NavBar";
import WelcomePanel from "../components/WelcomePanel";
import ItemRistorante from "../components/ItemRistorante";
import { Controller } from "../entities/controller";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingCircle from "../components/LoadingCircle";
import SlideUpModal from "../components/SlideUpModal";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router";
import { Ristorante } from "../entities/ristorante";
import { toast } from "react-toastify";

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
	gap: 1rem;

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

	const navigate = useNavigate();
	const utenteCorrente = useStore((state) => state.user);
	const query = useQuery(["ristoranti"], () => controller.getRistoranti());

	const saveIdRistorante = useStore((state) => state.setIdRistorante);

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

	const salvaIdRistoranteEAvanza = (id: number) => {
		saveIdRistorante(+id);
		navigate(`/dashboard/${id}`);
	};

	const handleOnChangeInformazioniRistorante = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setInformazioniRistorante({
			...informazioniRistorante,
			[event.target.name]: event.target.value,
		});
	};

	const mutation = useMutation((newResturant: Ristorante) => controller.creaRistorante(newResturant));
	const queryClient = useQueryClient();

	const aggiungiRistorante = () => {

		// check if all fields are filled
		if (informazioniRistorante.nome === "" ||
			informazioniRistorante.indirizzo === "" ||
			informazioniRistorante.telefono === "") {
			toast.warn("Compila tutti i campi");
			return;
		}


		const nuovoRistorante = new Ristorante(
			0,
			informazioniRistorante.nome,
			informazioniRistorante.indirizzo,
			informazioniRistorante.telefono,
			informazioniRistorante.sitoWeb || "",
			"",
		)

		mutation.mutate(nuovoRistorante, {
			onSuccess: () => {
				queryClient.invalidateQueries("ristoranti");
				setShowModal(false);
				resettaCampi();
			}
		});
	};

	return (
		<AppContainer>
			{NavbarFactory.generateNavbarAddAndMenu(() => setShowModal(true))}
			<WelcomePanel title="Benvenuto," subtitle={utenteCorrente?.nome || "Utente"} />
			<p id="start_list_ristoranti">I Miei Ristoranti</p>
			<ListaRistorantiContainer>
				{query.isLoading ? (
					<LoadingCircle />
				) : query.data?.length === 0 ? (
					<p id="no_resturants">Non Hai ancora creato Nessun ristorante</p>
				) : (
					query.data?.map((ristorante) => (
						<ItemRistorante
							onClick={() => salvaIdRistoranteEAvanza(ristorante.id)}
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
					<br />
					<BigButton disabled={mutation.isLoading} onClick={aggiungiRistorante} text="Crea" />
				</SlideUpModal>
			</ListaRistorantiContainer>
		</AppContainer>
	);
}

export default App;

/*

	GET utenti
	GET utente/:email
	UPDATE utente/:email
	DELETE utente/:email

	

*/