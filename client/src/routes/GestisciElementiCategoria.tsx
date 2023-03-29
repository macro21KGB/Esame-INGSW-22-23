import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import ItemElementoCategoria from "../components/ItemElementoCategoria";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
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

const AutoCompleteContainer = styled.button`
    all: unset;    

    cursor: pointer;
    position: relative;
    border-radius: 0.6rem;
    padding: 0.1rem 1rem;
    background-color: #fff;
    color: gray;
    margin-bottom: 0.5rem;

    &:after {
        content: "";
        position: absolute;
        bottom: -40%;
        left: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-top: 0.5rem solid white;
    }
    p {
        margin: 0;
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

const AllergeniContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;

	p {
		margin: 0.5rem;
		background-color: #465375;
		border-radius: 1rem;
		padding: 0.5rem;
		width: max-content;
	}

	`;

export default function GestisciElementiCategoriaRoute() {
	const { idRistorante, nomeCategoria } = useParams();
	const controller = Controller.getInstance();

	const query = useQuery(["categoria", nomeCategoria], () => {
		return controller.getCategoria(parseInt(idRistorante));
	});

	const [autoCompleteString, setAutoCompleteString] = useState<string>("AutoComplete");
	const [isModifica, setIsModifica] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [itemAllergeni, setItemAllergeni] = useState<string[]>([]);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInformazioniElemento({
			...informazioniElemento,
			[event.target.name]: event.target.value,
		});
	};

	const resettaCampi = () => {
		setInformazioniElemento({
			nome: "",
			descrizione: "",
			costo: "",
			allergeni: "",
		});
		setAutoCompleteString("AutoComplete");
	};

	const [informazioniElemento, setInformazioniElemento] = useState({
		nome: "",
		descrizione: "",
		costo: "",
		allergeni: "",
	});

	const convertiStringaInArray = (stringa: string) => {
		let array: string[] = [];
		let stringaTemporanea = "";

		if (stringa === "") return array;

		for (let i = 0; i < stringa.length; i++) {
			if (stringa[i] === ",") {
				// se dopo la virgola non ce nulla non mettere nulla
				// e ritorna l'array
				if (stringa[i + 1] === " ") {
					return array;
				} else {
					array.push(stringaTemporanea);
					stringaTemporanea = "";
				}
			} else {
				stringaTemporanea += stringa[i];
			}
		}

		array.push(stringaTemporanea);

		return array;
	};

	const fetchSuggestions = async () => {
		const response = await axios.get<string>(`http://www.themealdb.com/api/json/v1/1/search.php?s=${informazioniElemento.nome.replace(" ", "_")}`);

		const data = response.data;
		console.log(data);
		if (data["meals"]) {
			setAutoCompleteString(data["meals"][0]["strMeal"]);
		}
	}

	const selectAutoComplete = () => {
		setInformazioniElemento({
			...informazioniElemento,
			nome: autoCompleteString,
			descrizione: "",
		})
	}

	useEffect(() => {
		if (informazioniElemento.nome.length > 3) {
			if (informazioniElemento.nome !== autoCompleteString)
				fetchSuggestions();
		}
	}, [informazioniElemento.nome])

	useEffect(() => {
		setItemAllergeni(convertiStringaInArray(informazioniElemento.allergeni));
	}, [informazioniElemento.allergeni]);

	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarAll(() => {
				setShowModal(true);
			})}
			<WelcomePanel title="Gestione" subtitle={nomeCategoria} />
			{query.isLoading ? (
				<DashboardContent>
					<LoadingCircle />
				</DashboardContent>
			) : (
				<>
					<ListaElementi>
						{query.data?.elementi.map((elemento: Elemento) => (
							<ItemElementoCategoria key={elemento.nome} elemento={elemento} />
						))}
					</ListaElementi>
				</>
			)}
			<SlideUpModal
				showModal={showModal}
				setShowModal={setShowModal}
				onClose={() => resettaCampi()}
			>
				<p>{isModifica ? "Modifica Elemento" : "Nuovo Elemento"}</p>
				<AutoCompleteContainer onClick={selectAutoComplete}>
					<p>{autoCompleteString}</p>
				</AutoCompleteContainer>
				<InputBox
					placeholder="Nome Elemento"
					value={informazioniElemento.nome}
					name="nome"
					onChange={handleOnChange}
				/>
				<InputBox
					placeholder="Descrizione"
					value={informazioniElemento.descrizione}
					name="descrizione"
					onChange={handleOnChange}
				/>
				<InputBox
					placeholder="Costo"
					type="number"
					value={informazioniElemento.costo}
					name="costo"
					onChange={handleOnChange}
				/>
				<InputBox
					placeholder="Allergeni (separati da virgola)"
					value={informazioniElemento.allergeni}
					name="allergeni"
					onChange={handleOnChange}
				/>
				<AllergeniContainer>
					{itemAllergeni.map((allergene) => (
						<p>{allergene}</p>
					))}
					<br />
				</AllergeniContainer>
				{isModifica && (
					<BigButton onClick={() => { }} color="red" text="Elimina Elemento" />
				)}

				<BigButton onClick={() => { }} text="Crea" />
			</SlideUpModal>
		</DashboardContainer>
	);
}
