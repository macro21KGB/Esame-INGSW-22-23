import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BigButton from "../components/BigButton";
import ItemCategoria from "../components/ItemCategoria";
import ItemElementoConQuantita from "../components/ItemElementoConQuantita";
import LoadingCircle from "../components/LoadingCircle";
import { NavbarFactory } from "../components/NavBar";
import SlideUpModal from "../components/SlideUpModal";
import SoftButton from "../components/SoftButton";
import { Controller } from "../entities/controller";
import { dummyElemento } from "../entities/dummyObjects";
import { Categoria, ElementoConQuantita } from "../entities/menu";

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

export default function InserimentoElementiOrdinazioneRoute() {
	const controller = Controller.getInstance();

	const [showModal, setShowModal] = useState(false);

	const [elementiScelti, setElementiScelti] = useState<ElementoConQuantita[]>(
		[],
	);
	
	const [categoriaScelta, setCategoriaScelta] = useState<Categoria>();
	const query = useQuery(["categorie"], () => controller.getCategorie());
	const queryElementi = useQuery(
		["elementi", categoriaScelta?.nome],
		() => {
			return [dummyElemento];
		},
		{
			enabled: !!categoriaScelta,
		},
	);

	return (
		<Container>
			{NavbarFactory.generateNavbarBackAndMenu()}
			<Content>
				{query.isLoading && <LoadingCircle position="absolute" />}
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
								quantita={0}
								onChangeQuantita={() => {}}
							/>
						))
					))}
			</Content>

			<SlideUpModal showModal={showModal} setShowModal={setShowModal}>
				<p>Visualizza Ordine</p>
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
