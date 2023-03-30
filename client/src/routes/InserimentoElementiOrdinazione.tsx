import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import ItemElementoConQuantita from "../components/ItemElementoConQuantita";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
import SoftButton from "../components/SoftButton";
import { Controller } from "../entities/controller";
import { dummyElemento } from "../entities/dummyObjects";
import { Categoria, Elemento } from "../entities/menu";
import { useStore } from "../stores/store";

const Container = styled.div`
	position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0;
	padding: 1rem;
`;

const UovoContainer = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	bottom: 0;
	left: 0;

	width: 100%;
	height: 5rem;
	background-color: white;
	border-radius: 1rem 1rem 0 0;
	`;

const InviaAllaCucinaButton = styled.button`
    background-color: #4fa447;
    border: none;
    color: white;
	width: 100%;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem;
    cursor: pointer;
	position: absolute;
	bottom: 0;
	left: 0;

	&:hover {
		background-color: #3f8a3a;
	}

`;

export default function InserimentoElementiOrdinazioneRoute() {
	const controller = Controller.getInstance();

	const [showModal, setShowModal] = useState(false);

	const [elementiScelti, setElementiScelti] = useState<
		{ elemento: Elemento; quantita: number }[]
	>([]);

	const idRistorante = useStore((state) => state.idRistorante);

	const [categoriaScelta, setCategoriaScelta] = useState<Categoria>();
	const query = useQuery(["categorie"], () => controller.getCategorie(idRistorante));
	const queryElementi = useQuery(
		["elementi", categoriaScelta?.nome],
		() => {
			return [dummyElemento];
		},
		{
			enabled: !!categoriaScelta,
		},
	);

	const goBackToPreviousCategory = () => {
		setCategoriaScelta(undefined);
	};

	const checkIfElementoIsPresentAndAssignQuantita = (elemento: Elemento) => {
		const index = elementiScelti.findIndex((e) => e.elemento === elemento);
		if (index === -1) {
			return 0;
		} else {
			return elementiScelti[index].quantita;
		}
	};

	return (
		<Container>
			{NavbarFactory.generateNavbarBackAndMenu(goBackToPreviousCategory)}
			<Content>
				{query.isLoading && <LoadingCircle loaderPosition="absolute" />}
				{!categoriaScelta &&
					query.data?.map((categoria) => (
						<SoftButton
							key={categoria.nome}
							text={categoria.nome}
							onClick={() => {
								setCategoriaScelta(categoria);
							}}
						/>
					))}

				{categoriaScelta &&
					(queryElementi?.isLoading ? (
						<LoadingCircle />
					) : (
						queryElementi.data?.map((elemento) => (
							<ItemElementoConQuantita
								key={elemento.nome}
								elemento={elemento}
								quantita={checkIfElementoIsPresentAndAssignQuantita(elemento)}
								onChangeQuantita={(elemento, quantita) => {
									setElementiScelti((prev) => {
										const index = prev.findIndex(
											(e) => e.elemento === elemento,
										);
										if (index === -1) {
											return [...prev, { elemento, quantita }].filter(
												(e) => e.quantita > 0,
											);
										} else {
											const newElementi = [...prev];
											newElementi[index].quantita = quantita;
											return newElementi.filter((e) => e.quantita > 0);
										}
									});
								}}
							/>
						))
					))}
			</Content>

			<SlideUpModal showModal={showModal} setShowModal={setShowModal}>
				<p>Visualizza Ordine</p>

				{elementiScelti.map((elementoConQuantita) => (
					<p key={elementoConQuantita.elemento.nome}>
						<strong>{elementoConQuantita.quantita}x</strong>{" "}
						{elementoConQuantita.elemento.nome}
					</p>
				))}
				<InviaAllaCucinaButton onClick={() => { }}>
					Invia alla cucina
				</InviaAllaCucinaButton>
			</SlideUpModal>
			{!showModal && (
				<UovoContainer>
					<BigButton
						text="Visualizza Ordine"
						onClick={() => setShowModal(true)}
					/>
				</UovoContainer>
			)}
		</Container>
	);
}
