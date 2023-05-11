import { useState } from "react";
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
import { ALLERGENI, AppEvents } from "../utils/constants";
import { toast } from "react-toastify";
import { Allergene } from "../entities/allergene";
import AutoCompleteComponent from "../components/AutoCompleteComponent";
import { logEventToFirebase } from "../firebase";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
	const queryClient = useQueryClient();

	// get elementi
	const queryElementiCategoria = useQuery(["elementi", idCategoria], () => {
		return controller.getElementiCategoria(parseInt(idCategoria || "-1"));
	});

	const [isModifica, setIsModifica] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [idElementoCorrente, setIdElementoCorrente] = useState<number>(-1);

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
	};

	const [parent] = useAutoAnimate();

	const acceptSuggestion = (suggestion: string, ingredienti: string) => {
		setInformazioniElemento({
			...informazioniElemento,
			nome: suggestion,
			descrizione: ingredienti,
		})
	}

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


	const mutationAggiungiElemento = useMutation((elemento: Elemento) => {
		if (idCategoria === undefined) return Promise.reject(
			new Error("Non è stato possibile recuperare l'id della categoria")
		);

		logEventToFirebase("add_element_to_category")
		return controller.aggiungiElementoCategoria(elemento, +idCategoria);
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
				logEventToFirebase("delete_element_from_category");
				queryClient.invalidateQueries(["elementi", idCategoria]);
			},
			onError: (error: any) => {
				toast.error(error);
			}
		}
	);

	const mutationSpostaElementi = useMutation({
		mutationFn: (idElementi: { idElemento1: number, idElemento2: number }) => {
			if (idCategoria === undefined) return Promise.reject(
				new Error("Non è stato possibile recuperare l'id della categoria")
			);

			const { idElemento1, idElemento2 } = idElementi;

			return controller.spostaElementiCategoria(idElemento1, idElemento2);
		}, onError: (error: any, ids, context: any) => {
			toast.error(error);
			queryClient.setQueryData(["elementi", idCategoria], context.previousElementList);
		}, onSuccess: (result) => {
			queryClient.invalidateQueries(["elementi", idCategoria]);
		}, onMutate: async (ids) => {
			await queryClient.cancelQueries(["elementi", idCategoria]);
			const previousElementList = queryClient.getQueryData<Elemento[]>(["elementi", idCategoria]) || [];

			// update todo order
			const firstElementToSwap = previousElementList.find((e: Elemento) => e.id_elemento === ids.idElemento1);
			const secondElementToSwap = previousElementList.find((e: Elemento) => e.id_elemento === ids.idElemento2);

			if (firstElementToSwap && secondElementToSwap) {
				const firstElementToSwapIndex = previousElementList.indexOf(firstElementToSwap);
				const secondElementToSwapIndex = previousElementList.indexOf(secondElementToSwap);

				const newElementList = [...previousElementList];
				newElementList[firstElementToSwapIndex] = secondElementToSwap;
				newElementList[secondElementToSwapIndex] = firstElementToSwap;

				queryClient.setQueryData(["elementi", idCategoria], newElementList);
			}

			return { previousElementList };
		},
		onSettled: () => {
			queryClient.invalidateQueries(["elementi", idCategoria]);
		}
	});

	const spostaElementoVerso = (elementi: Elemento[], elemento: Elemento, verso: "su" | "giu") => {
		if (queryElementiCategoria.isError || queryElementiCategoria.isLoading) return;

		const indexElementoDaSpostare = elementi.findIndex((e) => e.id_elemento === elemento.id_elemento);

		if (verso === "su") {
			if (indexElementoDaSpostare === 0) {
				return;
			}

			mutationSpostaElementi.mutate({
				idElemento1: elementi[indexElementoDaSpostare - 1].id_elemento,
				idElemento2: elementi[indexElementoDaSpostare].id_elemento,
			});
		}
		else {
			if (indexElementoDaSpostare === elementi.length - 1) {
				return;
			}

			mutationSpostaElementi.mutate({
				idElemento1: elementi[indexElementoDaSpostare].id_elemento,
				idElemento2: elementi[indexElementoDaSpostare + 1].id_elemento,
			});
		}
	}

	const creaNuovoElemento = (informazioniElemento: InformazioniElemento) => {

		if (informazioniElemento.nome == "" || informazioniElemento.descrizione == "" || informazioniElemento.costo == "") {
			toast.error("Compila tutti i campi");
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


		mutationAggiungiElemento.mutate(nuovoElemento);
	}

	const mutationModificaElemento = useMutation((elementoDaModificare: Elemento) => {
		return controller.modificaElementoCategoria(elementoDaModificare);
	}, {
		onSuccess: () => {
			toast.success("Elemento aggiunto/modificato con successo");
			queryClient.invalidateQueries(["elementi", idCategoria]);
			logEventToFirebase(AppEvents.MODIFY_ELEMENT_FROM_CATEGORY);
			setShowModal(false);
			resettaCampi();
		}
		,
		onError: (error: any) => {
			toast.error(error);
		}
	});

	const modificaElemento = (informazioniElemento: InformazioniElemento) => {
		const allergeni = informazioniElemento.allergeni.map((allergene) => {
			return new Allergene(allergene, idElementoCorrente);
		});

		const elementoDaModificare = new Elemento(informazioniElemento.nome,
			informazioniElemento.descrizione,
			+informazioniElemento.costo,
			{
				allergeni: allergeni,
				ingredienti: [],
				ordine: 0,
			}, idElementoCorrente);

		mutationModificaElemento.mutate(elementoDaModificare);
	}

	const setupModificaElemento = (elemento: Elemento) => {
		setIsModifica(true)
		setShowModal(true);
		setIdElementoCorrente(elemento.id_elemento);
		setInformazioniElemento({
			nome: elemento.nome,
			descrizione: elemento.descrizione,
			costo: elemento.prezzo.toString(),
			allergeni: elemento.allergeni.map((allergene) => allergene.nome) || [],
		});
	}

	const cancellaElemento = (idElemento: number) => {
		mutationDelete.mutate(idElemento);
	}

	const closeModal = () => {
		setShowModal(false);
		resettaCampi();
		setIsModifica(false);
		setIdElementoCorrente(-1);
	}

	return (
		<DashboardContainer>
			{NavbarFactory.generateNavbarAll(() => {
				setShowModal(true);
			})}
			<WelcomePanel title="Gestione" subtitle="Categoria" />
			{queryElementiCategoria.isLoading ? (
				<DashboardContent>
					<LoadingCircle />
				</DashboardContent>
			) : (
				<>
					<ListaElementi ref={parent}>
						{queryElementiCategoria.data?.map((elemento: Elemento) => (
							<ItemElementoCategoria
								key={elemento.id_elemento + elemento.nome}
								onClickElemento={() => {
									setupModificaElemento(elemento);
								}}
								onClickUp={() => { spostaElementoVerso(queryElementiCategoria.data, elemento, "su") }}
								onClickDown={() => { spostaElementoVerso(queryElementiCategoria.data, elemento, "giu") }}
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
				{
					isModifica ?
						null
						:
						<AutoCompleteComponent onClick={acceptSuggestion}
							valueToSearch={informazioniElemento.nome}
							placeholder="Suggestion Here" />

				}
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
							<AllergeneItem key={allergene}
								onClick={() => { toggleAllergene(allergene) }}
								selected={isAllergeneSelected(allergene)}>
								{allergene}
							</AllergeneItem>
						);
					})
					}
				</AllergeniContainer>
				{isModifica && (
					<BigButton onClick={() => {
						cancellaElemento(idElementoCorrente);
						closeModal();
					}} color="red" text="Elimina Elemento" />
				)}
				<br />
				<BigButton onClick={() => {
					if (isModifica)
						modificaElemento(informazioniElemento);
					else
						creaNuovoElemento(informazioniElemento)
				}} text={isModifica ? 'Modifica' : 'Crea'} />
			</SlideUpModal>
		</DashboardContainer>
	);
}
