import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
import SoftButton from "../components/SoftButton";
import UtenzaItem from "../components/UtenzaItem";
import StarBadge from "../components/UtenzaItem/StarBadge";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { Ruolo, Utente } from "../entities/utente";

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
	align-items: stretch;
	margin: 0;
	padding: 0.5rem;

	#loading_container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

`;

const AssegnaRuoloSelect = styled.select`
	all: unset;
	position: relative;
	margin: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 80%;
	text-align: center;
	background-color: #1A1515;
`;

const AssegnaSupervisoreButton = styled.button<{ isSupervisore: boolean }>`
	all: unset;
	position: relative;
	margin: 0.5rem;
	border-radius: 1rem;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 80%;
	text-align: center;
	background-color: ${(props) => (props.isSupervisore ? "#1183C2" : "1A1515")};
	
`;

interface InformazioniUtente {
	nome: string;
	cognome: string;
	numeroTelefono: string;
	passwordPrimoAccesso?: string;
	ruolo: string;
	supervisore: boolean;
}

export default function GestisciUtenzaRoute() {
	const [showModal, setShowModal] = useState(false);
	const controller = Controller.getInstance();

	const [informazioniUtente, setInformazioniUtente] =
		useState<InformazioniUtente>({
			nome: "",
			cognome: "",
			numeroTelefono: "",
			passwordPrimoAccesso: "",
			ruolo: "",
			supervisore: false,
		});

	const defaultHandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInformazioniUtente({
			...informazioniUtente,
			[e.target.name]: e.target.value,
		});
	};

	const query = useQuery(["utenti"], () => {
		return controller.getUtenti();
	});

	const impostaInformazioniUtente = (utente: Utente) => {
		setInformazioniUtente({
			nome: utente.nome,
			cognome: utente.cognome,
			numeroTelefono: utente.telefono,
			ruolo: utente.ruolo,
			supervisore: false,
		});
	};

	const openModal = () => {
		setShowModal(true);
	};

	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarAll(openModal)}
			<WelcomePanel title="Gestione" subtitle="Utenze" />
			<ListaUtenze>
				{query.isLoading ? (
					<div id="loading_container">
						<LoadingCircle />
					</div>
				) : (
					query.data?.map((utente: Utente) => (
						<UtenzaItem
							key={utente.email + utente.telefono}
							utente={utente}
							onModifica={() => {
								impostaInformazioniUtente(utente);
								setShowModal(true);
							}}
						/>
					))
				)}

				{query.data?.length === 0 && <p>Non ci sono utenti</p>}
			</ListaUtenze>
			<SlideUpModal showModal={showModal} setShowModal={setShowModal}>
				<p>Nuovo Utente</p>
				<InputBox
					placeholder="Nome"
					value={informazioniUtente.nome}
					name="nome"
					onChange={defaultHandleOnChange}
				/>
				<InputBox
					placeholder="Cognome"
					value={informazioniUtente.cognome}
					name="cognome"
					onChange={defaultHandleOnChange}
				/>
				<InputBox
					placeholder="Numero di telefono"
					type="number"
					value={informazioniUtente.numeroTelefono}
					name="numeroTelefono"
					onChange={defaultHandleOnChange}
				/>
				<InputBox
					placeholder="Password di primo accesso"
					value={informazioniUtente.passwordPrimoAccesso}
					name="passwordPrimoAccesso"
					onChange={defaultHandleOnChange}
				/>
				<AssegnaRuoloSelect name="ruolo">
					<option value={Ruolo.ADMIN}>Admin</option>
					<option value={Ruolo.ADDETTO_CUCINA}>Addetto alla Cucina</option>
					<option value={Ruolo.CAMERIERE}>Cameriere</option>
				</AssegnaRuoloSelect>

				<AssegnaSupervisoreButton isSupervisore={true}>
					<StarBadge isOn={true} />
					<p>Assegna come supervisore</p>
				</AssegnaSupervisoreButton>

				<br />
				<BigButton onClick={() => {}} text="Crea" />
			</SlideUpModal>
		</DashboardContainer>
	);
}
