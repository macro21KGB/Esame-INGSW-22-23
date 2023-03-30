import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import DropDownItem from "../components/DropDownItem";
import InputBox from "../components/InputBox";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
import SoftButton from "../components/SoftButton";
import UtenzaItem from "../components/UtenzaItem";
import StarBadge from "../components/UtenzaItem/StarBadge";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { Ruolo, Utente, UtenteFactory } from "../entities/utente";
import { useStore } from "../stores/store";

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
	background-color: ${(props) => (props.isSupervisore ? "#1183C2" : "#1A1515")};
	
`;

export interface InformazioniUtente {
	nome: string;
	cognome: string;
	telefono: string;
	email: string;
	password?: string;
	ruolo: string;
	supervisore: boolean;
}

export default function GestisciUtenzaRoute() {
	const [showModal, setShowModal] = useState(false);
	const controller = Controller.getInstance();
	const { id } = useParams();

	const [informazioniUtente, setInformazioniUtente] =
		useState<InformazioniUtente>({
			nome: "",
			cognome: "",
			telefono: "",
			email: "",
			password: "",
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
		return controller.getUtenti(parseInt(id) || -1);
	});

	const mutation = useMutation((infoUtente: InformazioniUtente) => {
		return controller.creaUtenteConInformazioniUtente(infoUtente, parseInt(id) || -1);
	}, {
		onSuccess: () => {
			toast.success("Utente creato con successo");
			setShowModal(false);
			query.refetch();
		}
		,
		onError: (error: any) => {
			toast.error(error.message);
		}
	});

	const handleCreaUtente = () => {
		mutation.mutate(informazioniUtente);
	}

	const impostaInformazioniUtente = (utente: InformazioniUtente) => {
		setInformazioniUtente({
			nome: utente.nome,
			cognome: utente.cognome,
			telefono: utente.telefono,
			email: utente.email,
			ruolo: utente.ruolo || "",
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
								impostaInformazioniUtente(utente as InformazioniUtente);
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
					placeholder="Email"
					value={informazioniUtente.email}
					name="email"
					onChange={defaultHandleOnChange}
				/>
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
					value={informazioniUtente.telefono}
					name="telefono"
					onChange={defaultHandleOnChange}
				/>
				<InputBox
					placeholder="Password di primo accesso"
					value={informazioniUtente.password}
					name="password"
					onChange={defaultHandleOnChange}
				/>
				<DropDownItem bgColor="gray" onChange={(e) => {
					setInformazioniUtente({
						...informazioniUtente,
						ruolo: e.target.value
					})
				}}>
					<option value={Ruolo.ADDETTO_CUCINA}>Addetto alla Cucina</option>
					<option value={Ruolo.CAMERIERE}>Cameriere</option>
				</DropDownItem>

				<AssegnaSupervisoreButton isSupervisore={informazioniUtente.supervisore} onClick={() => {
					setInformazioniUtente({
						...informazioniUtente,
						supervisore: !informazioniUtente.supervisore
					})
				}} >
					<StarBadge isOn={informazioniUtente.supervisore} />
					<p>{informazioniUtente.supervisore ? "Rimuovi Supervisore" : "Rendi Supervisore"}</p>
				</AssegnaSupervisoreButton>

				<br />
				<BigButton onClick={handleCreaUtente} text="Crea" />
			</SlideUpModal>
		</DashboardContainer >
	);
}
