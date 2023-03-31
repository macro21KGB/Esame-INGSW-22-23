import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import InputBox from "../components/InputBox";
import ItemElementoCategoria from "../components/ItemElementoCategoria";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
import WelcomePanel from "../components/WelcomePanel";
import { Controller } from "../entities/controller";
import { Elemento } from "../entities/menu";
import { ElementiOrderSaver, isValoriNonSettati } from "../utils/utils";
import { ALLERGENI } from "../utils/constants";
import { toast } from "react-toastify";
import { Allergene } from "../entities/allergene";

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

const AutoCompleteContainer = styled.div`

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

	gap: 1rem;
    margin: 0;
    padding: 1rem;
`;

const AllergeniContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.3rem;
	padding: 1rem;

	p {
		margin: 0.5rem;
		background-color: #465375;
		border-radius: 1rem;
		padding: 0.5rem;
		width: max-content;
	}

	`;

const AllergeneItem = styled.button`
	all: unset;

	margin: 0;

	border-radius: 0.5rem;
	padding: 0.2rem 1rem;
	background-color: #465375;
	color: white;
	margin-bottom: 1rem;
	cursor: pointer;

	&:hover {
		background-color: white;
		color: #465375;
	}

	&:active {
		background-color: #465375;
		color: white;
	}

	${(props: { selected: boolean }) => props.selected && `
		background-color: white;
		color: #465375;
	`}
`;

interface InformazioniElemento {
	nome: string;
	descrizione: string;
	costo: string;
	allergeni: string[];
}

export default function GestisciElementiCategoriaRoute() {
	const { idCategoria } = useParams();
	const controller = Controller.getInstance();

	const query = useQuery(["elementi", idCategoria], () => {
		return controller.getElementiCategoria(parseInt(idCategoria || "-1"));
	});

	const [autoCompleteString, setAutoCompleteString] = useState<string>("AutoComplete");
	const [isModifica, setIsModifica] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [IdElementoCancellare, setIdElementoCancellare] = useState<number>(-1);

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
			allergeni: [],
		});
		setAutoCompleteString("AutoComplete");
	};

	const [informazioniElemento, setInformazioniElemento] = useState<InformazioniElemento>({
		nome: "",
		descrizione: "",
		costo: "",
		allergeni: [],
	});

	const toggleAllergene = (allergene: string) => {
		if (informazioniElemento.allergeni.includes(allergene)) {
			setInformazioniElemento({
				...informazioniElemento,
				allergeni: informazioniElemento.allergeni.filter((a) => a !== allergene),
			});
		} else {
			setInformazioniElemento({
				...informazioniElemento,
				allergeni: [...informazioniElemento.allergeni, allergene],
			});
		}
	};

	const isAllergeneSelected = (allergene: string) => {
		return informazioniElemento.allergeni.includes(allergene);
	};

	const fetchSuggestions = async () => {
		const response = await axios.get<{ meals: { strMeal: string }[] }>(`http://www.themealdb.com/api/json/v1/1/search.php?s=${informazioniElemento.nome.replace(" ", "_")}`);

		const data = response.data;
		if (data["meals"]) {
			//@ts-ignore
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

	const queryClient = useQueryClient();

	const mutation = useMutation((elemento: Elemento) => {
		if (idCategoria === undefined) return Promise.reject(
			new Error("Non è stato possibile recuperare l'id della categoria")
		);

		if (isModifica) {
			return controller.modificaElementoCategoria(elemento, +idCategoria);
		} else {
			return controller.aggiungiElementoCategoria(elemento, +idCategoria);
		}
	}, {
		onSuccess: () => {
			toast.success("Elemento aggiunto/modificato con successo");
			queryClient.invalidateQueries(["elementi", idCategoria]);
			setShowModal(false);
			resettaCampi();
		},
		onError: (error: any) => {
			toast.error(error);
		}

	});

	const mutationDelete = useMutation((idElemento: number) => {
		if (idCategoria === undefined) return Promise.reject(
			new Error("Non è stato possibile recuperare l'id della categoria")
		);

		return controller.eliminaElementoCategoria(idElemento);
	},
		{
			onSuccess: () => {
				toast.success("Elemento eliminato con successo");
				queryClient.invalidateQueries(["elementi", idCategoria]);
			},
			onError: (error: any) => {
				toast.error(error);
			}
		}
	);

	const creaNuovoElemento = (informazioniElemento: InformazioniElemento) => {

		if (isValoriNonSettati(informazioniElemento)) {
			toast.error("Non tutti i campi sono stati compilati");
			return;

		}

		const allergeni = informazioniElemento.allergeni.map((allergene) => {
			return new Allergene(allergene, 0);
		});
		const nuovoElemento = new Elemento(informazioniElemento.nome,
			informazioniElemento.descrizione,
			+informazioniElemento.costo,
			{
				allergeni: allergeni,
				ingredienti: [],
				ordine: 0,
			});

		mutation.mutate(nuovoElemento);
	}

	const cancellaElemento = (idElemento: number) => {
		mutationDelete.mutate(idElemento);
	}

	const closeModal = () => {
		setShowModal(false);
		resettaCampi();
		setIsModifica(false);
		setIdElementoCancellare(-1);
	}

	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarAll(() => {
				setShowModal(true);
			})}
			<WelcomePanel title="Gestione" subtitle="Categoria" />
			{query.isLoading ? (
				<DashboardContent>
					<LoadingCircle />
				</DashboardContent>
			) : (
				<>
					<ListaElementi>
						{query.data?.map((elemento: Elemento) => (
							<ItemElementoCategoria
								onClickElemento={() => {
									setIsModifica(true)
									setShowModal(true);
									setIdElementoCancellare(elemento.id_elemento);
									console.log(elemento);
									setInformazioniElemento({
										nome: elemento.nome,
										descrizione: elemento.descrizione,
										costo: elemento.prezzo.toString(),
										allergeni: elemento.allergeni.map((allergene) => allergene.nome) || [],
									});
								}}
								onClickUp={() => { }}
								onClickDown={() => { }}
								key={elemento.id_elemento}
								elemento={elemento}

							/>
						))}
					</ListaElementi>
				</>
			)}
			<SlideUpModal
				showModal={showModal}
				setShowModal={setShowModal}
				onClose={closeModal}
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

				<AllergeniContainer>
					{Object.values(ALLERGENI).map((allergene) => {
						return (
							<AllergeneItem key={allergene} onClick={() => { toggleAllergene(allergene) }} selected={isAllergeneSelected(allergene)}>
								{allergene}
							</AllergeneItem>
						);
					})
					}
				</AllergeniContainer>
				{isModifica && (
					<BigButton onClick={() => {
						cancellaElemento(IdElementoCancellare);
						closeModal();
					}} color="red" text="Elimina Elemento" />
				)}
				<br />
				<BigButton onClick={() => { creaNuovoElemento(informazioniElemento) }} text="Crea" />
			</SlideUpModal>
		</DashboardContainer>
	);
}
